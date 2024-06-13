import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Model } from "mongoose";
import { User, UserDocument } from "../../users/entities/user.entity";
import { Role } from "../../users/enums/role.enum";
import jwtConfig from "../config/jwt.config";
import { InvalidatedRefreshTokenError } from "../errors/invalidated-refresh-token.error";
import { HashingService } from "../hashing/hashing.service";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { RefreshTokenIdsStorage } from "./refresh-token-ids.storage";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel("User") private usersRepository: Model<UserDocument>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.role = Role.Regular;

      await this.usersRepository.create(user);
    } catch (err) {
      const mongoUniqueExceptionCode = 11000;
      if (err.code === mongoUniqueExceptionCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOne({
      email: signInDto.email
    });
    if (!user) {
      throw new UnauthorizedException("User does not exists");
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password
    );
    if (!isEqual) {
      throw new UnauthorizedException("Password does not match");
    }
    return await this.generateTokens(user);
  }

  async generateTokens(user: UserDocument) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user._id as string,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email, role: user.role }
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId
      })
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, "sub"> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer
      });
      const user = await this.usersRepository.findOne({
        _id: sub
      });
      if (!user) {
        throw new UnauthorizedException("user not found");
      }
      const isValid = await this.refreshTokenIdsStorage.validate(
        user._id as string,
        refreshTokenId
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error("Refresh token is invalid");
      }
      return this.generateTokens(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException("Access denied");
      }
      throw new UnauthorizedException(err.message);
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn
      }
    );
  }
}

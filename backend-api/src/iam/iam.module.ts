import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/entities/user.entity";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { AccessTokenGuard } from "./authentication/guards/access-token.guard";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { RefreshTokenIdsStorage } from "./authentication/refresh-token-ids.storage";
import { RolesGuard } from "./authorization/guards/roles.guard";
import jwtConfig from "./config/jwt.config";
import { BcryptService } from "./hashing/bcrypt.service";
import { HashingService } from "./hashing/hashing.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig)
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    AuthenticationService,
    AccessTokenGuard,
    RefreshTokenIdsStorage
  ],
  controllers: [AuthenticationController],
  exports: [
    {
      provide: HashingService,
      useClass: BcryptService
    }
  ]
})
export class IamModule {
}

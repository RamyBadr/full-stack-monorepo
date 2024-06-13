import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../../users/entities/user.entity";
import { createMockRepository } from "../__mocks/mock-repository";
import jwtConfig from "../config/jwt.config";
import { BcryptService } from "../hashing/bcrypt.service";
import { HashingService } from "../hashing/hashing.service";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { RefreshTokenIdsStorage } from "./refresh-token-ids.storage";

const UserModel = createMockRepository;
describe("AuthenticationController", () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        JwtService,
        {
          provide: HashingService,
          useClass: BcryptService
        },
        {
          provide: getModelToken("User"),
          useValue: UserModel
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            secret: "test_secret",
            audience: "localhost",
            issuer: "localhost",
            accessTokenTtl: parseInt("3600", 10)
          }
        },
        RefreshTokenIdsStorage
      ],
      controllers: [AuthenticationController]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

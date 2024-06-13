import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";

import { Model } from "mongoose";
import { createMockRepository } from "../__mocks/mock-repository";
import jwtConfig from "../config/jwt.config";
import { BcryptService } from "../hashing/bcrypt.service";
import { HashingService } from "../hashing/hashing.service";
import { AuthenticationService } from "./authentication.service";
import { RefreshTokenIdsStorage } from "./refresh-token-ids.storage";

export type MockRepository<T = any> = Partial<
  Record<keyof Model<T>, jest.Mock>
>;
describe("AuthenticationService", () => {
  let service: AuthenticationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        JwtService,
        {
          provide: getModelToken("User"),
          useValue: createMockRepository
        },
        {
          provide: HashingService,
          useClass: BcryptService
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
      ]
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

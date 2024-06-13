import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMockRepository } from "../iam/__mocks/mock-repository";
import { BcryptService } from "../iam/hashing/bcrypt.service";
import { HashingService } from "../iam/hashing/hashing.service";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { useClass: BcryptService, provide: HashingService },
        {
          provide: getModelToken("User"),
          useValue: createMockRepository
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

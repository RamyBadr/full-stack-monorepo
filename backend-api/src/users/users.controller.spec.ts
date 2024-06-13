import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { createMockRepository } from "../iam/__mocks/mock-repository";
import { BcryptService } from "../iam/hashing/bcrypt.service";
import { HashingService } from "../iam/hashing/hashing.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    // @ts-ignore
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: getModelToken("User"),
          useValue: createMockRepository
        },
        {
          provide: HashingService,
          useClass: BcryptService
        },
        UsersService
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

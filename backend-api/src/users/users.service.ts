import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HashingService } from "../iam/hashing/hashing.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.entity";
import { Role } from "./enums/role.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private userModel: Model<UserDocument>,
    private readonly hashingService: HashingService
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.password = await this.hashingService.hash(createUserDto.password);
      user.role = Role.Regular;
      return await this.userModel.create(user);
    } catch (err) {
      const mongoUniqueExceptionCode = 11000;
      if (err.code === mongoUniqueExceptionCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  findAll() {
    return this.userModel.find({}, {}, { limit: 10, offset: 0 });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

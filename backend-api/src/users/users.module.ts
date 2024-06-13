import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IamModule } from "../iam/iam.module";
import { User, UserSchema } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    IamModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ]
})
export class UsersModule {
}

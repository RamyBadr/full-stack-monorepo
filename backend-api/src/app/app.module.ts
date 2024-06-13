import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IamModule } from "../iam/iam.module";
import { UsersModule } from "../users/users.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    IamModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}

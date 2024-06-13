import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import config from "../config";
import { IamModule } from "../iam/iam.module";
import { UsersModule } from "../users/users.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb.uri),
    UsersModule,
    IamModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}

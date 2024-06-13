import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost:27017/project'),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

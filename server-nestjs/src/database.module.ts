import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BaseRouterModel,
  SuperRouterModel,
} from './api/device/dto/device.entity';
import { UserModel } from './api/user/dto/user.entity';

//config db with typeorm
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'n3zWFUbHLc4hY7Z',
      database: 'test',
      entities: [UserModel, BaseRouterModel, SuperRouterModel],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}

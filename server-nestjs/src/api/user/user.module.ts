import { Module } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { UserService } from './user.service';
import { UserModel } from './dto/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user.resolver';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    //AuthModule,
  ],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}

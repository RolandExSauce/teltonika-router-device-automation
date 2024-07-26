import { Injectable } from '@nestjs/common';
import { UserModel } from './dto/user.entity';
import { UserRepository } from './user.repo';
import { DeepPartial } from 'typeorm';
import { UpdateUserInput } from './dto/user.type-defs';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly jwtService: JwtService,
  ) {}

  //get all users
  async users(): Promise<UserModel[]> {
    return this.userRepository.findUsers();
  }

  //find a user by username
  async user(username: string): Promise<UserModel | undefined> {
    return this.userRepository.findByUsername(username);
  }

  // Create a new user
  async createUser(userData: DeepPartial<UserModel>) {
    const newUser = await this.userRepository.createUser(userData);
    return newUser;
  }

  //update a user by username
  async updateUser(newUserData: UpdateUserInput) {
    const newUser = await this.userRepository.updateUser(newUserData);
    return newUser;
  }

  //update a user by username
  async deleteUser(username: string) {
    const deleteRes = await this.userRepository.deleteUser(username);
    return deleteRes;
  }

  //verify usen with token
  async verify(token: string): Promise<UserModel> {
    console.log(token);
    // const decoded = this.jwtService.verify(token, {
    //   secret: 'secret',
    // });
    const decoded = 'test' as any;
    const user = await this.user(decoded.username);
    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }
    return user;
  }
}

import { DeepPartial, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInput } from './dto/user.type-defs';
import { UserModel } from './dto/user.entity';

// UserRepository class to interact with UserModel entity
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  // get all users
  async findUsers(): Promise<UserModel[] | undefined> {
    return this.userRepository.find({});
  }

  // Find a user by username
  async findByUsername(username: string): Promise<UserModel | undefined> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  // Create a new user
  async createUser(
    userData: DeepPartial<UserModel>,
  ): Promise<DeepPartial<UserModel>> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // update user, we will use input type from our type-defs
  async updateUser(newUserData: UpdateUserInput): Promise<UserModel | null> {
    const userToUpdate = await this.findByUsername(
      newUserData.usernameOfToUpdateUser,
    );

    if (userToUpdate) {
      // Update only the fields that are provided in newUserData
      Object.assign(userToUpdate, {
        username: newUserData.newUsername ?? userToUpdate.username,
        role: newUserData.newRole ?? userToUpdate.role,
        userDep: newUserData.newUserDep ?? userToUpdate.userDep,
        password: newUserData.newPassword ?? userToUpdate.password,
      });

      await userToUpdate.hashPassword(); // Manually call hashPassword method when updating user data
      return this.userRepository.save(userToUpdate);
    }
    return null;
  }

  //delete user
  async deleteUser(username: string): Promise<string | null> {
    const deleteRes = await this.userRepository.delete({ username });
    console.log('deleted user result: ', deleteRes);
    return deleteRes.affected === 1 ? username : null; //return the deleted username or undefined
  }
}

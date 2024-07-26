import {
  DUPLICATE_USER,
  FAILED_TO_CREATE_USER,
  NO_USERS_FOUND,
  RECORD_ALTERED,
  USER_NOT_FOUND,
  USER_NOT_FOUND_DELETE_FAILED,
  WRONG_PASSWORD,
  // WRONG_PASSWORD,
} from '../graphql.custom.errors';
import {
  getUsersQueryDescr,
  createUserMutationDescr,
  updateUserMutationDescr,
  deleteUserMutationDescr,
} from '../graphql.fields.descriptions';
import { FetchUsersResponse, GraphqlResponse, LoginResponse } from '../types';
import {
  CreatedUserResponse,
  DeletedUserResponse,
  GetUsersResponse,
  TokenResponse,
  UpdatedUserResponse,
} from './dto/unions';
import {
  CreateUserInput,
  LoginInput,
  UpdateUserInput,
  User,
} from './dto/user.type-defs';
import { UserService } from './user.service';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { DeepPartial } from 'typeorm';
import { UserModel } from './dto/user.entity';
import * as bcrypt from 'bcrypt';
//import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
//import { UseGuards } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';

//User resolver class
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    // private readonly authService: AuthService,
  ) {} //inject services

  //get users query
  @Query(() => GetUsersResponse, {
    name: 'getUsers',
    description: getUsersQueryDescr,
  })
  async getUsers(): Promise<FetchUsersResponse> {
    const users = await this.userService.users();
    return users.length !== 0
      ? { users: users }
      : { customError: NO_USERS_FOUND };
  }

  //login user mutation
  //@UseGuards(LocalAuthGuard)
  @Mutation(() => TokenResponse, {
    name: 'loginUser',
    description: createUserMutationDescr,
  })
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
    // @Context(),
  ): Promise<LoginResponse> {
    // console.log('this is context: ', context);
    const foundUser = await this.userService.user(loginInput.username);
    // const foundUser = this.authService.loginHelper(context.user as UserModel);
    console.log('found user: ', foundUser);

    // return foundUser
    //   ? {
    //       user: foundUser as unknown as UserModel,
    //       accessToken: foundUser.accessToken,
    //     }
    //   : { customError: USER_NOT_FOUND };

    // return this.authService.loginHelper(context.user as UserModel);
    if (foundUser) {
      const passCorrect = await bcrypt.compare(
        loginInput.password,
        foundUser.password,
      );
      if (!passCorrect) {
        return { customError: WRONG_PASSWORD };
      }
      //sign jwt token
      //const payload = { subject: foundUser.id, user_name: foundUser.username };
      return {
        user: foundUser,
        accessToken: 'token',
        //this.jwtService.sign(payload)
      };
    } else {
      return {
        customError: USER_NOT_FOUND,
      };
    }
  }

  //create user mutation
  @Mutation(() => CreatedUserResponse, {
    name: 'createUser',
    description: createUserMutationDescr,
  })
  async createUser(
    @Args('createInput') createInput: CreateUserInput,
  ): Promise<GraphqlResponse> {
    const foundUser = await this.userService.user(createInput.username);
    if (!foundUser) {
      const newUser = await this.userService.createUser(
        createInput as DeepPartial<UserModel>, //lets just go with simple casting
      );
      return newUser
        ? { successMsg: RECORD_ALTERED('USER', newUser.username, 'CREATE') }
        : { customError: FAILED_TO_CREATE_USER };
    }
    return {
      customError: DUPLICATE_USER,
    };
  }

  // //update user mutation
  @Mutation(() => UpdatedUserResponse, {
    name: 'updateUser',
    description: updateUserMutationDescr,
  })
  async updateUser(
    @Args('updateInput') updateInput: UpdateUserInput,
  ): Promise<GraphqlResponse> {
    const updatedUser = await this.userService.updateUser(updateInput);
    return updatedUser
      ? { successMsg: RECORD_ALTERED('USER', updatedUser.username, 'UPDATE') }
      : { customError: USER_NOT_FOUND };
  }

  // //update user mutation
  @Mutation(() => DeletedUserResponse, {
    name: 'deleteUser',
    description: deleteUserMutationDescr,
  })
  async deleteUser(
    @Args('usernameOfToDeleteUser') usernameOfToDeleteUser: string,
  ): Promise<GraphqlResponse> {
    const usernameOfDeletedUser = await this.userService.deleteUser(
      usernameOfToDeleteUser,
    );
    return usernameOfDeletedUser !== null
      ? { successMsg: RECORD_ALTERED('USER', usernameOfDeletedUser, 'DELETE') }
      : { customError: USER_NOT_FOUND_DELETE_FAILED };
  }
}

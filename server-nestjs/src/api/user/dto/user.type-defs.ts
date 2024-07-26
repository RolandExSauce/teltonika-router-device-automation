import { ObjectType, Field, InputType } from '@nestjs/graphql';
import {
  userDescr,
  loginInputDescr,
  createInputDescr,
  updateInputDescr,
  userResDescr,
  usersSuccessDescr,
} from 'src/api/graphql.fields.descriptions';
import { UserRole, UserDepartment } from 'src/api/types';

// Define User type **************************************************************
@ObjectType({ description: userDescr })
export class User {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => UserDepartment, { nullable: true })
  userDep?: UserDepartment;
}

// Define LoginInput type *********************************************************
@InputType({ description: loginInputDescr })
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

// Define CreateUserInput type ******************************************************
@InputType({ description: createInputDescr })
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => UserDepartment, {
    nullable: true,
    defaultValue: UserDepartment.OTHERS, //when no value is provided for department
  })
  userDep?: UserDepartment;
}

// Define UpdateUserInput type *******************************************************
@InputType({ description: updateInputDescr })
export class UpdateUserInput {
  @Field()
  usernameOfToUpdateUser: string;

  @Field({ nullable: true })
  newUsername?: string;

  @Field({ nullable: true })
  newPassword?: string;

  @Field(() => UserRole, { nullable: true })
  newRole?: UserRole;

  @Field(() => UserDepartment, { nullable: true })
  newUserDep?: UserDepartment;
}

// Define UserResponse type ************************************************************
@ObjectType({ description: userResDescr })
export class UserResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;
}

// Define UsersSuccess type ************************************************************
@ObjectType({ description: usersSuccessDescr })
export class UsersSuccess {
  @Field(() => [User])
  users: User[];
}

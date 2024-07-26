// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtSecret } from './constants';
// import { UserService } from 'src/components/user/user.service';
// import { UserModel } from 'src/components/user/dto/user.entity';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   //validate user
//   async validate(
//     username: string,
//     password: string,
//   ): Promise<UserModel | null> {
//     const user = await this.userService.user(username);
//     if (!user) {
//       return null;
//     }
//     //if ok, return user else null
//     const passCorrect = await bcrypt.compare(password, user.password);
//     return passCorrect ? user : null;
//   }

//   //login helper function
//   loginHelper(user: UserModel): { user: UserModel; accessToken: string } {
//     //define payload object
//     const payload = {
//       username: user.username,
//       sub: user.id,
//     };
//     return {
//       user,
//       accessToken: this.jwtService.sign(payload),
//     };
//   }

//   //verify user token
//   verify(token: string) {
//     const decoded = this.jwtService.verify(token, {
//       secret: jwtSecret,
//     });

//     //try to find the decoded user
//     const user = this.userService.user(decoded.username);
//     if (!user) {
//       throw new Error('Unable to get the user from decoded token.');
//     }
//     return user;
//   }
// }

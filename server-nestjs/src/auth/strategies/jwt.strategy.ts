// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { IPayload } from 'src/components/types';
// import { UserModel } from 'src/components/user/dto/user.entity';
// import { UserService } from 'src/components/user/user.service';
// import { jwtSecret } from '../constants';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtSecret,
//     });
//   }

//   //validate user
//   async validate(validationPayload: IPayload): Promise<UserModel | null> {
//     return await this.userService.user(validationPayload.username);
//   }
// }

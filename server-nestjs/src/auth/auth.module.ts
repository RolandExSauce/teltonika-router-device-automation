// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';
// import { LocalStrategy } from './strategies/local.strategy';
// import { UserModule } from 'src/components/user/user.module';
// import { jwtSecret } from './constants';
// import { AuthService } from './auth.service';
// // import { UserService } from 'src/components/user/user.service';
// // import { UserRepository } from 'src/components/user/user.repo';

// @Module({
//   imports: [
//     UserModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: jwtSecret,
//       signOptions: { expiresIn: '3600s' },
//     }),
//   ],
//   //controllers: [AuthController],
//   providers: [
//     // UserService,
//     AuthService,
//     // UserRepository,
//     JwtStrategy,
//     LocalStrategy,
//   ],
//   exports: [AuthService],
// })
// export class AuthModule {}

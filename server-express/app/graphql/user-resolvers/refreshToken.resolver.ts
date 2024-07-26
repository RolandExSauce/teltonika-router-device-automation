import {
  JWT_PRIVATE_KEY_ACCESS, accessTokenExpireIn,
  JWT_PRIVATE_KEY_REFRESH, refreshTokenExpireIn,
  JWT_PUBLIC_KEY_REFRESH,
} from '../../env/use.env';
import { AuthContext } from '../../utils/types';
import { signJWT, verifyJWT } from '../../utils/jwt';
import { TokenResponse, User } from '../generated/generated__types';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../../database/schemas/schemas';

//refresh token resolver
export const refreshToken =
  async (_: undefined, __: undefined, { req, res, user }: AuthContext):
    Promise<TokenResponse> => {
    const token = req.cookies.refresh_token;

    if (!token) {
      throw new Error('Refresh token missing');
    }

    const refreshToken = token.split(' ')[1];
    if (!refreshToken) {
      throw new Error('Refresh token format invalid');
    }

    try {
      // if user from access token is missing
      if (!user) {
        const decodedUser = verifyJWT(refreshToken, JWT_PUBLIC_KEY_REFRESH) as JwtPayload;
        if (!decodedUser || !decodedUser.userId) {
          return {
            customError: 'Invalid refresh token',
            __typename: 'GraphqlError'

          };
        }

        user = await UserModel.findById(decodedUser.userId);
        if (!user) {
          return {
            customError: 'User not found',
            __typename: 'GraphqlError'
          };
        }
      }

      //sign new tokens
      const userId = String(user.id);
      const newAccessToken = signJWT({ userId }, JWT_PRIVATE_KEY_ACCESS, {
        expiresIn: 60 * 60 * accessTokenExpireIn,
      });
      const newRefreshToken = signJWT({ userId }, JWT_PRIVATE_KEY_REFRESH, {
        expiresIn: 60 * 60 * refreshTokenExpireIn,
      });

      res.cookie('access_token', `Bearer ${newAccessToken}`, { httpOnly: true, secure: true });
      res.cookie('refresh_token', `Bearer ${newRefreshToken}`, { httpOnly: true, secure: true });

      // return {
      //   user: user as unknown as User,
      //   accessToken: newAccessToken,
      //   __typename: 'UserResponse'
      // };
      return user as unknown as User;

    } catch (error) {
      // console.error('Error refreshing token:', error);
      return {
        customError: 'Invalid refresh token',
        __typename: 'GraphqlError'
      };
    }
  };

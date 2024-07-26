import { UserModel } from '../../database/schemas/schemas'
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../error.custom.messages'
import { signJWT } from '../../utils/jwt'
import {
    JWT_PRIVATE_KEY_ACCESS,
    JWT_PRIVATE_KEY_REFRESH,
    accessTokenExpireIn,
    refreshTokenExpireIn,
} from '../../env/use.env'
import { LoginInput } from '../generated/generated__types'

//decrypt pw and sign tokens
export const tryLogin = async ({ username, password }: LoginInput) => {
    const foundUser = await UserModel.findOne({ username })
    if (foundUser) {
        const isPasswordValid = await foundUser.isValidPassword(password);
        if (isPasswordValid) {
            const userId = String(foundUser.id)
            const accessToken = signJWT({ userId }, JWT_PRIVATE_KEY_ACCESS, {
                expiresIn: 60 * 60 * accessTokenExpireIn,
                // expiresIn: 30, //in seconds 
            })
            const refreshToken = signJWT({ userId }, JWT_PRIVATE_KEY_REFRESH, {
                expiresIn: 60 * 60 * refreshTokenExpireIn,
            })
            return {
                user: foundUser,
                accessToken,
                refreshToken,
            }
        } else {
            return {
                customError: WRONG_PASSWORD,
            }
        }
    } else {
        return {
            customError: USER_NOT_FOUND,
        }
    }
}

import {
    MutationLoginUserArgs,
    User,
    TokenResponse,
} from '../generated/generated__types'
import { tryLogin } from './login.handler'
import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from '../../utils/config'
import { AuthContext } from '../../utils/types'

//login resolver
export const loginUser = async (
    _: undefined,
    { loginInput: { username, password } }: MutationLoginUserArgs,
    { req, res }: AuthContext
): Promise<TokenResponse> => {
    const loginResponse = await tryLogin({ username, password })
    const user = loginResponse.user
    if (user) {
        res.cookie(
            'access_token',
            `Bearer ${loginResponse.accessToken}`,
            accessTokenCookieOptions
        )
        res.cookie(
            'refresh_token',
            `Bearer ${loginResponse.refreshToken}`,
            refreshTokenCookieOptions
        )
        return user as unknown as User;
    } else {
        return {
            customError: loginResponse.customError,
            __typename: 'GraphqlError'
        }
    }
}

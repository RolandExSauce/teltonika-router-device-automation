import { AuthContext } from '../../utils/types'

//logout resolver
export const logoutUser = async (
    __: undefined,
    ___: undefined,
    { req, res, user }: AuthContext
): Promise<boolean> => {
    if (user) {
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        req.user = undefined
        return true
    }
    return false
}

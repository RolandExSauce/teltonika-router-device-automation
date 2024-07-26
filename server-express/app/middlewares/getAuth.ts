import { UserModel } from '../database/schemas/schemas'
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyJWT } from '../utils/jwt'
import { JWT_PUBLIC_KEY_ACCESS } from '../env/use.env'
import { IUser } from '../database/schemas/schemas.interfaces'

//get current user
export const getAuthUser = async (req: Request): Promise<IUser | undefined> => {
    const token = req.cookies['access_token'] //check cookies and retrieve accesstoken
    if (token && token.startsWith('Bearer ')) {
        //get access token and decode user
        const access_token = token.split(' ')[1]
        const decodedUser = verifyJWT(
            access_token,
            JWT_PUBLIC_KEY_ACCESS
        ) as JwtPayload

        if (decodedUser) {
            const user = (await UserModel.findOne({
                _id: decodedUser.userId,
            })) as IUser | undefined

            req.user = user
            return user
        }
    }
    return undefined
}

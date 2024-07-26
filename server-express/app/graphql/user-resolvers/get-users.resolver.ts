import { UserModel } from '../../database/schemas/schemas'
import { AuthContext } from '../../utils/types'
import { NO_RECORDS_EMPTY_COL_USER } from '../error.custom.messages'
import { GetUsersResult, User } from '../generated/generated__types'

//get users resolver
export const getUsers = async (
    _: undefined,
    __: undefined,
    { req, res, user }: AuthContext
): Promise<GetUsersResult> => {
    const users = (await UserModel.find({})) as User[]
    //get all users execept the one who made the request
    const arrWithoutUserWhoMadeReq =
        users.filter(userInDB => userInDB.username !== user?.username)
    let arrLength = arrWithoutUserWhoMadeReq.length; 
    //if arr length is 0 that means no other 
    //users exept the one who made the request is in collection
    return arrLength === 0 ?
        {
            customError:
            NO_RECORDS_EMPTY_COL_USER,
            __typename: 'GraphqlError'
        } :
        {
            users:
            arrWithoutUserWhoMadeReq,
            __typename: 'UsersSuccess'
        }
}

import {
    GeneralResult,
    MutationDeleteUserArgs,
} from '../generated/generated__types'
import { UserModel } from '../../database/schemas/schemas'
import {
    CANNOT_DELETE_USER,
    DELETE_USER_ERR,
    DELETE_WHERE_FOR_USER_MISSING,
    USER_ALTERED,
} from '../error.custom.messages'


//delete user resolver
export const deleteUser = async (
    _: undefined,
    { usernameOfToDeleteUser }: MutationDeleteUserArgs
): Promise<GeneralResult> => {
    if (!usernameOfToDeleteUser) {
        return {
            __typename: "GraphqlError",
            customError: DELETE_WHERE_FOR_USER_MISSING
        }
    }
    const userToDelete = await UserModel.findOne({
        username: usernameOfToDeleteUser,
    })
    if (!userToDelete) {
        return {
            __typename: "GraphqlError",
            customError: CANNOT_DELETE_USER
        }
    }
    const deletedUser = await UserModel.findByIdAndDelete(userToDelete)
    if (deletedUser) {
        return {
            __typename: "Success",
            successMsg: USER_ALTERED(usernameOfToDeleteUser, 'DELETE'),
        }
    } else {
        return {
            customError: DELETE_USER_ERR,
            __typename: "GraphqlError",
        }
    }
}

import {
    GeneralResult,
    MutationUpdateUserArgs,
    User,
} from '../generated/generated__types'
import { UserModel } from '../../database/schemas/schemas'
import {
    COULD_NOT_UPDATE_USER,
    UPDATE_USER_ERR,
    USER_ALTERED,
} from '../error.custom.messages'

//update user resolver
export const updateUser = async (
    _: undefined,
    {
        updateUserInput: {
            usernameOfToUpdateUser,
            newUsername,
            newPassword,
            newRole,
            newUserDep,
        },
    }: MutationUpdateUserArgs
): Promise<GeneralResult> => {
    const checkUserExist = (await UserModel.findOne({
        username: usernameOfToUpdateUser,
    })) as User

    if (!checkUserExist) {
        return {
            customError: COULD_NOT_UPDATE_USER,
        }
    }

    const updatedUser = await UserModel.findOneAndUpdate(
        { username: usernameOfToUpdateUser },
        {
            $set: {
                username: newUsername,
                password: newPassword,
                role: newRole,
                userDep: newUserDep,
                verified: false //when root admin resets another person's password, he must change it, so verified becomes false again
            },
        },
    )
    if (updatedUser) {
        return {
            successMsg: USER_ALTERED(usernameOfToUpdateUser, 'UPDATE'),
            __typename: 'Success'
        }
    } else {
        return {
            customError: UPDATE_USER_ERR,
            __typename: 'GraphqlError'
        }
    }
}

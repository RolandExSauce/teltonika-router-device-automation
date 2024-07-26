import {
    GeneralResult,
    MutationUpdateSelfArgs,
} from '../generated/generated__types';
import { UserModel } from '../../database/schemas/schemas';
import {
    COULD_NOT_UPDATE_USER,
    UPDATE_USER_ERR,
} from '../error.custom.messages';
import { IUser } from '../../database/schemas/schemas.interfaces';

//update user resolver, user can update his own data
export const updateSelf = async (
    _: undefined,
    {
        updateSelfInput: {
            usernameOfToUpdateUser,
            newUsername,
            newPassword
        }
    }: MutationUpdateSelfArgs
): Promise<GeneralResult> => {
    try {
        const userToUpdate = await UserModel.findOne({
            username: usernameOfToUpdateUser,
        }) as IUser;

        if (!userToUpdate) {
            return {
                customError: COULD_NOT_UPDATE_USER,
                __typename: 'GraphqlError'
            };
        }

        //prepare fields to update
        const updateFields: IUser = {} as IUser;
        if (newUsername) {
            updateFields.username = newUsername;
        }
        if (newPassword) {
            updateFields.password = newPassword;
            updateFields.verified = true; //update to true since user changed password
        }

        //update user in db
        const updatedUser = await UserModel.findOneAndUpdate(
            { username: usernameOfToUpdateUser },
            { $set: updateFields },
            { new: true } //return updated document
        );

        if (updatedUser) {
            const updatedFields = [];
            if (newUsername) updatedFields.push('username');
            if (newPassword) updatedFields.push('password');
            return {
                successMsg: `${updatedFields.join(' and ')} ${updatedFields.length > 1 ? 'were' : 'was'} updated`,
                __typename: "Success"
            };
        } else {
            return {
                customError: UPDATE_USER_ERR,
                __typename: "GraphqlError"
            };
        }
    } catch (error) {
        // console.error(error);
        return {
            customError: UPDATE_USER_ERR,
            __typename: 'GraphqlError'
        };
    }
};

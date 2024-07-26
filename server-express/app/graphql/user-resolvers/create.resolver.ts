import { GeneralResult, MutationCreateUserArgs } from '../generated/generated__types'
import { UserModel } from '../../database/schemas/schemas'
import { USER_ALREADY_EXIST, USER_ALTERED } from '../error.custom.messages'
import { getPosition } from '../../utils/tools'

//create user resolver
export const createUser = async (
    _: undefined,
    { createUserInput: {
        username, password, role, userDep
    } }: MutationCreateUserArgs
): Promise<GeneralResult> => {
    try {
        const user = new UserModel({
            username,
            password,
            role,
            userDep,
        });
        await user.save();
        return {
            successMsg: USER_ALTERED(user.username, 'CREATE'),
            __typename: 'Success'
        };
    } catch (error: any) {
        let errMsg = String(error.message);
        if (errMsg.includes('E11000')) errMsg = USER_ALREADY_EXIST;  //customize duplicate key error, simpler to read for client
        else errMsg = errMsg.substring(getPosition(errMsg, ':', 2) + 2); //+2 to remove ':' and space before the actual error message part
        return {
            customError: errMsg,
            __typename: 'GraphqlError'
        };
    }
};
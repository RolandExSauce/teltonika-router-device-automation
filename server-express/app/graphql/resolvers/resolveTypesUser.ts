// resolving unions using Object types
import { User } from '../generated/generated__types'

//resolve type for union on user login
const TokenResponse = {
    __resolveType: (obj: { username: string; customError: string }) =>
        obj.username ? 'User' : 'GraphqlError'
};

//resolve type for union on users query
const GetUsersResult = {
    __resolveType: (obj: { users: User[]; customError: string }) =>
        obj.users ? 'UsersSuccess' : 'GraphqlError'
}

export { TokenResponse, GetUsersResult }

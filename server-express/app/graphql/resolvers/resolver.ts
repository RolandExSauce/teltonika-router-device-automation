import { updateSelf } from './../user-resolvers/update.self.resolver';
import {
    ConfiguredDeviceResult,
    DeviceDetailedSearchResult,
    GetDevicesResult,
} from './resolveTypesDevice'
import { logoutUser } from '../user-resolvers/logout.resolver'
import { loginUser } from '../user-resolvers/login.resolver'
import { backupDATA } from '../device-resolvers/backup.resolver'
import { IResolvers } from '@graphql-tools/utils'
import { mergeResolvers } from '@graphql-tools/merge'
import { searchDeviceDetails } from '../device-resolvers/search.resolver'
import { getDevices } from '../device-resolvers/get-devices.resolver'
// import { configAndMaybeAddDeviceInDB } from '../device-resolvers/config.resolver'
// import { updateDeviceData } from '../device-resolvers/update.resolver'
import { deleteOneOrManyDevices } from '../device-resolvers/delete.resolver'
import {
    TokenResponse,
    GetUsersResult,
} from './resolveTypesUser'
import { getUsers } from './../user-resolvers/get-users.resolver'
import { createUser } from '../user-resolvers/create.resolver'
import { deleteUser } from '../user-resolvers/delete.resolver'
import { updateUser } from '../user-resolvers/update.resolver'
import { GraphqlError, TypeOfFiles } from '../generated/generated__types'
import { refreshToken } from '../user-resolvers/refreshToken.resolver';
import { configAndMaybeAddDeviceInDB } from '../device-resolvers/config.resolver';
//import { dateScalar } from "../../utils/scalarDate";


// resolve the general union for all fields that either return these two types
const GeneralResult = {
    __resolveType: (obj: { successMsg: string; customError: string }) =>
        obj.successMsg ? 'Success' : 'GraphqlError'
}

// resolve union for file related operations 
const GetAllFilesResult = {
    __resolveType: (obj: { filesType: TypeOfFiles; errObj: GraphqlError }) =>
        obj.filesType.configFiles || obj.filesType.importedCSVFiles ?
            'TypeOfFiles' : 'GraphqlError',
}


//resolvers for router device
const DeviceResolvers: IResolvers = {
    Query: {
        // searchDeviceDetails,
        getDevices,
        // backupDATA,
    },
    Mutation: {
        configAndMaybeAddDeviceInDB,
        deleteOneOrManyDevices
        // updateDeviceData,
        // deleteOneOrManyDevices,
    },
    ConfiguredDeviceResult,
    // DeviceDetailedSearchResult,
    // GetDevicesResult,
}

//resolvers for user
const UserResolvers: IResolvers = {
    // Date: dateScalar,
    Query: {
        logoutUser,
        getUsers,
    },
    Mutation: {
        refreshToken,
        loginUser,
        createUser,
        updateUser,
        updateSelf,
        deleteUser,
    },
    TokenResponse,
    GetUsersResult,
    GeneralResult,
    // GetAllFilesResult
}

//merge resolvers
export const resolvers: IResolvers = mergeResolvers([
    UserResolvers,
    DeviceResolvers,
])

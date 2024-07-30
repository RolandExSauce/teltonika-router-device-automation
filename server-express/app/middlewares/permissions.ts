import { and, shield, rule } from 'graphql-shield'
import {
    FORBIDDEN_REQUEST_FOR_USERS,
    FORBIDDEN_IF_NO_AUTH,
    FORBIDDEN_IF_NOT_ROOT,
} from '../graphql/error.custom.messages'
import { AuthContext } from '../utils/types'

//only authenticated users
const isAuthenticated = rule({ cache: 'contextual' })(async (
    parent,
    args,
    { req, res, user }: AuthContext,
    info
) => {
    if (user) return true
    else return FORBIDDEN_IF_NO_AUTH
})


//only authenticated users and verified
const isAuthenticatedAndVerified = rule({ cache: 'contextual' })(async (
    parent,
    args,
    { req, res, user }: AuthContext,
) => {
    if (!user) return FORBIDDEN_IF_NO_AUTH;
    else return user.verified ? true : 'You are not verified';
});


//allow admin or root
const isAdminOrRootAndVerified = rule({ cache: 'contextual' })(async (
    parent,
    args,
    { req, res, user }: AuthContext,
) => {
    if ((user && user?.role === 'ADMIN' || user?.role === 'ROOT') && user.verified)
        return true
    else return FORBIDDEN_REQUEST_FOR_USERS
})

//root only
const isRootAndVerified = rule({ cache: 'contextual' })(async (
    parent,
    args,
    { req, res, user }: AuthContext,
) => {
    if (user && user?.role === 'ROOT' && user.verified) return true
    else return FORBIDDEN_IF_NOT_ROOT
})

// addd permissions to resolvers
export const permissions = shield({
    Query: {
        // searchDeviceDetails: and(isAuthenticated, isAdminOrRoot),

        getDevices: and(isAuthenticatedAndVerified),
        // backupDATA: and(isAuthenticated, isAdminOrRoot),

        //users lated query
        getUsers: and(isRootAndVerified), //only root users can see other users
    },

    Mutation: {
        //router device mutations
        configAndMaybeAddDeviceInDB: and(isAdminOrRootAndVerified), //admin or root can do operations on router device
        //updateDeviceData: and(isAuthenticated, isAdminOrRoot),
        deleteOneOrManyDevices: and(isAuthenticated, isRootAndVerified),

        //user mutations
        createUser: and(isRootAndVerified),
        deleteUser: and(isRootAndVerified),
        updateUser: and(isRootAndVerified),
        updateSelf: and(isAuthenticated), //this will allow user to update their own password
    },
})

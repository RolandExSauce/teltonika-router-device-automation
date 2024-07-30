// CUSTOM ERROR MESSAGES FOR GRAPHQL OPERATIONS
const USER_NOT_FOUND = 'Sorry, this user does not exist'
const WRONG_PASSWORD = 'Password incorrect'

const CANNOT_DELETE_ROUTER = 'Router cannot be deleted as it does not exist'
const NO_ROUTER_EXIST = 'No router found with this information'



const ONE_OR_MORE_SSID_MISSING_FOR_DELETE = 'Provide wifi ssid of device or multiple ssids to delete';

// const DELETE_WHERE_FOR_ROUTER_MISSING =
//     ' Serialnumber was not provided, cannot delete router!'

const ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED =
    'Router deleted, but backup file could not be updated' //unlikely to happen unless problems with fs module

const SEARCH_OPTION_MISSING_ROUTER =
    'Provide one of the search criteria to proceed'

const CONFIG_GONE_WRONG = 'Configuration failed!'

const TOOK_TOO_LONG =
    'Check if the router is connected and has internet access!'

const ROUTER_ALREADY_CONFIGURED =
    'Router already exists and is configured,\nContact the admin if this is not correct!'

//empty collection, no devices found
const NO_RECORDS_EMPTY_COL_DEVICE =
    'No device records found in the DB,\nFor support, contact your administrator'

/**************************************************** */
const FORBIDDEN_IF_NO_AUTH = 'Either not authenticated or accesstoken expired!'

const FORBIDDEN_REQUEST_FOR_USERS =
    'No admin or root user token found, request denied!' // if normal users try to execute root or admin resources?

const FORBIDDEN_IF_NOT_ROOT = 'No root user token found, request denied!'

/************************************************************************* */
const FORBIDDEN_OPERATION_UPDATE = 'No permission to edit data!'

const BACKUP_CREATED = 'Backup successfully created'

const ERROR_WHILE_CREATING_BACKUP = 'Error while creating the backup!'

const NO_NEED_TO_CREATE_BACKUP =
    'Backup already exists - configure new routers and then create a backup!'

const DATA_INCONSISTENT =
    'There are more data entries in the CSV than in the DB - Contact the admin!'

// DEFAULT FALLBACK ERROR
const UNKNOWN_ERROR = 'An unknown error has occurred! - Contact the admin'

const COULD_NOT_UPDATE_ROUTER = 'Router does not exist, cannot be updated!'

// when operation on router performed
const ROUTER_ALTERED = (ssidOfDeletedRouter: string, routerOp: string) => {
    let replaceInString = ''
    if (routerOp === 'DELETE') replaceInString = 'HAS BEEN DELETED'
    else if (routerOp === 'UPDATE') replaceInString = 'HAS BEEN UPDATED'
    else if (routerOp === 'CONFIG') replaceInString = 'HAS BEEN CONFIGURED'
    else if (routerOp === 'NO_UPDATE')
        replaceInString = ', VALUES REMAIN THE SAME!'
    return `ROUTER WITH SSID: ${ssidOfDeletedRouter} ${replaceInString}`
}

/* FOR USER RELATED ERR MESSAGES ******************************************************************************************** */
const NO_RECORDS_EMPTY_COL_USER =
    'No user records found, contact admin if you think this is an error'
const USER_ALREADY_EXIST =
    'No duplicate usernames allowed!'
const CANNOT_DELETE_USER = 'Delete failed, user does not exist!'

const COULD_NOT_UPDATE_USER = 'Update failed, user does not exist!'

const UPDATE_USER_ERR = 'An error occured while trying update the user' //unlikely to happen unless problems with mongoose api

const DELETE_USER_ERR = 'An error occured while trying to delete the user' //same like the above

const DELETE_WHERE_FOR_USER_MISSING =
    ' Provide the username to delete the user'

// when operation on user performed
const USER_ALTERED = (usernameOfDeletedUser: string, userOp: string) => {
    let replaceInString = ''
    if (userOp === 'DELETE') replaceInString = 'has been deleted'
    else if (userOp === 'UPDATE') replaceInString = 'has been updated'
    else if (userOp === 'CREATE') replaceInString = 'has been created'
    else if (userOp === 'NO_UPDATE')
        replaceInString = ', values remain the same!'
    return `User with the username "${usernameOfDeletedUser}" ${replaceInString}`
}



// export custom messages
export {
    NO_ROUTER_EXIST,
    SEARCH_OPTION_MISSING_ROUTER,
    CONFIG_GONE_WRONG,
    CANNOT_DELETE_ROUTER,
    FORBIDDEN_IF_NO_AUTH,
    NO_RECORDS_EMPTY_COL_DEVICE,
    ONE_OR_MORE_SSID_MISSING_FOR_DELETE,
    /******************************* */
    FORBIDDEN_REQUEST_FOR_USERS,
    ROUTER_DELETED_BUT_BACKUP_FILE_NOT_UPDATED,
    FORBIDDEN_OPERATION_UPDATE,
    FORBIDDEN_IF_NOT_ROOT,
    /***********************+**** */
    NO_NEED_TO_CREATE_BACKUP,
    ERROR_WHILE_CREATING_BACKUP,
    COULD_NOT_UPDATE_ROUTER,
    DATA_INCONSISTENT,

    /****************************** */
    ROUTER_ALREADY_CONFIGURED,
    USER_NOT_FOUND,
    WRONG_PASSWORD,
    UNKNOWN_ERROR,
    BACKUP_CREATED,
    TOOK_TOO_LONG,
    ROUTER_ALTERED,

    /*FOR USERS ******************************************* */
    NO_RECORDS_EMPTY_COL_USER,
    USER_ALREADY_EXIST,
    CANNOT_DELETE_USER,
    COULD_NOT_UPDATE_USER,
    DELETE_WHERE_FOR_USER_MISSING,
    UPDATE_USER_ERR,
    DELETE_USER_ERR,
    USER_ALTERED,
}

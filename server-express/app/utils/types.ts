import { Request, Response } from 'express'
import { Server as httpsServer } from 'https'
import { Server as httpServer } from 'http'
import { GraphqlError, InputMaybe, StatusAfterConfig, Success } from '../graphql/generated/generated__types'
import { IRule } from 'graphql-shield'
import { IUser } from '../database/schemas/schemas.interfaces'

//all env variables
interface ENVS {
    /*********************** */
    NODE_ENV: string
    EXPRESS_APP_PORT: number
    CLIENT_URL_PROD: string
    CLIENT_URL_DEV: string
    /****************************** */
    HOSTING_ENV: string
    DB_URI_NOT_LOCAL: string
    DB_URI_LOCAL: string

    MONGO_INITDB_ROOT_USERNAME: string
    MONGO_INITDB_ROOT_PASSWORD: string
    MONGO_INITDB_DATABASE: string
    //********************************** */
    DEFAULT_USER: string
    DEFAULT_USER_PASS: string
    DEFAULT_USER_ROLE: string
    DEFAULT_USER_DEP: string
    /************************* */
    JWT_PRIVATE_KEY_ACCESS: string
    JWT_PUBLIC_KEY_ACCESS: string
    jwtAccessTokenExpiresIn: number

    JWT_PRIVATE_KEY_REFRESH: string
    JWT_PUBLIC_KEY_REFRESH: string
    jwtRefreshTokenExpiresIn: number
}

//interface for context
interface AuthContext {
    req: Request
    res: Response
    user: IUser | undefined | null
}

//env type
type ConfigType = {
    [key: string]: EnvType
}

//typescript types
interface EnvType {
    introspection: boolean
    ssl: boolean
    port: number
    hostname: string
}
//http or https module
type httpRes = httpsServer | httpServer

/****************************************************************/

//interface host data for router config
interface IDataConfig {
    username: string
    password: string
    newCredentials?: INewCredentials
}

//type for new credentials in config script
interface IWireless {
    newSSID: string
    newWifiPass: string
}

//when new credentials are created for router device configuration
interface INewCredentials {
    newPassWifi: string | undefined;
    newPassForWebUser: string | undefined;
    newPassForShellUser: InputMaybe<string> | undefined; //cuz it comes from subtype deviceFieldsOptional
}

//type of passwords
interface typePasswords {
    adminPassword: string
    defaultAdminPassword: string
    wifiPassword: string
    defaultWifiPassword: string
    rootPassword: string
}

interface folderAndFileName {
    subfolder: string;
    fileName: string
}


export {
    AuthContext,
    ConfigType,
    EnvType,
    httpRes,
    IWireless,
    typePasswords,
    IDataConfig,
    INewCredentials,
    folderAndFileName,
    ENVS,
}

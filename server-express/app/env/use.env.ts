import { Department, Role } from '../database/schemas/schemas.interfaces'

import validateEnv from './validate.env'

const NODE_ENV = validateEnv().NODE_ENV

//Keys and expiring times for JWT ----------------------------------------------
const JWT_PRIVATE_KEY_ACCESS = validateEnv().JWT_PRIVATE_KEY_ACCESS
const JWT_PUBLIC_KEY_ACCESS = validateEnv().JWT_PUBLIC_KEY_ACCESS
const accessTokenExpireIn = validateEnv().jwtAccessTokenExpiresIn

const JWT_PRIVATE_KEY_REFRESH = validateEnv().JWT_PRIVATE_KEY_REFRESH
const JWT_PUBLIC_KEY_REFRESH = validateEnv().JWT_PUBLIC_KEY_REFRESH
const refreshTokenExpireIn = validateEnv().jwtRefreshTokenExpiresIn

/* ports, hosts **********************************************************/
const EXPRESS_APP_PORT = validateEnv().EXPRESS_APP_PORT

//client hostnames, urls etc
const CLIENT_URL_PROD = validateEnv().CLIENT_URL_PROD
const CLIENT_URL_DEV = validateEnv().CLIENT_URL_DEV


// mongo, credentials, auth mechanism *****************************************
const HOSTING_ENV = validateEnv().HOSTING_ENV
const DB_URI_NOT_LOCAL = validateEnv().DB_URI_NOT_LOCAL
const DB_URI_LOCAL = validateEnv().DB_URI_LOCAL

const MONGO_INITDB_ROOT_USERNAME = validateEnv().MONGO_INITDB_ROOT_USERNAME
const MONGO_INITDB_ROOT_PASSWORD = validateEnv().MONGO_INITDB_ROOT_PASSWORD
const MONGO_INITDB_DATABASE = validateEnv().MONGO_INITDB_DATABASE

/* data to create default user  *************************/
const DEFAULT_USER = validateEnv().DEFAULT_USER
const DEFAULT_USER_PASS = validateEnv().DEFAULT_USER_PASS
const DEFAULT_USER_ROLE = validateEnv().DEFAULT_USER_ROLE as Role
const DEFAULT_USER_DEP = validateEnv().DEFAULT_USER_DEP as Department
/************************************************************/

export {
    /************************** */
    JWT_PRIVATE_KEY_ACCESS,
    JWT_PUBLIC_KEY_ACCESS,
    accessTokenExpireIn,
    JWT_PRIVATE_KEY_REFRESH,
    JWT_PUBLIC_KEY_REFRESH,
    refreshTokenExpireIn,
    /***************************/
    NODE_ENV,
    EXPRESS_APP_PORT,
    /**************************/
    CLIENT_URL_PROD,
    CLIENT_URL_DEV,
    HOSTING_ENV,
    DB_URI_LOCAL,
    DB_URI_NOT_LOCAL,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    /*************************/
    DEFAULT_USER,
    DEFAULT_USER_PASS,
    DEFAULT_USER_ROLE,
    DEFAULT_USER_DEP,
}

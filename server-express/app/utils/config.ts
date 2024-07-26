import fs from 'fs'
import {
    CLIENT_URL_DEV,
    CLIENT_URL_PROD,
    EXPRESS_APP_PORT,
    HOSTING_ENV,
    NODE_ENV,
    accessTokenExpireIn,
    refreshTokenExpireIn,
} from '../env/use.env'
import { ConfigType } from './types'
import { CookieOptions } from 'express'

//docker or local? prod or dev ?
const hostEnvNotLocal = HOSTING_ENV === 'docker'
const isProd = NODE_ENV === 'production'

//set urls and hostnames
export const appUrl = isProd
    ? CLIENT_URL_PROD
    :  CLIENT_URL_DEV

const configurations: ConfigType = {
    production: {
        introspection: false,
        ssl: true,
        port: EXPRESS_APP_PORT,
        hostname:  new URL(appUrl).hostname,
    },
    development: {
        introspection: true,
        ssl: false,
        port: EXPRESS_APP_PORT,
        hostname: new URL(appUrl).hostname,
    },
}

//read ssl certificate
const readCertificateFile = (filePath: string): string => {
    return fs.readFileSync(require.resolve(filePath), { encoding: 'utf8' })
}

const serverOptions = {
    key: readCertificateFile('../../cert/server.key'),
    cert: readCertificateFile('../../cert/server.crt'),
}

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'strict',
}

const accessTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * accessTokenExpireIn,
    expires: new Date(Date.now() + 1000 * 60 * 30 * accessTokenExpireIn),
    // maxAge: 1000 * 30, //in milliseconds 1000miliseconds = 1sec * 30 = 30sec
    // expires: new Date(Date.now() + 1000 * 30),
}

const refreshTokenCookieOptions: CookieOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * refreshTokenExpireIn,
    expires: new Date(Date.now() + 1000 * 60 * 30 * refreshTokenExpireIn),
}

export {
    isProd,
    hostEnvNotLocal,
    configurations,
    serverOptions,
    cookieOptions,
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
}

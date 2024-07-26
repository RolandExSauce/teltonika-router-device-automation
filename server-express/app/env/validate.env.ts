import { cleanEnv, num, port, str } from 'envalid'
import { ENVS } from '../utils/types'
require('dotenv').config({ path: require('find-config')('../../.env') })

const processEnv: NodeJS.ProcessEnv = process.env
//Function to validate .env variables
const validateEnv = (): Readonly<ENVS> => {
    return cleanEnv(processEnv, {
        /**********************/
        NODE_ENV: str(),
        EXPRESS_APP_PORT: port(),
        CLIENT_URL_PROD: str(),
        CLIENT_URL_DEV: str(),
        /*********************** */
        HOSTING_ENV: str(),
        DB_URI_LOCAL: str(),
        DB_URI_NOT_LOCAL: str(),
        MONGO_INITDB_ROOT_USERNAME: str(),
        MONGO_INITDB_ROOT_PASSWORD: str(),
        MONGO_INITDB_DATABASE: str(),
        //********************************** */
        DEFAULT_USER: str(),
        DEFAULT_USER_PASS: str(),
        DEFAULT_USER_ROLE: str(),
        DEFAULT_USER_DEP: str(),

        //keys
        JWT_PRIVATE_KEY_ACCESS: str(),
        JWT_PUBLIC_KEY_ACCESS: str(),
        jwtAccessTokenExpiresIn: num(),

        JWT_PRIVATE_KEY_REFRESH: str(),
        JWT_PUBLIC_KEY_REFRESH: str(),
        jwtRefreshTokenExpiresIn: num(),
    })
}
export default validateEnv

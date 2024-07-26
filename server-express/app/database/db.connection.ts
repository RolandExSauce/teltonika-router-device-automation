import { hostEnvNotLocal, isProd } from '../utils/config'
import { UserModel } from './schemas/schemas'
import mongoose from 'mongoose'
import {
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_DATABASE,
    DEFAULT_USER_PASS,
    DB_URI_NOT_LOCAL,
    DEFAULT_USER,
    DB_URI_LOCAL,
} from '../env/use.env'
import { Department, Role } from './schemas/schemas.interfaces'

// Establishe connection to MongoDB or to mongo service in docker,
export const connectToDB= async (): Promise<void> => {
    try {
        await mongoose.connect(
            isProd && hostEnvNotLocal ? DB_URI_NOT_LOCAL : DB_URI_LOCAL,
            {
                user: MONGO_INITDB_ROOT_USERNAME,
                pass: MONGO_INITDB_ROOT_PASSWORD,
                dbName: MONGO_INITDB_DATABASE,
                authSource: 'admin',
                authMechanism: 'SCRAM-SHA-256',
            }
        )
        const isConnected = mongoose.connection.readyState === 1
        if (isConnected) {
            //default root user will be created and password must be changed on first login
            const rootUserExist = await UserModel.findOne({
                username: DEFAULT_USER,
            })
            
            if (!rootUserExist) {
                const rootUser = new UserModel({
                    username: DEFAULT_USER,
                    password: DEFAULT_USER_PASS,
                    role: Role.ROOT,
                    userDep: Department.IT,
                })
                await rootUser.save()
            }
            console.log(
                isProd && hostEnvNotLocal
                    ? `Connected to MongoDB service 🥦🥦`
                    : `Connected to  local Mongo Database 🥦🥦`
            )
        }
    } catch (err: any) {
        if (err.message.includes('ECONNREFUSED'))
            console.log(`Local or Mongo service not running!`)
    }
}

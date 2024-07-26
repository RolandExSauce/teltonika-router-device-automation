import express from 'express'
import cookieParser from 'cookie-parser'
import cors, { CorsOptions } from 'cors'
//import { controllerValidateUser } from "./middlewares/express.authhandler";
import { uploadSDKFile } from './middlewares/uploadMiddleware'
import { appUrl } from './utils/config'
import { IUser } from './database/schemas/schemas.interfaces'


// Add the user field to the Request interface
declare global {
    namespace Express {
        interface Request {
            user?: IUser | null
        }
    }
}

const app = express() //express app instance
//origin, include cookies
const corsOptions: CorsOptions = {
    origin: appUrl,
    credentials: true,
}

// Use middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Handling requests for /webTonikApi endpoint
app.use(
    '/webTonikApi',
    cors<cors.CorsRequest>(corsOptions)
)

//FIXME: GET USER INSIDE HERE
//app.use(controllerValidateUser)
app.post(
    '/webTonikApi/app-files/upload',
    uploadSDKFile
)

export { app, corsOptions }

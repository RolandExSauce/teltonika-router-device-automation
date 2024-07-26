import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServer, BaseContext } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { applyMiddleware } from 'graphql-middleware'
import { Request, Response } from 'express'
import https from 'https'
import http from 'http'

//local imports
import { schema } from './graphql/generated/generated.schema'
import { app } from './app'
import { configurations, isProd, serverOptions } from './utils/config'
import depthLimit from 'graphql-depth-limit'
import { httpRes } from './utils/types'
import { getAuthUser } from './middlewares/getAuth'
import { permissions } from './middlewares/permissions'
import { connectToDB } from './database/db.connection'

/**
 * Creates an HTTP or HTTPS server based on the production mode.
 * @returns {Promise<{httpServer: httpRes, port?: number, hostname?: string, ssl?: boolean, introspection?: boolean}>} Object containing server information.
 * set introspection to false when in production mode to prevent attacks
 * @param introspection
 * 
 */

//create http server based on production mode
const createHttpOrHttpsServer = async (): Promise<{
    httpServer: httpRes
    port?: number
    hostname?: string
    ssl?: boolean
    introspection?: boolean
}> => {
    const config = isProd
        ? configurations['production']
        : configurations['development']

    const httpServer = isProd
        ? https.createServer(serverOptions, app)
        : http.createServer(app)

    return {
        httpServer,
        port: config.port,
        hostname: config.hostname,
        ssl: config.ssl,
        introspection: config.introspection,
    }
}

//start apollo server
const startApolloServer = async (): Promise<void> => {
    const { httpServer, hostname, port, ssl, introspection } =
        await createHttpOrHttpsServer()

    //add permissions to schema
    const schemaWithPermissions = applyMiddleware(schema, permissions)
    const server = new ApolloServer<BaseContext>({
        schema: schemaWithPermissions,
        introspection,
        cache: 'bounded', //maybe manage cache another way
        csrfPrevention: true,
        validationRules: [depthLimit(10)], //query depth limit
        plugins: [
            isProd
                ? ApolloServerPluginLandingPageProductionDefault({
                    graphRef: '@GraphTonik',
                    footer: false,
                })
                : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
    })
    await server.start()
    await connectToDB()

    app.use(
        expressMiddleware(server, {
            context: async ({ req, res }: { res: Response; req: Request }) => ({
                req,
                res,
                user: await getAuthUser(req),
            }),
        })
    )
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
    console.log(
        `Express app running at http${ssl ? 's' : ''}://${hostname}:${port} 🔥🔥`,
        `\nGraphql server ready at http${ssl ? 's' : ''
        }://${hostname}:${port}/webTonikApi 🫧 🫧`
    )
}

//watch for errors
const watchServer = async () => {
    const { httpServer } = await createHttpOrHttpsServer()
    process.on('unhandledRejection', (err: any) => {
        console.log('UNHANDLED REJECTION 😡😡 Shutting down...')
        console.error('Error❗❗❗', err.message)
        httpServer.close(async () => {
            process.exit(1)
        })
    })
};
(async () => {
    await startApolloServer()
    await watchServer()
})()

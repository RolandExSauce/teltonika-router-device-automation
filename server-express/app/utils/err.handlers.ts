import { Request, Response, NextFunction } from 'express'

//err handler
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack)
    res.status(500).send(`AN ERROR OCCURRED WHILE PROCESSING YOUR REQUEST.`)
}

export default errorHandler

import { Request, Response, NextFunction } from 'express'
import { getAuthUser } from './getAuth'

//validate user
export const controllerValidateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Perform user existence and validation logic here
    const loggedInUser = await getAuthUser(req)
    if (!loggedInUser) {
        res.status(401).send(new Error(`NO AUTH`)) // User not authenticated
        return
    }
    // console.log(req.user)
    // req.user = loggedInUser;
    next() // Allow request to proceed
}

// //only for admins
// export const restrictToAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const loggedInUser = req.user;
//   console.log("got user: ", loggedInUser)
//   // Check if user exists and is an admin
//   if (req.user && req.user.role === "ADMIN") {
//     next(); // Allow request to proceed
//   } else {
//     res.status(403).send(`YOU ARE NOT AUTHORIZED TO MAKE THIS REQUEST!`); // User not authorized to perform the action
//   }
// };

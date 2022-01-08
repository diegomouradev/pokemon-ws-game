// import { NextFunction, Request, Response } from 'express';
// import { User } from '../models/userModel';

// export function login(req: Request, res: Response) {

//     const email = req.body.email,
//           password = req.body.password;

//     if (validateEmailAndPassword()) {
//        const userId = findUserIdForEmail(email);

//         const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
//                 algorithm: 'RS256',
//                 expiresIn: 120,
//                 subject: userId
//             }

//           // send the JWT back to the user
//           // TODO - multiple options available
//     }
//     else {
//         // send status 401 Unauthorized
//         res.sendStatus(401);
//     }
// }

// export const signup = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const newUser = await User.create(req.body);

//   res.status(201).json({
//     status: 'sucess',
//     data: {
//       user: newUser,
//     },
//   });
// };

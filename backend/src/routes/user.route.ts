import express, { Request, Response } from "express"
import userController from "../controllers/user.controller"

export const userRouter = express()

userRouter
  .route("/users")
  .get((req: Request, res: Response) => userController.getUsers(req, res))

userRouter
  .route("/user/:id")
  .get((req: Request, res: Response) => userController.getUser(req, res))

userRouter
  .route("/user")
  .post((req: Request, res: Response) => userController.createUser(req, res))

userRouter
  .route("/token")
  .post((req: Request, res: Response) => userController.createToken(req, res))

userRouter
  .route("/login")
  .get((req: Request, res: Response) => userController.login(req, res))

import { Request, Response } from "express"

import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"

import userService from "../services/user.service"

const SECRET = "mysecret"

namespace userController {
  export const getUsers = async (_: Request, res: Response) => {
    const users = await userService.getAll()

    res.status(200).json([...users])
  }

  export const getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const response = await userService.get(id)

      if (!response)
        throw {
          code: 404,
          message: "The user you tried to access does not exist.",
        }

      res.status(200).json(response)
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const login = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization!

      const decoded = jwt.verify(token, "mysecret")

      const response = await userService.getByEmail(
        (decoded as JwtPayload).email
      )

      if (!response)
        throw {
          code: 404,
          message: "The user you tried to access does not exist.",
        }

      res.status(200).json(response)
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const createUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (email === "" || password === "")
        throw {
          code: 400,
          message: "All fields are required.",
        }

      const emailExist = await userService.emailExists(email)

      if (emailExist)
        throw {
          code: 409,
          message: "There is already a user with that same email.",
        }

      const name = (email as string).split("@")[0]

      const salt = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(password, salt)

      const response = await userService.create({
        name,
        email,
        password: encryptedPassword,
      })

      res.status(201).json(response)
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const createToken = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await userService.getByEmail(email)

      if (!user) throw { error: 404, message: "User not found." }

      const validatedPassword = await bcrypt.compare(password, user.password)

      if (!validatedPassword)
        throw {
          code: 400,
          message:
            "The password you entered is incorrect. Please try again or reset your password if needed.",
        }

      const token = jwt.sign(
        {
          email: email.toLocaleLowerCase(),
        },
        SECRET,
        {
          expiresIn: "24h",
        }
      )

      res.status(201).json({ token })
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }
}

export = userController

import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const permission = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!
  const SECRET = "mysecret"

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ error: "You don't have authorization." })
    }

    return next()
  })
}

export default permission

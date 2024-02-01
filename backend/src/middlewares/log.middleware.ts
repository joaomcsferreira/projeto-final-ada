import { NextFunction, Request, Response } from "express"

export const log = (req: Request, _: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString()
  const logMessage = `${timestamp}: ${req.method} ${req.url}`

  console.log(logMessage)

  next()
}

export const CustomCors = (_: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Content-Type, Accept"
  )
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE")

  next()
}

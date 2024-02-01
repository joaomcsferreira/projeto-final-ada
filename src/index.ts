import express, { NextFunction, Response } from "express"
import cors from "cors"

import { db } from "./database/db"
import { restaurantRouter } from "./routes/restaurant.route"
import { userRouter } from "./routes/user.route"
import { CustomCors, log } from "./middlewares/log.middleware"

const app = express()
const PORT = 7342

app.use(express.json())
db.sync()

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}/`)
)

app.use(cors())
app.use(CustomCors)

app.get("/", (_, response: Response) => response.send({ version: "1.0.0" }))

app.use(log)
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json({ limit: "10mb" }))

app.use("/", restaurantRouter)
app.use("/", userRouter)

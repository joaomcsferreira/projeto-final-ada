import express, { Request, Response } from "express"
import restaurantController from "../controllers/restaurant.controller"
import permission from "../middlewares/user.middleware"
import { uploadImage } from "../utils/multer"

export const restaurantRouter = express()

restaurantRouter
  .route("/restaurants")
  .get((req: Request, res: Response) =>
    restaurantController.getRestaurants(req, res)
  )

restaurantRouter
  .route("/restaurant/:id")
  .get((req: Request, res: Response) =>
    restaurantController.getRestaurant(req, res)
  )

restaurantRouter
  .route("/restaurant")
  .post(permission, uploadImage, (req: Request, res: Response) =>
    restaurantController.createRestaurant(req, res)
  )

restaurantRouter
  .route("/restaurant/:id")
  .put(permission, uploadImage, (req: Request, res: Response) =>
    restaurantController.updateRestaurant(req, res)
  )

restaurantRouter
  .route("/restaurant/:id")
  .delete(permission, (req: Request, res: Response) =>
    restaurantController.deleteRestaurant(req, res)
  )

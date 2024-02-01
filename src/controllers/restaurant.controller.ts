import { Request, Response } from "express"

import restaurantService from "../services/restaurant.service"
import { TRestaurant } from "../types/restaurant.type"

namespace restaurantController {
  export const getRestaurants = async (req: Request, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined

    const restaurants = await restaurantService.getAll(limit)

    res.status(200).json([...restaurants])
  }

  export const getRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const response = await restaurantService.get(id)

      if (!response)
        throw {
          code: 404,
          message: "The restaurant you tried to access does not exist.",
        }

      res.status(200).json(response)
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const createRestaurant = async (req: Request, res: Response) => {
    try {
      const image = req.file?.filename
      const restaurant = { ...req.body, image }

      if (
        restaurant.name === "" ||
        restaurant.address === "" ||
        restaurant.phone === "" ||
        restaurant.cuisineType === "" ||
        restaurant.rating === "" ||
        restaurant.openingHours === "" ||
        restaurant.hasDelivy === ""
      )
        throw { code: 400, message: "All fields are required." }

      const restaurantExist = await restaurantService.getByName(restaurant.name)

      if (restaurantExist)
        throw {
          code: 409,
          message: "There is already a restaurant with that name.",
        }

      const response = await restaurantService.create(restaurant)

      res.status(201).json(response)
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const updateRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurant = req.body
      const { id } = req.params

      if (restaurant.name) {
        const restaurantExist = await restaurantService.getByName(
          restaurant.name
        )

        if (restaurantExist && restaurantExist.id != id)
          throw {
            code: 409,
            message: "There is already a restaurant with that name.",
          }
      }

      const restaurantOld = await restaurantService.get(id)

      const restaurantUpdate: TRestaurant = {
        name: restaurant.name || restaurantOld.name,
        address: restaurant.address || restaurantOld.address,
        phone: restaurant.phone || restaurantOld.phone,
        cuisineType: restaurant.cuisineType || restaurantOld.cuisineType,
        rating: restaurant.rating || restaurantOld.rating,
        openingHours: restaurant.openingHours || restaurantOld.openingHours,
        hasDelivery: restaurant.hasDelivery || restaurantOld.hasDelivery,
        image: restaurant.image || restaurantOld.image,
      }

      const [response] = await restaurantService.update(id, restaurantUpdate)

      if (!response)
        throw {
          code: 404,
          message: "The restaurant you tried to update doesn't exist.",
        }

      res.status(200).json({ message: "Restaurant updated successfully." })
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }

  export const deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const response = await restaurantService.remove(id)

      if (!response)
        throw {
          code: 404,
          message: "The restaurant you tried to delete doesn't exist.",
        }

      res.status(200).json({ message: "Restaurant removed successfully." })
    } catch (error: any) {
      res
        .status(error?.code || 500)
        .json({ error: error.message || error.toString() })
    }
  }
}

export = restaurantController

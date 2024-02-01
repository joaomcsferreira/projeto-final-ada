import Restaurant from "../models/restaurant.model"
import { TRestaurant } from "../types/restaurant.type"

namespace restaurantService {
  export const getAll = async (limit: number | undefined) => {
    const restaurants = await Restaurant.findAll({ limit })

    return restaurants as unknown as TRestaurant[]
  }

  export const get = async (id: string) => {
    const restaurant = await Restaurant.findByPk(id)

    return restaurant as unknown as TRestaurant
  }

  export const create = async (restaurant: TRestaurant) => {
    const response = await Restaurant.create(restaurant)

    return response
  }

  export const update = async (id: string, restaurant: TRestaurant) => {
    const filter = {
      where: { id },
      returing: true,
      plain: true,
    }

    const restaurantUpdate = await Restaurant.update(restaurant, filter)

    return restaurantUpdate
  }

  export const remove = async (id: string) => {
    const filter = { where: { id } }

    const countDeleted = await Restaurant.destroy(filter)

    return countDeleted
  }

  export const getByName = async (name: string) => {
    const restaurant = await Restaurant.findOne({ where: { name } })

    return restaurant as unknown as TRestaurant
  }
}

export = restaurantService

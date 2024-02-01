import User from "../models/user.model"
import { TUser } from "../types/user.type"

namespace userService {
  export const getAll = async () => {
    const users = await User.findAll()

    return users
  }

  export const get = async (id: string) => {
    const user = await User.findByPk(id)

    return user
  }

  export const getByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } })

    return user as unknown as TUser
  }

  export const create = async (user: TUser) => {
    const response = await User.create(user)

    return response
  }

  export async function emailExists(email: string) {
    const user = await User.findOne({ where: { email } })

    return !!user
  }
}

export = userService

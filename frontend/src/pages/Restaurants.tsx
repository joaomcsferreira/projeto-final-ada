import axios from "axios"
import React from "react"
import Restaurant from "../components/Restaurant/Restaurant"
import { useUserContext } from "../UserContext"

interface IRestaurants {
  setModal: React.Dispatch<React.SetStateAction<string>>
  setCurrent: React.Dispatch<React.SetStateAction<string>>
}

export interface IRestaurant {
  id: string
  name: string
  address: string
  phone: string
  cuisineType: string
  rating: number
  openingHours: string
  hasDelivery: string
  image: string
  createdAt: string
  updatedAt: string
}

const VITE_API_URL = import.meta.env.VITE_API_URL

const Restaurants = ({ setModal, setCurrent }: IRestaurants) => {
  const [restaurants, setRestaurants] = React.useState<Array<IRestaurant>>([])

  const { logged } = useUserContext()

  React.useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get(`${VITE_API_URL}/restaurants`)

      setRestaurants(response.data)
    }

    getRestaurants()
  }, [restaurants])

  return (
    <div
      id="restaurants"
      className="px-[5rem] mb-10 flex flex-col gap-5 py-4 min-h-[80vh]"
    >
      <div className="flex justify-between">
        <h1 className="text-red-main text-5xl font-bold">Restaurantes</h1>
        {logged && (
          <button
            onClick={() => setModal("adicionar")}
            className="px-8 py-3 bg-red-main text-sm text-white font-bold rounded-lg hover:bg-red-700"
          >
            Adicionar
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {restaurants.map((item) => (
          <Restaurant
            item={item}
            key={item.id}
            setModal={setModal}
            setCurrent={setCurrent}
          />
        ))}
      </div>
    </div>
  )
}

export default Restaurants

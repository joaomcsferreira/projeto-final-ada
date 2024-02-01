import React from "react"
import { IRestaurant } from "../../pages/Restaurants"
import { useUserContext } from "../../UserContext"

interface RestaurantProps {
  item: IRestaurant
  setModal: React.Dispatch<React.SetStateAction<string>>
  setCurrent: React.Dispatch<React.SetStateAction<string>>
}

const Restaurant = ({ item, setModal, setCurrent }: RestaurantProps) => {
  const { logged } = useUserContext()

  return (
    <div
      key={item.id}
      className="grid grid-cols-card border-2 overflow-hidden items-center border-zinc-100 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <img
        className="h-full w-full object-cover"
        src={"./restaurant.jpg"}
        alt=""
      />

      <div
        className={`flex flex-col p-4 h-full ${
          logged ? "justify-between gap-4" : "justify-center"
        }`}
      >
        <div className="flex flex-col">
          <h3 className="text-zinc-700 font-bold text-2xl capitalize">
            {item.name}
          </h3>
          <p className="text-zinc-700 font-semibold">{item.cuisineType}</p>
          <div className="flex gap-2 items-center">
            <div className="flex gap-2">
              <img className="w-4" src="./star.svg" alt="" />
              <p className="text-[0.85rem] text-yellow-star font-semibold ">
                {item.rating || 0}
              </p>
            </div>

            <span className="text-zinc-800">{"•"}</span>

            <p className="text-[0.85rem]">
              {item.hasDelivery ? "Temos delivery" : "Não fazemos entrega"}
            </p>
          </div>
          <p className="text-[0.85rem]">{item.openingHours}</p>
        </div>

        {logged && (
          <div className="flex gap-3 w-full ">
            <button
              onClick={() => {
                setModal("deletar")
                setCurrent(item.id)
              }}
              className="text-sm border-2 border-zinc-300 text-zinc-700 font-medium px-2 py-1 rounded w-full text-center hover:bg-zinc-100"
            >
              delete
            </button>
            <button
              onClick={() => {
                setModal("editar")
                setCurrent(item.id)
              }}
              className="text-sm border-2 border-zinc-300 text-zinc-700 font-medium px-2 py-1 rounded w-full text-center hover:bg-zinc-100"
            >
              editar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurant

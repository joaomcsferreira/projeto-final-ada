import axios from "axios"
import React from "react"

interface IRestaurantDelete {
  setModal: React.Dispatch<React.SetStateAction<string>>
  current: string
}

const VITE_API_URL = import.meta.env.VITE_API_URL

const RestaurantDelete = ({ setModal, current }: IRestaurantDelete) => {
  const handleClick = async () => {
    setModal("")

    const response = await axios.delete(
      `${VITE_API_URL}/restaurant/${current}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    )

    console.log(response.data)
  }

  return (
    <div className="w-[40vw] h-[40vh] fixed top-[30vh] left-[30vw] rounded-lg p-8 bg-white flex flex-col gap-6 items-center justify-around">
      <img className="w-[10rem]" src="./ifood.svg" alt="" />

      <div>
        <p>Você tem certeza que deseja excluir esse restaurant?</p>
      </div>

      <div className="flex w-full gap-3">
        <button
          onClick={() => setModal("")}
          className="px-8 py-3 border-2 border-zinc-200 text-sm font-bold rounded-lg w-full hover:bg-zinc-100"
        >
          Cancelar
        </button>

        <button
          onClick={handleClick}
          className="px-8 py-3 bg-red-main text-sm text-white font-bold rounded-lg w-full hover:bg-red-700"
        >
          Deletar
        </button>
      </div>
    </div>
  )
}

export default RestaurantDelete

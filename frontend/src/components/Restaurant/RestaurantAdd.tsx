import React from "react"
import useForm from "../../hooks/useForm"
import axios, { AxiosError } from "axios"
import { ErrorProps } from "../utlis/Error"
import { useErrorContext } from "../../ErrorContext"

export interface imageProps {
  preview: string
  raw: File
}

interface IRestaurantAdd {
  setModal: React.Dispatch<React.SetStateAction<string>>
}

const VITE_API_URL = import.meta.env.VITE_API_URL

const RestaurantAdd = ({ setModal }: IRestaurantAdd) => {
  const name = useForm()
  const address = useForm()
  const phone = useForm()
  const opening = useForm()
  const type = useForm()

  const [delivery, setDelivery] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<imageProps | null>()

  const { setError } = useErrorContext()

  async function handleSubmit() {
    if (image) {
      const form = new FormData()

      form.append("name", name.value)
      form.append("address", address.value)
      form.append("phone", phone.value)
      form.append("openingHours", opening.value)
      form.append("cuisineType", type.value)
      form.append("hasDelivery", `${delivery}`)
      form.append("image", image.raw)

      setModal("")

      try {
        await axios.post(`${VITE_API_URL}/restaurant`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        })
      } catch (error) {
        const err = (error as AxiosError).response?.data as ErrorProps

        setError(err.error)
      }
    }
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files

    if (files) {
      const raw = files[0]

      setImage({
        preview: URL.createObjectURL(raw),
        raw,
      })
    }
  }

  return (
    <div className="w-[50vw] h-[75vh] fixed top-[12vh] left-[25vw] rounded-lg p-8 bg-white flex flex-col gap-6 items-center justify-center">
      <img className="w-[10rem]" src="./ifood.svg" alt="" />

      <div className="flex flex-col gap-2 w-full">
        <input
          className="border border-zinc-200 p-3 rounded-md"
          type="text"
          placeholder="Restaurant name"
          {...name}
        />
        <input
          className="border border-zinc-200 p-3 rounded-md"
          type="text"
          placeholder="address"
          {...address}
        />
        <div className="flex gap-3">
          <input
            className="border border-zinc-200 p-3 rounded-md w-full"
            type="text"
            placeholder="+55 (00) 12345-6789"
            {...phone}
          />

          <input
            className="border border-zinc-200 p-3 rounded-md w-full"
            type="text"
            placeholder="opening hours"
            {...opening}
          />
          <div className="flex gap-2 items-center border border-zinc-200 p-4 rounded-md">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="hasDelivery"
            >
              <input
                checked={delivery}
                onChange={() => setDelivery((delivery) => !delivery)}
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-zinc-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-700 checked:bg-red-700 checked:before:bg-red-700 hover:before:opacity-10"
                id="hasDelivery"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>

            <label
              className="whitespace-nowrap text-[0.9rem] text-zinc-700 font-medium"
              htmlFor="hasDelivery"
            >
              Has Delivery
            </label>
          </div>
        </div>
        <input
          className="border border-zinc-200 p-3 rounded-md"
          type="text"
          placeholder="Enter with the type of resturant cuisine..."
          {...type}
        />
        <div className="border border-zinc-200 p-1 cursor-pointer rounded-md">
          <input
            onChange={handleFile}
            className="block w-full text-sm text-slate-500 cursor-pointer
          file:mr-4 file:py-2 file:px-4 file:rounded-md
          file:border-0 file:text-sm file:font-semibold
          file:bg-red-50 file:text-red-700
          hover:file:bg-red-100"
            type="file"
          />
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-red-main text-sm text-white font-bold rounded-lg w-full hover:bg-red-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default RestaurantAdd

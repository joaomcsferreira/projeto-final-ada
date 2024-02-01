import React from "react"
import { useUserContext } from "../UserContext"
import useForm from "../hooks/useForm"
import { useErrorContext } from "../ErrorContext"
import { AxiosError } from "axios"
import { ErrorProps } from "./utlis/Error"

interface ILogin {
  setModal: React.Dispatch<React.SetStateAction<string>>
}

const Login = ({ setModal }: ILogin) => {
  const email = useForm()
  const password = useForm()

  const { login } = useUserContext()
  const { setError } = useErrorContext()

  const handleClick = async () => {
    setModal("")

    try {
      await login(email.value, password.value)
    } catch (error) {
      const err = (error as AxiosError).response?.data as ErrorProps

      setError(err.error)
    }
  }

  return (
    <>
      <div className="w-[40vw] h-[60vh] fixed top-[20vh] left-[30vw] rounded-lg p-8 bg-white flex flex-col gap-6 items-center justify-center">
        <img className="w-[10rem]" src="./ifood.svg" alt="" />
        <div className="flex flex-col w-full gap-3">
          <input
            className="border border-zinc-200 rounded-lg px-4 py-2 w-full"
            type="text"
            placeholder="Email"
            {...email}
          />
          <input
            className="border border-zinc-200 rounded-lg px-4 py-2 w-full"
            type="password"
            placeholder="Password"
            {...password}
          />
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-red-main text-sm text-white font-bold rounded-lg hover:bg-red-700"
          >
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default Login

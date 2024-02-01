import axios from "axios"
import React from "react"

interface UserContextValue {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logOut: () => void
  user: User | null
  logged: boolean
}

export interface User {
  name: string
  email: string
}

const VITE_API_URL = import.meta.env.VITE_API_URL

const UserContext = React.createContext({} as UserContextValue)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [logged, setLogged] = React.useState(false)

  const getUser = async (token: string) => {
    const response = await axios.get(`${VITE_API_URL}/login`, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })

    return response
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      `${VITE_API_URL}/token`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    )

    const token = response.data.token

    localStorage.setItem("token", token)

    const userResponse = await getUser(token)

    setUser(userResponse.data)
    setLogged(true)
  }

  const signup = async (email: string, password: string) => {
    const response = await axios.post(
      `${VITE_API_URL}/user`,
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    )

    if (response) {
      await login(email, password)
    }
  }

  const logOut = () => {
    setUser(null)
    setLogged(false)
    localStorage.removeItem("token")
  }

  const autoLogin = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const user = await getUser(token)

        setUser(user.data)
        setLogged(true)
      } catch (error) {
        localStorage.removeItem("token")
      }
    }
  }

  React.useEffect(() => {
    autoLogin()
  }, [localStorage.getItem("token")])

  return (
    <UserContext.Provider value={{ login, signup, logOut, user, logged }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => React.useContext(UserContext)

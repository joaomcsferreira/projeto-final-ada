import React from "react"

interface ErrorContextValue {
  setError: (message: string) => void
  error: string
}

const ErrorContext = React.createContext({} as ErrorContextValue)

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = React.useState("")

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorContext = () => React.useContext(ErrorContext)

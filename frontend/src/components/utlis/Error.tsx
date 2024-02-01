import React from "react"
import { useErrorContext } from "../../ErrorContext"

export interface ErrorProps {
  error: string
}

const Error = () => {
  const [active, setActive] = React.useState(false)

  const { error, setError } = useErrorContext()

  React.useEffect(() => {
    if (error) {
      setActive((active) => !active)

      const timeoutId = setTimeout(() => {
        setActive(false)
        setError("")
      }, 5000)

      return () => clearTimeout(timeoutId)
    }
  }, [error])

  return (
    <>
      {active && (
        <div className="z-90 fixed bottom-0 left-0 ml-7 mb-7 bg-red-500 text-white font-medium px-6 py-4 rounded">
          {error}
        </div>
      )}
    </>
  )
}

export default Error

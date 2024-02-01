import React from "react"

const useForm = () => {
  const [value, setValue] = React.useState("")

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value)
  }

  const setInitialValue = (value: string | undefined) => {
    if (value) setValue(value)
  }

  return {
    value,
    onChange,
    setInitialValue,
  }
}

export default useForm

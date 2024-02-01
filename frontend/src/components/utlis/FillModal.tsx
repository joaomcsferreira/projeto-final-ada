import React from "react"

interface IFillModal {
  setModal: React.Dispatch<React.SetStateAction<string>>
}

const FillModal = ({ setModal }: IFillModal) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div
      onClick={() => setModal("")}
      className="fixed top-0 left-0 h-screen w-full bg-black/50"
    />
  )
}

export default FillModal

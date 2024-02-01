import { useUserContext } from "../UserContext"

interface IHeader {
  setModal: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ setModal }: IHeader) => {
  const { user, logged, logOut } = useUserContext()

  const handleClick = () => {
    logOut()
  }

  return (
    <div className="h-[20vh] w-full fixed top-0 left-0 text-text-main bg-background-second flex items-center justify-between px-[5rem]">
      <div className="flex items-center gap-10">
        <img className="h-14" src="./ifood.svg" alt="" />
        <nav className="flex items-center gap-3">
          <a className="text-sm font-medium" href="#restaurants">
            Restaurantes
          </a>
          <a className="text-sm font-medium" href="">
            Usuarios
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        {logged && user ? (
          <div className="flex gap-4 items-center">
            <p>
              Logado com: <span className="font-medium">{user.email}</span>
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-1 border border-red-main text-red-main rounded"
            >
              Sair
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setModal("signup")}
              className="text-red-main text-sm font-bold px-8 py-3 rounded-lg hover:bg-zinc-200"
            >
              Criar conta
            </button>
            <button
              onClick={() => setModal("login")}
              className="px-8 py-3 bg-red-main text-sm text-white font-bold rounded-lg hover:bg-red-700"
            >
              Entrar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header

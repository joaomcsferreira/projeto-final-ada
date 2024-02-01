import React from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import Restaurants from "./pages/Restaurants"
import Login from "./components/Login"
import FillModal from "./components/utlis/FillModal"
import Signup from "./components/Signup"
import RestaurantAdd from "./components/Restaurant/RestaurantAdd"
import RestaurantDelete from "./components/Restaurant/RestauranteDelete"
import RestaurantEdit from "./components/Restaurant/RestaurantEdit"
import { UserProvider } from "./UserContext"
import { ErrorProvider } from "./ErrorContext"
import Error from "./components/utlis/Error"

function App() {
  const [modal, setModal] = React.useState("")
  const [current, setCurrent] = React.useState("")

  return (
    <ErrorProvider>
      <UserProvider>
        <div className="relative box-border">
          <Error />
          <Header setModal={setModal} />
          <Home />
          <Restaurants setModal={setModal} setCurrent={setCurrent} />

          {modal === "login" && (
            <>
              <FillModal setModal={setModal} />
              <Login setModal={setModal} />
            </>
          )}

          {modal === "signup" && (
            <>
              <FillModal setModal={setModal} />
              <Signup setModal={setModal} />
            </>
          )}

          {modal === "adicionar" && (
            <>
              <FillModal setModal={setModal} />
              <RestaurantAdd setModal={setModal} />
            </>
          )}

          {modal === "editar" && (
            <>
              <FillModal setModal={setModal} />
              <RestaurantEdit setModal={setModal} current={current} />
            </>
          )}

          {modal === "deletar" && (
            <>
              <FillModal setModal={setModal} />
              <RestaurantDelete setModal={setModal} current={current} />
            </>
          )}
        </div>
      </UserProvider>
    </ErrorProvider>
  )
}

export default App

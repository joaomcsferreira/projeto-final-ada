import ListRestaurantTypes from "./Restaurant/ListRestaurantTypes"

const Home = () => {
  return (
    <div className="mt-[20vh] h-[80vh] text-text-main bg-foods-pattern bg-no-repeat bg-center bg-cover flex flex-col gap-4 items-center justify-center">
      <h1 className="text-5xl font-semibold">
        Descubra sabores exclusivos no Ifood
      </h1>
      <p className="">
        Peça Agora e Deleite-se com a Magia da Nossa Cozinha Direto em Sua Casa!
      </p>

      <ListRestaurantTypes />
    </div>
  )
}

export default Home

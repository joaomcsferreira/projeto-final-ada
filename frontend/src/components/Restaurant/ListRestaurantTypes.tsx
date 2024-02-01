const types = [
  { name: "Hambúrguer" },
  { name: "Sushi" },
  { name: "Massas" },
  { name: "Comida Mexicana" },
  { name: "Churrasco" },
  { name: "Comida Indiana" },
  { name: "Comida Tailandesa" },
  { name: "Comida Vegetariana" },
  { name: "Sobremesas" },
]

const ListRestaurantTypes = () => {
  return (
    <div className="flex gap-3 mt-10 w-[50%] flex-wrap justify-center">
      {types.map((item, index) => (
        <div
          className="border border-zinc-200 rounded-[1.2rem] p-[0.5rem] flex place-items-center text-center hover:bg-zinc-100"
          key={index}
        >
          <p className="text-sm text-zinc-500 cursor-pointer">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ListRestaurantTypes

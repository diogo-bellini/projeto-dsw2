import RestaurantOption from "./RestaurantOption";

export default function RestaurantCarousel({ restaurants, name }) {
  return (
    <div className="flex flex-col mb-15">
      <h2 className="p-2 pb-4 pl-6 font-bold">{name}</h2>

      <div className="flex overflow-x-auto hide-scrollbar space-x-4 px-6">
        {restaurants.map((rest) => (
          <RestaurantOption
            key={rest.id}
            id={rest.id}
            name={rest.namepiece}
            rating={rest.rating}
            category={rest.category}
            time={rest.time}
            logo={rest.logo}
          />
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom"

export default function RestaurantOption({ id, name, rating, category, time, logo }){
    return (
    <Link
      to={`/restaurant/${id}`}
      className="flex flex-col shrink-0 bg-[#EEEEEE] justify-center items-center p-4 rounded-xl md:flex-row md:space-x-5"
    >
      <img src={logo} alt={name} className="w-16 h-16 rounded-full object-cover" />

      <div>
        <h2 className="text-sm">{name}</h2>

        <h2 className="hidden md:block text-sm">
          <span className="text-[#C9A227]">{rating} ★</span> • {category}
        </h2>

        <h2 className="hidden md:block text-sm">{time}</h2>
      </div>
    </Link>
  );
}
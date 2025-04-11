import { Link } from 'react-router-dom';

function CarCard({ car, toggleWishlist, inWishlist }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300">
      <Link to={`/car/${car.id}`}>
        <img
          src={require(`../assets/cars/${car.image}`)}
          alt={car.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />

        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{car.name}</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">{car.brand}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full dark:bg-green-700 dark:text-white">
            {car.fuel}
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-700 dark:text-white">
            Seats: {car.seating}
          </span>
        </div>
        <p className="mt-3 text-indigo-600 dark:text-indigo-300 font-bold text-lg">
          ₹{(car.price / 100000).toFixed(1)} Lakh
        </p>
      </Link>
      <button
        className={`mt-3 px-4 py-1 rounded-md w-full text-sm font-medium ${inWishlist ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        onClick={() => toggleWishlist(car)}
      >
        {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default CarCard;

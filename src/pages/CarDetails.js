import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`https://67f8a7032466325443ed4834.mockapi.io/cars/${id}`)
      .then(res => res.json())
      .then(data => setCar(data));
  }, [id]);

  if (!car) return <p className="p-6 text-center">Loading car details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={require(`../assets/cars/${car.image}`)}
        alt={car.name}
        className="w-full h-[450px] sm:h-[500px] object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{car.name}</h1>

      <p className="text-gray-800 dark:text-white mb-2">Brand: {car.brand}</p>
      <p className="text-gray-800 dark:text-white mb-2">Fuel: {car.fuel}</p>
      <p className="text-gray-800 dark:text-white mb-4">Seating: {car.seating}</p>


      <p className="text-indigo-600 dark:text-indigo-300 text-2xl font-semibold mt-3 mb-6">
        ₹{(car.price / 100000).toFixed(2)} Lakh
      </p>


      <button
        onClick={() =>
          alert(`Thank you for your interest in ${car.name}!\nOur team will contact you shortly.`)
        }
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300"
      >
        📞 Book Now / Enquire
      </button>
    </div>
  );
}

export default CarDetails;

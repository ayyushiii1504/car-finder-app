import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FilterBar from './components/FilterBar';
import CarCard from './components/CarCard';
import Pagination from './components/Pagination';
import CarDetails from './pages/CarDetails'; // You’ll create this file

function App() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ brand: '', fuel: '', search: '', seating: '', sort: '' });
  const [wishlist, setWishlist] = useState([]);
  const [page, setPage] = useState(1);
  const [dark, setDark] = useState(false);
  const carsPerPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        console.log('Fetching cars from API...');
        const response = await fetch('https://67f8a7032466325443ed4834.mockapi.io/cars');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received cars data from API:', data);
        processCarData(data);
      } catch (apiError) {
        console.warn('API fetch failed, using local data:', apiError);
        try {
          const localData = await import('./data/cars.json');
          console.log('Using local cars data:', localData);
          processCarData(localData.default);
        } catch (localError) {
          console.error('Failed to load local data:', localError);
          setCars([]);
        }
      }
    };

    const processCarData = (data) => {
      let filtered = data.filter((car) => {
          return (
            (filters.brand ? car.brand.toLowerCase().includes(filters.brand.toLowerCase()) : true) &&
            (filters.fuel ? car.fuel === filters.fuel : true) &&
            (filters.seating ? car.seating === parseInt(filters.seating) : true) &&
            (filters.search ? car.name.toLowerCase().includes(filters.search.toLowerCase()) : true)
          );
        });

        if (filters.sort === 'low') {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sort === 'high') {
          filtered = filtered.sort((a, b) => b.price - a.price);
        }

      setCars(filtered);
      setPage(1);
    };

    fetchCars();
  }, [filters]);

  const toggleWishlist = (car) => {
    const exists = wishlist.find((item) => item.id === car.id);
    let updated;
    if (exists) updated = wishlist.filter((item) => item.id !== car.id);
    else updated = [...wishlist, car];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const paginatedCars = cars.slice((page - 1) * carsPerPage, page * carsPerPage);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <Router>
      <div className={dark ? 'bg-zinc-900 text-white min-h-screen' : 'bg-rose-50 min-h-screen'}>
        <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🚗 Car Finder</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-800 dark:text-gray-200">{dark ? '🌙 Dark' : '🌞 Light'}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={dark} onChange={() => setDark(!dark)} />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 dark:bg-gray-600 rounded-full peer dark:peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">🔎 Search Cars</h2>
                  <FilterBar filters={filters} setFilters={setFilters} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {paginatedCars.map((car) => (
                    <CarCard
                      key={car.id}
                      car={car}
                      toggleWishlist={toggleWishlist}
                      inWishlist={wishlist.some((c) => c.id === car.id)}
                    />
                  ))}
                </div>

                <Pagination
                  total={cars.length}
                  carsPerPage={carsPerPage}
                  currentPage={page}
                  setPage={setPage}
                />
              </main>
            }
          />

          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;

function FilterBar({ filters, setFilters }) {
  const inputClass = "p-2 border rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
      <input className={inputClass} placeholder="Search" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
      <input className={inputClass} placeholder="Brand" value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })} />
      <select className={inputClass} value={filters.fuel} onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}>
        <option value="">Fuel Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        
      </select>
      <select className={inputClass} value={filters.seating} onChange={(e) => setFilters({ ...filters, seating: e.target.value })}>
        <option value="">Seating</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="7">7</option>
      </select>
      <select className={inputClass} value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
        <option value="">Sort by Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
}

export default FilterBar;
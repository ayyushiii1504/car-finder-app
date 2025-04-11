function Pagination({ total, carsPerPage, currentPage, setPage }) {
  const totalPages = Math.ceil(total / carsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`mx-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
            currentPage === i + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;

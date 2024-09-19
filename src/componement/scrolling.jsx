import { ArrowBigLeft, ArrowBigRight, RefreshCcw } from "lucide-react";
import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onRefresh, setTotalPages, totalPages }) => {
  // Calculate total pages based on total items and items per page
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle previous page click
  const handlePrevious = () => {
    onPageChange(currentPage - 1);
    setTotalPages(calculatedTotalPages + 1); // This seems like it might not be needed
  };

  // Handle next page click
  const handleNext = () => {
    onPageChange(currentPage + 1);
    setTotalPages(calculatedTotalPages - 1); // This seems like it might not be needed
  };

  return (
    <div className="pagination flex flex-wrap justify-center gap-2">
      <button
        className="rounded-md flex bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        id="trailer"
        onClick={handlePrevious}
        disabled={currentPage === 1} // Disable if on the first page
      >
        <ArrowBigLeft />
        Previous
      </button>
      <button
        className="rounded-md flex bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        id="trailer"
        onClick={onRefresh} // Call the onRefresh function when clicked
      >
        <RefreshCcw />
        Refresh
      </button>
      <button
        className="rounded-md flex bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        id="trailer"
        onClick={handleNext}
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        Next <ArrowBigRight />
      </button>
    </div>
  );
};

export default Pagination;

import React, { useState, useEffect } from "react";
import ".././css/browser.css";
import { useNavigate } from "react-router-dom";
import Hero from "./hero";
import Pagination from "./scrolling";
import Filtrage from "./filtrage";

const Browser = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('rate');
  const itemsPerPage = 9;

  const navigate = useNavigate();

  const fetchMovies = async (page, filterType) => {
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US&page=${page}&per_page=${itemsPerPage}`;
      
      if (filterType === 'rate') {
        url += `&sort_by=vote_average.desc`;
      } else if (filterType === 'popularity') {
        url += `&sort_by=popularity.desc`;
      } else if (filterType === 'date') {
        url += `&sort_by=release_date.desc`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setTotalItems(data.total_results);
      setTotalPages(Math.ceil(data.total_results / itemsPerPage));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchMovies(page, filter);
  };

  const handleRefresh = () => {
    setTotalItems(0);
    setMovies([]);
    fetchMovies(1, filter);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    fetchMovies(1 , filterType);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchMovies(currentPage, filter);
  }, [currentPage, filter]);

  return (
    <>
      <Hero text="Discover Your Next Favorite Movie" />
      <div className="myhome bg-gray-500">
        <div className="container justify-center">
          <Filtrage onFilterChange={handleFilterChange} />
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onRefresh={handleRefresh}
            setTotalPages={setTotalPages}
            totalPages={totalPages}
          />
          <h2 className="shadow-lg p-1 mb-5 rounded">
            Current Page: {currentPage}
          </h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="book movie-card" key={movie.id}>
                <div className="cordonne">
                  <h2 className="shadow-lg p-1 mb-5 rounded">{movie.original_title}</h2>
                  <p className="text-gray-400">
                    <span>Release Date: </span> {movie.release_date}
                  </p>
                  <p className="text-gray-400">
                    <span>Rate: </span> {movie.vote_average}/10{" "}
                    <box-icon
                      name={movie.vote_average <= 5.7 ? "star-half" : "star"}
                      color="goldenrod"
                      type="solid"
                    ></box-icon>
                  </p>
                  <p className="overview text-gray-400">
                    <span>Tagline: </span>
                    {movie.tagline}
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="button"
                  >
                    <span>PLAY NOW</span>
                  </button>
                </div>
                <div className="cover">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "https://via.placeholder.com/300x450.png?text=No+Image+Available"
                    }
                    className="card-img"
                    alt={movie.original_title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Browser;

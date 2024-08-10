import React, { useState, useEffect } from "react";
import ".././css/browser.css";
import { Link } from "react-router-dom";

const Browser = () => {
  const [movies, setMovies] = useState([]);
  const MOVIE_COUNT = 100; // Number of movies to fetch

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 900); // Change the range as needed
  };

  useEffect(() => {
    // Function to fetch a single movie
    const fetchMovie = (movieNumber) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieNumber}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => {
          // Make sure the movie is valid and has a title
          if (data && data.original_title) {
            setMovies((prevMovies) => [...prevMovies, data]);
          }
        })
        .catch((error) => console.error("Error fetching movie:", error));
    };

    // Loop through and fetch 100 movies
    for (let i = 0; i < MOVIE_COUNT; i++) {
      const randomMovieNumber = generateRandomNumber();
      fetchMovie(randomMovieNumber);
    }
  }, []);

  return (
    <div className="cover">
      <div className="container">
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
                <Link to="#">
                  <img
                    className="rounded-t-lg"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450.png?text=No+Image+Available'
                    }
                    style={{ height: "500px" }}
                    alt={movie.original_title}
                  />
                </Link>
                <div className="p-5">
                  <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {movie.original_title}
                    </h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <b>Release date:</b> {movie.release_date}
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>  );
};

export default Browser;

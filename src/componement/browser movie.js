import React, { useState, useEffect } from "react";
import ".././css/browser.css";
import { useNavigate } from "react-router-dom";
import Hero from "./hero";

const Browser = () => {
  const [movies, setMovies] = useState([]);
  const [fetchedIds, setFetchedIds] = useState(new Set()); // Set to track fetched movie IDs
  const MOVIE_COUNT = 100; // Number of movies to fetch

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 900); // Change the range as needed
  };

  useEffect(() => {
    // Function to fetch a single movie
    const fetchMovie = async (movieNumber) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieNumber}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`
        );
        const movieData = await response.json();

        // Make sure the movie is valid, has a title, and ID is unique
        if (movieData && movieData.original_title && !fetchedIds.has(movieData.id)) {
          setFetchedIds((prevIds) => new Set(prevIds.add(movieData.id))); // Add ID to Set
          setMovies((prevMovies) => [...prevMovies, movieData]); // Add movie to state
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    // Loop through and fetch movies until we have the desired count
    const fetchMovies = () => {
      const fetchPromises = [];
      const currentFetchedIds = new Set(fetchedIds);

      while (fetchPromises.length < MOVIE_COUNT) {
        const randomMovieNumber = generateRandomNumber();
        if (!currentFetchedIds.has(randomMovieNumber)) {
          currentFetchedIds.add(randomMovieNumber);
          fetchPromises.push(fetchMovie(randomMovieNumber));
        }
      }

      Promise.all(fetchPromises).then(() => console.log("Finished fetching movies"));
    };

    fetchMovies();
  }, [fetchedIds]);

  let navigate = useNavigate();

  const handleNavigate = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <Hero text="Discover Your Next Favorite Movie" />
      <div className="myhome bg-gray-500">
        <div className="container">
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
                    onClick={() => handleNavigate(movie.id)}
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

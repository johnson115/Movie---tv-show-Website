import React, { useState, useEffect } from "react";
import ".././css/browser.css";


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
    <>
    <div className="cover bg-gray-500 ">
      
      <div className="container">
        <div className="movie-grid">
          {movies.map((movie) => (
            
             <div className="book movie-card" key={movie.id}>
              <div className="cordonne">
                <h2>{movie.original_title}</h2>
                <p><span>Realise Date : </span> {movie.release_date} </p>
                <p><span>Rate : </span> {movie.vote_average}/10  <box-icon name={movie.vote_average <= 5.700 ? "star-half" : "star"} color="goldenrod" type='solid' ></box-icon></p>
                <p className="overview" > <span>Tagline : </span>
                  {movie.tagline}</p>
                </div>
  
  <div className="cover">
    <img src= {movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450.png?text=No+Image+Available'} className="card-img" alt={movie.original_title} />
  </div>
</div>
            
          ))}
        </div>
      </div>
      
    </div> 
    </> );
};

export default Browser;
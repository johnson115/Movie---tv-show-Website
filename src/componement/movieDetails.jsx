import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Calendar, Clock } from "lucide-react";
import { useSpring, animated } from 'react-spring';
import React from 'react';
import Hero from './hero';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
        const movieData = await movieResponse.json();
        
        // Fetch movie credits
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
        const creditsData = await creditsResponse.json();

        // Set movie details
        setMovieDetails(movieData);

        // Get top 5 cast members
        const topCast = creditsData.cast.slice(0, 5);
        setCast(topCast);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  const animationProps = useSpring({
    opacity: 1,
    width: "100%",
    from: { opacity: 0, width: "30%" },
    delay: 200,
  });

  function renderMovie() {
    if (isLoading) {
      return (
        <animated.div style={animationProps} className="flex justify-center items-center min-h-screen">
          <div>
            <Hero
              text="Wait a second ..."
              className="spinner-border text-dark"
              role="status"
            />
            <div className="card" aria-hidden="true">
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6">Loading Content</span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <a
                  href="#"
                  className="btn btn-primary disabled placeholder col-6"
                ></a>
              </div>
            </div>
          </div>
        </animated.div>
      );
    }

    if (movieDetails) {
      let poster_path = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
      if (!movieDetails.poster_path) {
        poster_path = "https://via.placeholder.com/300x450.png?text=No+Image+Available";
      }

      const backDrop = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`;
      const newPoster_path = `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`;
      const runtimeInMinutes = movieDetails.runtime;

      function convertMinutesToHoursMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return { hours, minutes: mins };
      }

      const { hours, minutes } = convertMinutesToHoursMinutes(runtimeInMinutes);
      const runtimeString = `${hours}h ${minutes}m`;

      return (
        <>
          <Hero text={movieDetails.original_title} backDrop={backDrop} />
          <div className="min-h-screen w-full bg-gray-100 py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3">
                  <img
                    src={newPoster_path}
                    alt={`${movieDetails.original_title} Movie Poster`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Now Playing</div>
                  <h1 className="mt-1 text-2xl md:text-4xl font-bold text-gray-900">{movieDetails.original_title}</h1>
                  <div className="mt-2 flex items-center flex-wrap">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-gray-600">{movieDetails.vote_average}/10</span>
                    <span className="mx-2 text-gray-500">|</span>
                    {movieDetails.genres.map((genre, index) => (
                      <span key={index} className="text-gray-600">{genre.name}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-gray-600">Release Date: {movieDetails.release_date}</span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className='text-gray-600'>Runtime: {runtimeString}</span>
                  </div>
                  <p className="mt-4 text-gray-500">
                    {movieDetails.overview}
                  </p>
                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900">Cast</h2>
                    <div className="mt-3 flex space-x-4 flex-wrap">
                      {cast.map((actor, index) => (
                        <div key={index} className="flex-shrink-0 text-center">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                            alt={actor.name}
                            className="h-24 w-24 rounded-full object-cover"
                          />
                          <p className="mt-2 text-sm font-medium text-gray-900">{actor.name}</p>
                          <p className="text-sm text-gray-500">{actor.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return renderMovie();
};

export default MovieDetails;

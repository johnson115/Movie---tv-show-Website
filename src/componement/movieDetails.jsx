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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

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

        // Fetch movie videos (trailers, clips, etc.)
        const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
        const videosData = await videosResponse.json();

        // Find the "Official Trailer" or use the first video key
        const officialTrailer = videosData.results.find(video => video.name === "Official Trailer");
        const trailerKey = officialTrailer ? officialTrailer.key : videosData.results[0]?.key;

        setVideoKey(trailerKey || ""); // Fallback to empty string if no video key found

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

  const YouTubeModal = ({ isOpen, onClose, videoKey }) => {
    if (!isOpen || !videoKey) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-transparent p-2 pt-5 shadow-lg rounded-lg w-full max-w-2xl relative">
          <button
            onClick={onClose}
            className="absolute bg-red-700 top-0 right-1 flex items-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-500 transition duration-200"
          >
            <span className='mr-2'>Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative pb-[56.25%]">
            <iframe autoplay muted
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen

              title="YouTube Video"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  function renderMovie() {
    if (isLoading) {
      return (
        <animated.div style={animationProps} className="flex bg-red-300 justify-center items-center min-h-screen">
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
                <button
                  className="btn btn-primary disabled placeholder col-6"
                ></button>
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
          <div className="min-h-screen w-full bg-red-300 py-8 px-4 md:px-8">
  <div className="max-w-6xl mx-auto bg-red-700 rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col md:flex-row">
      <div className="w-full">
        <img
          src={newPoster_path}
          alt={`${movieDetails.original_title} Movie Poster`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Now Playing</div>
        <h1 className="mt-1 text-2xl md:text-4xl font-bold text-white">{movieDetails.original_title}</h1>
        <span className='text-gray-200 text-md'> Movie</span>
       
       


        <div className="mt-2 flex items-center flex-wrap">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="ml-2 text-gray-200">{movieDetails.vote_average}/10</span>
          <span className="mx-2 text-gray-200">|</span>
          {movieDetails.genres.map((genre, index) => (
            <span key={index} className="text-gray-200">{genre.name}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center text-gray-200">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-gray-200">Release Date: {movieDetails.release_date}</span>
        </div>
        <div className="mt-2 flex items-center text-gray-200">
          <Clock className="h-5 w-5 mr-2" />
          <span className='text-gray-200'>Runtime: {runtimeString}</span>
        </div>
        <p className="mt-4 text-gray-300">
          {movieDetails.overview}
        </p>
        <div className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center  justify-center shadow-lg font-semibold rounded-lg px-6 py-3 focus:ring-4 focus:outline-none"
            type="button" id='trailer'
          >
            <span className="text-lg align-middle">
              <i className='bx bxs-videos mr-2'></i>Watch Trailer
            </span>
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white">Cast</h2>
          <div className="mt-3 flex space-x-4 flex-wrap">
            {cast.map((actor, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150?text=No+Image'}
                  alt={actor.name ? `${actor.name}'s profile` : 'No profile available'}
                />
                <span className="mt-2 text-gray-200 text-center">{actor.name}</span>
                <span className="text-gray-300 text-sm">{actor.character}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


          {/* YouTube Modal */}
          <YouTubeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            videoKey={videoKey}
          />
        </>
      );
    }
  }

  return renderMovie();
};

export default MovieDetails;

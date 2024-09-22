import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, Calendar, Clock, Tv, MonitorPlay } from "lucide-react";

import React from 'react';
import Hero from './hero';
import Searchanimated from './searchanimation';

const TvShowDetails = () => {
  const { id } = useParams();
  const [TvShowDetails, setTvShowDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
        const movieData = await movieResponse.json();
        
        // Fetch movie credits
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
        const creditsData = await creditsResponse.json();

        // Set movie details
        setTvShowDetails(movieData);

        // Get top 5 cast members
        const topCast = creditsData.cast.slice(0, 5);
        setCast(topCast);

        // Fetch movie videos (trailers, clips, etc.)
        const videosResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`);
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

  // Toggle function to open/close dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  function renderMovie() {
    if (isLoading) {
      return (
        <Searchanimated/>
      );
    }

    if (TvShowDetails) {
      
     

      const backDrop = `https://image.tmdb.org/t/p/original/${TvShowDetails.backdrop_path}`;
      const newPoster_path = `https://image.tmdb.org/t/p/original/${TvShowDetails.poster_path}`;
      const runtimeInMinutes = TvShowDetails.episode_run_time[0];

      function convertMinutesToHoursMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return { hours, minutes: mins };
      }

      const { hours, minutes } = convertMinutesToHoursMinutes(runtimeInMinutes);
      const runtimeString = `${hours}h ${minutes}m`;
      
      return (
        <>
          <Hero text={TvShowDetails.original_name} backDrop={backDrop} />
          <div className="min-h-screen w-full  py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-red-700 rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full">
                  <img
                    src={newPoster_path}
                    alt={`${TvShowDetails.original_name} Movie Poster`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Now Playing</div>
                  <div className="mt-2 flex items-center flex-wrap">
                  <h1 className="mt-1 flex-1 text-2xl md:text-4xl font-bold text-white">{TvShowDetails.original_name}</h1>
                  
                  <button
                    onClick={toggleDropdown}
                    className="text-white ml-auto  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    id='trailer'
                    
                  >
                    Seasons
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

 

                  </div>
                  {/* Dropdown menu */}
                  <div
                    style={{ display: isDropdownOpen ? 'block' : 'none' }} // Corrected style property
                    className="z-50 absolute right-32 bg-red-300 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                        {TvShowDetails.seasons.map((seasons , index) =>(
                             <li key={index}>
                    
                      {seasons.name}
                    
                  </li>)
                    )}
                      
                      
                      
                    </ul>
                  </div>
                  <span className='text-gray-200 text-md'> Tv Show </span>

                 

                 
                  <div className="mt-2 flex items-center flex-wrap">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-gray-200">{TvShowDetails.vote_average}/10</span>
                    <span className="mx-2 text-gray-200">|</span>
                    {TvShowDetails.genres.map((genre, index) => (
                      <span key={index} className="text-gray-200">{genre.name}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-gray-200">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-gray-200">Release Date: {TvShowDetails.first_air_date}</span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-200">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className='text-gray-200'>episode Runtime average : {runtimeString}</span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-200">
                    <Tv className="h-5 w-5 mr-2" />
                    <span className='text-gray-200'> Seasons Number : {TvShowDetails.number_of_seasons} </span>
                    <MonitorPlay className="h-5 w-5 ml-2 " />
                    <span className='text-gray-200 ml-2'> Episodes Number : {TvShowDetails.number_of_episodes} </span>
                  </div>
                  <p className="mt-4 text-gray-300">
                    {TvShowDetails.overview}
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
                    {cast.length === 0 ? (
                      <span style={{textAlign : "center" }} className="text-gray-200 ">Unfortunately , No Actors Provided</span>
                    ) : (
                      cast.map((actor, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            className="w-24 h-24 object-cover rounded-full"
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150?text=No+Image'}
                            alt={actor.name ? `${actor.name}'s profile` : 'No profile available'}
                          />
                          <span className="mt-2 text-gray-200 text-center">{actor.name}</span>
                          <span className="text-gray-300 text-sm">{actor.character}</span>
                        </div>
                      ))
                    )}
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

export default TvShowDetails;

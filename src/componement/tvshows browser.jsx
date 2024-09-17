import React, { useState, useEffect } from "react";
import ".././css/browser.css";
import { useNavigate } from "react-router-dom";
import Hero from "./hero";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [fetchedIds, setFetchedIds] = useState(new Set());
  const TV_SHOW_COUNT = 100;
  const RATE_LIMIT_DELAY = 1000; // Delay in milliseconds (e.g., 1000ms = 1s)

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (130001 - 67000 + 1)) + 67000;
  };

  useEffect(() => {
    const fetchTvShow = async (tvShowNumber) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowNumber}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`
        );
        const tvShowData = await response.json();

        if (tvShowData && tvShowData.poster_path && !fetchedIds.has(tvShowData.id)) {
          setFetchedIds((prevIds) => new Set(prevIds.add(tvShowData.id)));
          setTvShows((prevTvShows) => [...prevTvShows, tvShowData]);
        }
      } catch (error) {
        console.error("Error fetching TV show:", error);
      }
    };

    const fetchTvShows = async () => {
      const currentFetchedIds = new Set(fetchedIds);

      for (let i = 0; i < TV_SHOW_COUNT; i++) {
        const randomTvShowNumber = generateRandomNumber();
        if (!currentFetchedIds.has(randomTvShowNumber)) {
          currentFetchedIds.add(randomTvShowNumber);
          await fetchTvShow(randomTvShowNumber);
          await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY)); // Wait before making the next request
        }
      }

      // Sort TV shows by rating (highest to lowest) after all are fetched
      const sortedTvShows = [...tvShows].sort((a, b) => b.vote_average - a.vote_average);
      setTvShows(sortedTvShows);

      console.log("Finished fetching TV shows");
    };

    fetchTvShows();
  }, [fetchedIds, tvShows]);

  let navigate = useNavigate();

  const handleNavigate = (tvShowId) => {
    navigate(`/tvshow/${tvShowId}`);
  };

  return (
    <>
      <Hero text="Discover Your Next Favorite TV Show" />
      <div className="myhome bg-gray-500">
        <div className="container">
          <div className="movie-grid">
            {tvShows.map((tvShow) => (
              <div className="book movie-card" key={tvShow.id}>
                <div className="cordonne">
                  <h2 className="shadow-lg p-1 mb-5 rounded">{tvShow.original_name}</h2>
                  <p className="text-gray-400">
                    <span>Release Date: </span> {tvShow.first_air_date}
                  </p>
                  <p className="text-gray-400">
                    <span>Rate: </span> {tvShow.vote_average !== 0 ? `${tvShow.vote_average}/10` : "Not Rated"}{" "}
                    <box-icon
                      name={tvShow.vote_average <= 5.7 ? "star-half" : "star"}
                      color="goldenrod"
                      type="solid"
                    ></box-icon>
                  </p>
                  <p className="text-gray-400">
                    <span> Seasons: </span> {tvShow.number_of_seasons}
                  </p>

                  <button
                    onClick={() => handleNavigate(tvShow.id)}
                    className="button"
                  >
                    <span>PLAY NOW</span>
                  </button>
                </div>

                <div className="cover">
                  <img
                    src={
                      tvShow.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                        : "https://via.placeholder.com/300x450.png?text=No+Image+Available"
                    }
                    className="card-img"
                    alt={tvShow.original_name}
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

export default TvShows;

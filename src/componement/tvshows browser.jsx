import React, { useState, useEffect } from "react";
import ".././css/browser.css";
import { useNavigate } from "react-router-dom";
import Hero from "./hero";
import Pagination from "./scrolling";
import Filtrage from "./filtrage";
import Searchanimated from "./searchanimation";

// Updated genre IDs for TV shows
const genreMap = {
  action: 10759,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  kids: 10762,
  mystery: 9648,
  news: 10763,
  reality: 10764,
  sciFi: 10765, // Combined sci-fi and fantasy
  fantasy: 10765, // Sci-Fi & Fantasy
  soap: 10766,
  talk: 10767,
  warPolitics: 10768,
  western: 37,
  horror: 27,
  romance: 10749,
  thriller: 53,
};


const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("rate");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  const navigate = useNavigate();

  const fetchTvShows = async (page, filterType) => {
    setLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US&page=${page}&per_page=${itemsPerPage}`;

      if (filterType === "rate") {
        url += `&sort_by=vote_average.desc`;
      } else if (filterType === "popularity") {
        url += `&sort_by=popularity.desc`;
      } else if (genreMap[filterType]) {
        const genreId = genreMap[filterType];
        url += `&with_genres=${genreId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setTvShows(data.results);
      setTotalItems(data.total_results);
      setTotalPages(Math.ceil(data.total_results / itemsPerPage));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchTvShows(page, filter);
  };

  const handleRefresh = () => {
    setTotalItems(0);
    setTvShows([]);
    fetchTvShows(1, filter);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    fetchTvShows(1, filterType);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTvShows(currentPage, filter);
  }, [currentPage, filter]);

  return (
    <>
      <Hero text="Discover Your Next Favorite TV Show" />
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
              <h2 className="shadow-lg text-white p-1 mb-5 rounded">
            Current Page: <span className="text-gray-300 ml-1"> {currentPage}</span>
          </h2>
          {loading ? (
            <Searchanimated />
          ):
          (<div className="movie-grid">
            {tvShows.map((tvShow) => (
              <div className="book movie-card" key={tvShow.id}>
                <div className="cordonne">
                  <h2 className="shadow-lg p-1 mb-5 rounded">{tvShow.name}</h2>
                  <p className="text-gray-400">
                    <span>Release Date: </span> {tvShow.first_air_date}
                  </p>
                  <p className="text-gray-400">
                    <span>Rate: </span>{" "}
                    {tvShow.vote_average !== 0
                      ? `${tvShow.vote_average}/10`
                      : "Not Rated"}{" "}
                    <box-icon
                      name={tvShow.vote_average <= 5.7 ? "star-half" : "star"}
                      color="goldenrod"
                      type="solid"
                    ></box-icon>
                  </p>
                  <p className="text-gray-400">
                    <span>Seasons: </span> {tvShow.number_of_seasons}
                  </p>{" "}
                  <button
                    onClick={() => navigate(`/tvshow/${tvShow.id}`)}
                    className="button"
                  >
                    {" "}
                    <span>PLAY NOW</span>{" "}
                  </button>{" "}
                </div>{" "}
                <div className="cover">
                  {" "}
                  <img
                    src={
                      tvShow.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                        : "https://via.placeholder.com/300x450.png?text=No+Image+Available"
                    }
                    className="card-img"
                    alt={tvShow.name}
                  />{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        )}
        </div>{" "}
      </div>{" "}
    </>
  );
};
export default TvShows;

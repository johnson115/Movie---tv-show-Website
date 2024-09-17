import { useNavigate } from "react-router-dom";
import ".././css/browser.css"
const CardItem = ({ item, type }) => {
    let navigate = useNavigate();

    const handleNavigate = (id) => {
      navigate(type === "movie" ? `/movie/${id}` : `/tvshow/${id}` );
    };

    const posterUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
        : 'https://via.placeholder.com/300x450.png?text=No+Image+Available';

        return (
            <div className="book  movie-card" key={item.id}>
              <div className="cordonne">
                <h2 className="shadow-lg p-1 mb-5 rounded">{type === 'movie' ? item.original_title : item.original_name}</h2>
                <p className="text-gray-400">
                  <span>Release Date: </span> {type === 'movie' ? item.release_date : item.first_air_date}
                </p>
                <p className="text-gray-400">
                  <span>Rate: </span> {item.vote_average !== 0 ? `${item.vote_average}/10` : "Not Rated"}
                  <box-icon
                    name={item.vote_average <= 5.7 ? "star-half" : "star"}
                    color="goldenrod"
                    type="solid"
                  ></box-icon>
                </p>
                {type === 'movie' ? (
                  <p className="overview text-gray-400">
                    <span>Tagline: </span>{item.tagline}
                  </p>
                ) : (
                  <p className="text-gray-400">
                    <span>Seasons: </span>{item.number_of_seasons}
                  </p>
                )}
                <button
                  onClick={() => handleNavigate(item.id)}
                  className="button"
                >
                  <span>PLAY NOW</span>
                </button>
              </div>
        
              <div className="cover">
                <img
                  src={posterUrl}
                  className="card-img"
                  alt={type === 'movie' ? item.original_title : item.original_name}
                />
              </div>
            </div>
          );
}

export default CardItem;

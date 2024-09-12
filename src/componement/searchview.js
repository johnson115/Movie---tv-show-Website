import Hero from "./hero";
import "../css/browser.css";
import { Link } from "react-router-dom";
import NoResults from "./nullSearch";
import { useNavigate } from "react-router-dom";
import "../css/hero.css";


const CardMovie = ({ movie }) => {
    let navigate = useNavigate();

    const handleNavigate = (movieId) => {
      navigate(`/movie/${movieId}`);
    };
  
    let posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    if (movie.poster_path == null) {
        posterUrl = 'https://via.placeholder.com/300x450.png?text=No+Image+Available'
    }
    const detailsUrl = `/movie/${movie.id}`
    return (
        <div className="book movie-card" key={movie.id}>
              <div className="cordonne">
                <h2 className="shadow-lg p-1 mb-5  rounded">{movie.original_title}</h2>
                <p className="text-gray-400" >
                  <span>Release Date: </span> {movie.release_date}
                </p>
                <p className="text-gray-400" >
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
    )
}

const Search = ({ keyword, searchResults }) => {
    const title = (
        <div>
            You are searching for <span className="highlight-keyword text-3xl font-bold tracking-tight sm:text-4xl">{keyword}</span>
        </div>
    );
    //const titlen=`No Search Results founded  as ${keyword}`

    const searchHtml = Array.isArray(searchResults) ? searchResults.map((obj, i) => {
        return <CardMovie movie={obj} key={i} />
    }) : null;
    if (searchResults.length === 0) {
        return <NoResults />
    }
    
    return (
        <>

            <Hero text={title} />

            {searchHtml &&
            
                <div className="views-back myhome" >
                    <div className="container">
                        <div className="row">
                            {searchHtml}
                        </div>
                    </div>
                </div>}
                
        </>
    )
}

export default Search;
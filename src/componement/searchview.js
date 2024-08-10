import Hero from "./hero";
import { Link } from "react-router-dom";
import NoResults from "./nullSearch";


const CardMovie = ({ movie }) => {
    let posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    if (movie.poster_path == null) {
        posterUrl = 'https://via.placeholder.com/300x450.png?text=No+Image+Available'
    }
    const detailsUrl = `/movie/${movie.id}`
    return (
        <div className="col-lg-3 col-md-3 col-2 my-4 ">
            <div className="card cardie" >
                <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
                <div className="card-body">
                    <h5 className="card-title">{movie.original_title}</h5>
                    <p className="card-text"></p>
                    <Link to={detailsUrl} className="btn btn-primary">Show Details</Link>
                </div>
            </div>
        </div>
    )
}

const Search = ({ keyword, searchResults }) => {
    const title = `you are searching for ${keyword}`;
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
            
                <div className="views-back" >
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
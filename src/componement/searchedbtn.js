import { Link } from "react-router-dom";
import NoResults from "./nullSearch";
import Hero from "./hero";


const CardMovie = ({ movie }) => {
    let posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    if (movie.poster_path == null) {
        posterUrl = 'https://via.placeholder.com/300x450.png?text=No+Image+Available'
    }
    const detailsUrl = `/movie/${movie.id}`
    return (
        <div className="col-lg-3 col-md-3 col-2 my-4 ">
            <div className="card" >
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

const Searched = ({ keyword, searchResults }) => {
    const titlen = `all Results founded  as ${keyword} :`

    const searchHtml = Array.isArray(searchResults) ? searchResults.map((obj, i) => {
        return (
            <CardMovie movie={obj} key={i} />

        )
    }) : null;
    if (searchResults.length === 0) {
        return <NoResults />
    }

    return (
        <>
            <div className="search">

                <Hero text={titlen} />
                {searchHtml &&
                    <div className="container search">
                        <div className="row">
                            {searchHtml}
                        </div>
                    </div>}
           </div>
        </>
    )
}

export default Searched;
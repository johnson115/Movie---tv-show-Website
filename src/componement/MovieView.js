import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Hero from "./hero";
import { useParams } from "react-router-dom";

const MovieView = () => {
  const { id } = useParams();
  console.log(id);

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`send an API request for this id: ${id}`);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setMovieDetails(data);
          setIsLoading(false);
        }, 2000);
      });
  }, [id]);

  const animationProps = useSpring({
    opacity: 1,
    width: "100%",

    from: { opacity: 10, width: "30%", },
    delay: 200,
  });

  function renderMovie() {
    if (isLoading) {
      return (
        <>
          <animated.div style={animationProps}>
            <div>
              <Hero text="Wait a second ..." class="spinner-border text-dark" role="status" />
              <div class="card" aria-hidden="true">
                  <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                      <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                      <span class="placeholder col-7"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-4"></span>
                      <span class="placeholder col-6"></span>
                      <span class="placeholder col-8"></span>
                    </p>
                    <a class="btn btn-primary disabled placeholder col-6"></a>
                  </div>
              </div>
            </div>
          </animated.div>
        </>
      );
    }

    if (movieDetails) {
      let poster_path = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
      if (movieDetails.poster_path == null) {
        poster_path =
          "https://via.placeholder.com/300x450.png?text=No+Image+Available";
      }

      const backDrop = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`;
      const newPoster_path = `https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`;

      return (
        <>
          <Hero text={movieDetails.original_title} backDrop={backDrop} />

          <div className="container">
            <div className="row my-5">
              <div className="col-md-3">
                <img
                  src={poster_path}
                  className="img-fluid shadow rounded"
                  alt="my img"
                />
              </div>
              <div className="col-md-9">
                <h2>{movieDetails.original_title}</h2>
                <p className="lead">{movieDetails.overview}</p>
                <b>statue :</b>
                {movieDetails.tagline}
              </div>
            </div>
          </div>
          <div
            className="backdiv"
            style={{ backgroundImage: `url(${newPoster_path})` }}
          ></div>
        </>
      );
    }
  }

  return renderMovie();
};

export default MovieView;

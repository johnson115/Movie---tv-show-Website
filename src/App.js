import "./App.css";

import Home from "./componement/home";

import { useState, useEffect } from "react";
import React from "react";
import Search from "./componement/searchview";
import { Route, Routes } from "react-router-dom";

import NotFound from "./componement/notFound";


import Browser from "./componement/browser movie";
import Nav from "./componement/nav";
import MovieDetails from "./componement/movieDetails";
import TvShows from "./componement/tvshows browser";
import TvShowDetails from "./componement/tvshowdetails";
import Searchanimated from "./componement/searchanimation";
import SwipeableTemporaryDrawer from "./componement/about";
import ProfileDrawer from "./componement/about";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    console.log(searchText, "is the search Text");
    if (searchText) {
      fetch(
        ` https://api.themoviedb.org/3/search/movie?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US&query=${searchText}&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  const [profilOpen, setProfilOpen] = useState(false);
  const toggleDrawer = () => {
    setProfilOpen(!profilOpen);
  };
  return (
    <div>
      <Nav
        searchText={searchText}
        setSearchText={setSearchText}
        toggleDrawer={toggleDrawer}
      />
      <ProfileDrawer open={profilOpen} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route
          path="/"
          element={<Home profilOpen={profilOpen} toggleDrawer={toggleDrawer} />}
        />
        <Route path="/about" element={<SwipeableTemporaryDrawer />} />
        <Route path="/browseMovies" element={<Browser />} />
        <Route path="/browseTvShows" element={<TvShows />} />
        <Route path="/tvshow/:id" element={<TvShowDetails />} />
        <Route
          path="/search"
          element={
            <Search keyword={searchText} searchResults={searchResults} />
          }
        />
        <Route path="/animated" element={<Searchanimated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </div>
  );
}

export default App;

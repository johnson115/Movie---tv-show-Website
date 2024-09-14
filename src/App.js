import './App.css';


import Home from './componement/home';
import AboutView from './componement/aboutView';
import { useState, useEffect } from 'react';
import React from 'react';
import Search from './componement/searchview';
import { Route, Routes } from 'react-router-dom';
import MovieView from './componement/MovieView';
import NotFound from './componement/notFound';
import NoResults from './componement/nullSearch';
import Searched from './componement/searchedbtn';
import Browser from './componement/browser movie';
import Nav from './componement/nav';
import MovieDetails from './componement/movieDetails';


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    console.log(searchText, "is the search Text")
    if (searchText) {
      fetch(` https://api.themoviedb.org/3/search/movie?api_key=68638adb4db3967ed4cc1ce3da324fb6&language=en-US&query=${searchText}&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => {


          setSearchResults(data.results)
        })
    }

  }, [searchText])
  
  

  return (
    <div>
      <Nav searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
      
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/home" element={<Browser />} />
        
        <Route path="/search" element={<Search keyword={searchText} searchResults={searchResults} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/search/result'  element={< Searched keyword={searchText} searchResults={searchResults}/>} />


      </Routes>
    </div>
  );

}

export default App;

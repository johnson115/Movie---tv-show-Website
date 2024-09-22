import { useState, useEffect } from "react";
import NoResults from "./nullSearch";
import CardItem from "./card";
import Hero from "./hero";
import Filtre from "./filtre";
import Searchanimated from "./searchanimation";

const fetchSearchResults = async (query) => {
    const apiKey = "68638adb4db3967ed4cc1ce3da324fb6"; // Replace with your actual API key
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;
    
    const movieResponse = await fetch(movieUrl);
    const tvResponse = await fetch(tvUrl);

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    return {
        movies: movieData.results,
        tvShows: tvData.results
    };
};

const Search = ({ keyword }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filterType, setFilterType] = useState("movie");
    const [loading, setLoading] = useState(true); // State for loading animation

    useEffect(() => {
        const search = async () => {
            setLoading(true); // Start loading animation
            const results = await fetchSearchResults(keyword);
            
            const combinedResults = [
                ...results.movies.map(item => ({ ...item, type: 'movie' })),
                ...results.tvShows.map(item => ({ ...item, type: 'tv' }))
            ];
            setSearchResults(combinedResults);
            setLoading(false); // Stop loading after data is fetched
        };

        search();
    }, [keyword]);

    // Update the filtered results based on the selected filter
    useEffect(() => {
        const results = searchResults.filter(result => result.type === filterType);
        setFilteredResults(results);
    }, [filterType, searchResults]);

    const handleFilterChange = (type) => {
        setFilterType(type); // Change the filter type when the user selects a different tab
    };

    const title = (
        <div>
            You are searching for <span className="highlight-keyword text-3xl font-bold tracking-tight sm:text-4xl">{keyword}</span>
        </div>
    );

    if (loading) {
        return <Searchanimated />; // Display the loading animation
    }

    if (filteredResults.length === 0) {
        return <NoResults />; // Display if no results found
    }

    return (
      <>
        <Hero text={title} />
        <div className="views-back myhome">
          <div className="container mx-auto justify-center px-4">
            {/* Pass the filter change handler to the Filtre component */}
            <Filtre onFilterChange={handleFilterChange} />
            <div className="row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center mt-8">
              {filteredResults.map((obj, i) => (
                <CardItem item={obj} type={obj.type} key={i} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

export default Search;

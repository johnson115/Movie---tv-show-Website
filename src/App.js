import "./App.css";
import Home from "./componement/home";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";

import NotFound from "./componement/notFound";
import Browser from "./componement/browser movie";
import Nav from "./componement/nav";
import MovieDetails from "./componement/movieDetails";
import TvShows from "./componement/tvshows browser";
import TvShowDetails from "./componement/tvshowdetails";
import Search from "./componement/searchview";
import Searchanimated from "./componement/searchanimation";
import SwipeableTemporaryDrawer from "./componement/about";
import ProfileDrawer from "./componement/about";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Store the PWA prompt
  const [profilOpen, setProfilOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setDeferredPrompt(e); // Save the event so it can be triggered later

      // Show SweetAlert immediately after deferredPrompt is available
      Swal.fire({
        title: "Install this app?",
        text: "Install this app for a better experience.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Install",
        cancelButtonText: "Not Now",
        customClass: {
          confirmButton: "swal2-install-button",
          cancelButton: "swal2-dismiss-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleInstallClick();
        }
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the prompt
      });
    }
  };

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
        <Route path="/" element={<Home profilOpen={profilOpen} toggleDrawer={toggleDrawer} />} />
        <Route path="/about" element={<SwipeableTemporaryDrawer />} />
        <Route path="/browseMovies" element={<Browser />} />
        <Route path="/browseTvShows" element={<TvShows />} />
        <Route path="/tvshow/:id" element={<TvShowDetails />} />
        <Route path="/search" element={<Search keyword={searchText} searchResults={searchResults} />} />
        <Route path="/animated" element={<Searchanimated />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

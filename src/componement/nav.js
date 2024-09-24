import React, { useState } from "react";
import { Search, House, CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../css/nav.css";

const Nav = ({ searchText, setSearchText, toggleDrawer }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const Test = useNavigate();
  const updateSearchText = (e) => {
    Test("/search");
    setSearchText(e.target.value);
  };
  const logo = require("./media/LOGO.png");

  return (
    <nav className=" w-full shadow-md">
      
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="flex-shrink-0 flex  text-white font-bold text-xl"
            >
              <img
                src={logo}
                style={{ width: "90px" }}
                alt="logo of the site"
              />
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-300 flex items-baseline hover:bg-[#044b6e] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <House className="w-7 h-4 text-center align-items-center flex text-white" />
                  Home
                </a>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={toggleDrawer}
                aria-label="Toggle search"
                id="btn"
                className="text-white hover:bg-[#044b6e] p-2 rounded-md mr-2"
              >
                <CircleUserRound className="h-7 w-7 mr-4" />
              </button>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  value={searchText}
                  onChange={updateSearchText}
                  type="text"
                  placeholder="Search"
                  className="block w-full  md:w-48 focus:w-64 transition-all duration-300 ease-in-out pl-10 pr-3 py-2 border border-[#044b6e] rounded-md leading-5 bg-[#022736] text-white placeholder-gray-400 focus:outline-none focus:ring-[#0596d7] focus:border-[#0596d7] sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex mr-auto ml-auto items-center md:hidden">
            <Link
              to="/"
              aria-label="Toggle search"
              id="btn"
              className="text-white hover:bg-[#044b6e] p-2 rounded-md mr-2"
            >
              <House className="h-7 w-7 mr-3" />
            </Link>
            <button
              onClick={toggleDrawer}
              aria-label="Toggle search"
              id="btn"
              className="text-white hover:bg-[#044b6e] p-2 rounded-md mr-2"
            >
              <CircleUserRound className="h-7 w-7 mr-3" />
            </button>
            <button
              onClick={toggleSearch}
              aria-label="Toggle search"
              id="btn"
              className="text-white hover:bg-[#044b6e] p-2 rounded-md mr-2"
            >
              <Search className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden px-2 py-2 navbar">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              value={searchText}
              onChange={updateSearchText}
              type="text"
              placeholder="Search"
              className="block w-full pl-10 pr-3 py-2 border border-[#044b6e] rounded-md leading-5 bg-[#022736] text-white placeholder-gray-400 focus:outline-none focus:ring-[#0596d7] focus:border-[#0596d7] text-sm"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

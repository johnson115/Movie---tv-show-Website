import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/nav.css";

const Nav = ({ searchText, setSearchText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const Test = useNavigate()
  const updateSearchText = (e) => {
    Test('/search')
    setSearchText(e.target.value)
  }

  return (
    <nav className="bg-[#03304a] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 text-white font-bold text-xl">
              Logo
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/" className="text-gray-300 hover:bg-[#044b6e] hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="/home" className="text-gray-300 hover:bg-[#044b6e] hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Browser
                </a>
                <a href="/about" className="text-gray-300 hover:bg-[#044b6e] hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  value={searchText}
                  onChange={updateSearchText}
                  type="text"
                  placeholder="Search"
                  className="block w-full pl-10 pr-3 py-2 border border-[#044b6e] rounded-md leading-5 bg-[#022736] text-white placeholder-gray-400 focus:outline-none focus:ring-[#0596d7] focus:border-[#0596d7] sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleSearch} aria-label="Toggle search" id="btn" className="text-white hover:bg-[#044b6e] p-2 rounded-md mr-2">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={toggleMenu} aria-label="Open menu" id="btn" className="text-white hover:bg-[#044b6e] p-2 rounded-md">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden px-2 py-2">
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

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-gray-300 hover:bg-[#044b6e] hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="/browser" className="text-gray-300 hover:bg-[#044b6e] hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Browser
            </a>
            <a href="/about" className="text-gray-300 hover:bg-[#044b6e] hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
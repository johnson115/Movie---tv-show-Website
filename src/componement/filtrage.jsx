import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Film, Filter, Tv } from "lucide-react";
import { useState } from "react";

export default function Filtrage({ onFilterChange }) {
  const [openFiltre, setopenFiltre] = useState(false);

  return (
    <>
      <button
        onClick={() => setopenFiltre(!openFiltre)}
        id="trailer"
        className="rounded-md flex items-center justify-center bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Filtre
        <Filter className="ml-2" />
      </button>

      {/* Filter options with animations */}
      <div
        className={`transition-all duration-1000 ease-in-out ${openFiltre ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'} w-full rounded-lg mt-4`}
      >
        <div className="w-full max-w-4xl mx-auto px-4">
          <TabGroup>
            <TabList className="flex gap-6 shadow-lg justify-center xs:flex-col xs:gap-4 xs:justify-center mb-4">
              <Tab
                onClick={() => onFilterChange("rate")}
                className={({ selected }) =>
                  `rounded-full py-2 px-6 flex items-center text-base font-semibold transition-all duration-300 ${
                    selected ? 'bg-red-600 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-red-500 hover:text-white'
                  } focus:outline-none`
                }
              >
                Per Rate <Film className="ml-2" />
              </Tab>

              <Tab
                onClick={() => onFilterChange("popularity")}
                className={({ selected }) =>
                  `rounded-full py-2 px-6 flex items-center text-base font-semibold transition-all duration-300 ${
                    selected ? 'bg-green-600 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-green-500 hover:text-white'
                  } focus:outline-none`
                }
              >
                Trending <Tv className="ml-2" />
              </Tab>
            </TabList>

            {/* Genre Filter Tabs */}
            <div className="w-full flex justify-center mt-6">
              <TabList className="flex shadow-lg flex-wrap gap-4 justify-center">
                {[
                  "Action",
                  "Drama",
                  "Horror",
                  "Comedy",
                  "Documentary",
                  "Sci-Fi",
                  "Romance",
                  "Thriller",
                  "Fantasy",
                  "Adventure",
                  "Animation",
                  "Crime",
                  "Family",
                  "History",
                  "Music",
                  "Mystery",
                  "TV Movie",
                  "War",
                  "Western",
                ].map((genre) => (
                  <Tab
                    key={genre}
                    onClick={() => onFilterChange(genre.toLowerCase())}
                    className={({ selected }) =>
                      `rounded-full py-2 px-6 text-base font-semibold transition-all duration-300 ${
                        selected ? 'bg-blue-600 text-white shadow-lg' : 'bg-transparent text-gray-300 hover:bg-blue-500 hover:text-white'
                      } focus:outline-none`
                    }
                  >
                    {genre}
                  </Tab>
                ))}
              </TabList>
            </div>
          </TabGroup>
        </div>
      </div>
    </>
  );
}

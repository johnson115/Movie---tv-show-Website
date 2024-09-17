import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Film, Tv } from "lucide-react";
import { useState, useEffect } from "react";

export default function Filtre({ onFilterChange }) {
  // Retrieve the saved tab from localStorage or default to 'movie'
  const [selectedTab, setSelectedTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedTab") || "movie";
    }
    return "movie";
  });

  // Update localStorage whenever the selected tab changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTab", selectedTab);
    }
  }, [selectedTab]);

  const handleTabChange = (type) => {
    setSelectedTab(type);
    onFilterChange(type); // Notify parent component (Search) about the change
  };

  return (
    <div className="w-full bg-transparent flex justify-center xs:block">
      <div className="w-full max-w-md">
        <TabGroup selectedIndex={selectedTab === "movie" ? 0 : 1} onChange={(index) => handleTabChange(index === 0 ? "movie" : "tv")}>
          <TabList className="flex gap-6 xs:flex-col xs:gap-4 xs:justify-center">
            <Tab
              onClick={() => handleTabChange("movie")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Movie
              <Film className="ml-2" />
            </Tab>
            <Tab
              onClick={() => handleTabChange("tv")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              TV Shows
              <Tv className="ml-2" />
            </Tab>
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}

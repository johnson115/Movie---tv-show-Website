import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Film, Tv } from "lucide-react";

export default function Filtrage({ onFilterChange }) {
  return (
    <div className="w-full bg-transparent flex justify-center xs:block">
      <div className="w-full max-w-md">
        <TabGroup>
          <TabList className="flex gap-6 xs:flex-col xs:gap-4 xs:justify-center">
            <Tab
              onClick={() => onFilterChange("rate")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              per rate
              <Film className="ml-2" />
            </Tab>
            <Tab
              onClick={() => onFilterChange("popularity")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Trending
              <Tv className="ml-2" />
            </Tab>
            <TabList className="block" >
            <Tab
              onClick={() => onFilterChange("action")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Action
            </Tab>
            <Tab
              onClick={() => onFilterChange("drama")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Drama
            </Tab>
            <Tab
              onClick={() => onFilterChange("horror")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Horror
            </Tab>
            <Tab
              onClick={() => onFilterChange("comedy")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Comedy
            </Tab>
            <Tab
              onClick={() => onFilterChange("documentary")}
              className={({ selected }) =>
                `rounded-full py-2 px-4 flex items-center text-sm font-semibold text-white focus:outline-none 
                ${selected ? 'bg-white/10' : 'bg-transparent'} 
                hover:bg-white/5 focus:outline-1 focus:outline-white`
              }
            >
              Documentary
            </Tab>
            </TabList>
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}

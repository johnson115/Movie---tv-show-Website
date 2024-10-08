import Modal from "./modal";
import { useState } from "react";
import ProfileDrawer from "./about";

const Home = ({profilOpen ,  toggleDrawer}) => {
  const [isOpen, setIsOpen] = useState(false);
  

  // Function to toggle the profile drawer
 

  return (
    <div className="h-auto">
      
      <div className="mx-auto h-auto w-full sm:px-6 sm:py-14 lg:px-8">
        <div className="relative max-w-10xl isolate overflow-hidden bg-red-700 px-6 shadow-3xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 xs:pt-10 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="relative xs:mt-4 lg:mt-0 flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-auto lg:py-11 lg:mx-0">
            <h2 className="text-3xl mt-10 font-bold tracking-tight text-white sm:text-4xl">
              End your day with a Movie
              <br />
              Start using our app today.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Thanks to our app, you can find your favorite movie.
            </p>
            <div className="mt-8 flex flex-col items-center gap-y-4 lg:flex-row lg:items-center lg:justify-start lg:gap-x-6">
              <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

              
              <button onClick={toggleDrawer} id="trailer" className="text-sm font-semibold shadow rounded-md   border p-2 border-white leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </button>

              
               
            </div>
          </div>
          <div className="relative h-full w-full max-w-md mt-10 lg:mt-0 lg:w-1/2">
            <img
              className="w-full xs:h-[700px] rounded-md top-0 bg-white/5 ring-1 ring-white/10 md:h-[490px] object-cover"
              src="https://img.freepik.com/premium-photo/people-enjoying-movie-theater-sitting-comfortable-seats-with-popcorn-focused-screen_166222-18766.jpg?w=360"
              alt="App screenshot"
              width={700}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      
      <ProfileDrawer open={profilOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Home;

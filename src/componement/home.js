import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-red-300 h-auto">
      <div className="mx-auto w-full py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative max-w-10xl isolate overflow-hidden bg-red-700 px-6  shadow-3xl sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-20 lg:px-24 xs:pt-14 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-auto lg:py-32 lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              End your day with a Movie
              <br />
              Start using our app today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Thanks to our app, you can find your favorite movie.
            </p>
            <div className="mt-10 flex flex-col items-center gap-y-4 lg:flex-row lg:items-center lg:justify-start lg:gap-x-6">
              <Link
                to="/home"
                className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-md mt-10 lg:mt-0 lg:w-1/2">
            <img
              className="w-full rounded-md top-0 bg-white/5 ring-1 ring-white/10"
              src="https://img.freepik.com/premium-photo/people-enjoying-movie-theater-sitting-comfortable-seats-with-popcorn-focused-screen_166222-18766.jpg?w=360"
              alt="App screenshot"
              width={700}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

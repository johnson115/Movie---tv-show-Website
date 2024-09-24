import { Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
const notfounded=require("./media/404page.png");
    return (
        <div className="notfound text-white min-h-screen flex items-center">
        <div className="container mx-auto p-4 flex flex-wrap items-center">
          <div className="w-full md:w-5/12 text-center p-4">
            <img src={notfounded} alt="Not Found" />
          </div>
          <div className="w-full md:w-7/12 text-center md:text-left p-4">
            <div className="text-6xl font-medium">404</div>
            <div className="text-xl md:text-3xl font-medium mb-4">
              Oops. This page has gone missing.
            </div>
            <div className="text-lg mb-8">
              You may have mistyped the address or the page may have moved.
            </div>
            <Link to="/" id="trailer" className="border mr-auto ml-auto w-44 flex text-center border-white rounded py-2 px-4">
            <Home className="w-7 h-7  mr-2" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
      
    );
};

export default NotFound;

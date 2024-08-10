import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <>
            <header className="bg-black text-white p-5 hero-container">
                <h1>404 - Page Not Found</h1>
                <Link className="btn btn-warning" to="/">Go Back</Link>
            </header>
            <div className="n-backDrop">
                <img src="https://i.ytimg.com/vi/jYuoCEAOudw/maxresdefault.jpg" alt="not found"/>

            </div>
        </>
    );
};

export default NotFound;

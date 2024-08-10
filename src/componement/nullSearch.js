import React from "react";
const NoResults = () => {
    const backDrop = "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60";
    return (
        <>
        <div className="null-back" style={{ backgroundImage: `url(${backDrop})` }}>
           <header className="pub">
                
            </header>
            <h1 className="null">Sorry, No Search Results Founded !</h1>
        </div >
    </>
    )

}
export default NoResults;
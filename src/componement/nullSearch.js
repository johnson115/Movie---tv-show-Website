import React from "react";
const NoResults = () => {
    const backDrop =require("./media/noresult.png");
    return (
        <>
        <div className="null-back" >
          <img src={backDrop} alt="no Result founded here " className="noresult" />
        </div >
    </>
    )

}
export default NoResults;
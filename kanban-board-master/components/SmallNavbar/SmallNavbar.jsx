import React from "react";
import "./SmallNavbar.css"; // Create this CSS file for styling the small navbar

const SmallNavbar = () => {
  return (
    <div className="small-navbar">
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-bar" />
        <div className="search-bar-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  );
};

export default SmallNavbar;

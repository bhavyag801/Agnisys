import React from "react";
import "./Navbar.css";
import logo from './logo.png';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="logo-heading-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="heading-container">
          <h2>AGNISYS</h2>
          <p className="small-text">SYSTEM DEVELOPMENT WITH CERTAINTY</p>
        </div>
      </div>
      <div className="button-subnav-container">
        <div className="button-container">
          <button className="login-button">Login</button>
          <button className="get-started-button">Get Started</button>
        </div>
        <div className="sub-navbar">
          <a href="#projects"></a>
          <a href="#people"></a>
          <a href="#contact"></a>
          <a href="#organizations"></a>
        </div>
      </div>
    </div>
  );
}

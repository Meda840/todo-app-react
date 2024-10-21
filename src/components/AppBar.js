import React from "react";
import { Link } from "react-router-dom";
import "./AppBar.css"; // Optional: You can style the AppBar with CSS

function AppBar() {
  return (
    <nav className="app-bar">
      <h2>My TODO APP</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/completed">Completed Tasks</Link>
      </div>
    </nav>
  );
}

export default AppBar;

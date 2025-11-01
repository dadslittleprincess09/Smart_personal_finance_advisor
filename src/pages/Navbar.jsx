import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import navlogoimg from '../assets/logo.png';
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = storedUser ? storedUser.name : "User";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#409e56ff",
        padding: "8px",
      }}
    >
      <div className="container-fluid">
        {/* Logo + Brand */}
        <NavLink
          className="navbar-brand d-flex align-items-center text-white text-decoration-none"
          to="/home"
        >
          <img
            src={navlogoimg}
            alt="SmartFinance Logo"
            width="50"
            height="50"
            className="me-2 rounded-circle border"
            style={{ objectFit: "cover" }}
          />
          <span className="fw-bold fs-5">
            Smart Personal Financial Advisor
          </span>
        </NavLink>

        {/* Toggle Button */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {/* User + Logout */}
            <li className="nav-item d-flex align-items-center ms-lg-3">
              <span className="text-white me-2">👋 Hi, {user}</span>
              {storedUser && (
                <button className="btn btn-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

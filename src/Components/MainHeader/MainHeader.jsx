import "./MainHeader.scss";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggle = () => setToggleNav(!toggleNav);

  return (
    <nav className="navabr-wrapper">
      <div className="navbar">
        <div className="navbar__left">
          <span className="navbar__logo">
            <img
              className=" logo"
              src="src/Assets/Images/logo.png"
              alt="logo"
            />
          </span>
          <div className="navbar__links desktop-only">
            <ul className="nav-links">
              <li className="nav-links__item">About</li>
              <li className="nav-links__item">Destination Insights</li>
            </ul>
          </div>
        </div>
        <div className="user-action desktop-only">
          <NavLink to="/dashboard">
            <button className="user-action__btn login">Log In</button>
          </NavLink>
          <button className="user-action__btn signup">Sign Up</button>
        </div>
        <button
          className={`navbar__toggle sidebar-actions__toggle ${
            toggleNav ? "open" : ""
          }`}
          onClick={handleToggle}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <div className={`mobile-menu ${toggleNav ? "mobile-menu--active" : ""}`}>
        <ul className="mobile-links">
          <li className="mobile-links__item">About</li>
          <li className="mobile-links__item">Destination Insights</li>
          <li className="mobile-links__item">Tips From Locals</li>
        </ul>
        <div className="mobile-action">
          <NavLink to="/dashboard">
            <button className="mobile-action__btn login">Log In</button>
          </NavLink>
          <button
            className={`mobile-action__btn signup ${
              toggleNav ? "user-actions__btn--active" : ""
            }}`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

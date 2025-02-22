import { NavLink } from "react-router-dom";
import "./DashboardSidebar.scss";
import Form from "../../Components/Form/Form.jsx";
import { useState } from "react";
import Logo from "../../Assets/Images/logo.png";
import LogoDark from "../../Assets/Images/logo-dark.png";
import dashboard from "../../Assets/Images/dashboard.svg";
import explore from "../../Assets/Images/explore.svg";
import pindrop from "../../Assets/Images/pindrop.svg";

export default function DashboardSidebar() {
  const [showForm, setShowForm] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const handleToggle = () => setToggleNav(!toggleNav);
  const closeMenu = () => setToggleNav(false);

  return (
    <>
      <div className="sidebar-actions">
        <img
          className=" logo sidebar-actions__logo"
          src={LogoDark}
          alt="logo"
        />
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

      <aside className={`sidebar ${!toggleNav ? "sidebar--active" : ""}`}>
        <div className="sidebar__top">
          <NavLink to="/dashboard/create-list" onClick={closeMenu}>
            <button className="sidebar__add-list-btn">+ Create New List</button>
          </NavLink>
          <ul className="sidebar-list">
            <li>
              <NavLink
                onClick={closeMenu}
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                {" "}
                <img
                  className="dashboard-icon"
                  src={dashboard}
                  alt="dashboard-icon"
                />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                to="/dashboard/public-trips"
                end
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                <img
                  className="dashboard-icon"
                  src={explore}
                  alt="dashboard-icon"
                />
                Public Trips
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                to="/dashboard/destination-insights"
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                <img
                  className="dashboard-icon"
                  src={pindrop}
                  alt="dashboard-icon"
                />
                Destination Insights
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <NavLink to="/">
            <span className="sidebar-list__item">Log Out</span>
          </NavLink>
        </div>
      </aside>
      {showForm && <Form />}
    </>
  );
}

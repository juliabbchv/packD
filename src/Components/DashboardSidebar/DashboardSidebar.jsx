import { NavLink } from "react-router-dom";
import "./DashboardSidebar.scss";
import Form from "../../Components/Form/Form.jsx";
import { useState } from "react";
import Logo from "../../Assets/Images/logo.png";
import LogoDark from "../../Assets/Images/logo-dark.png";

export default function DashboardSidebar() {
  const [showForm, setShowForm] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const handleToggle = () => setToggleNav(!toggleNav);

  return (
    <>
      <div className="sidebar-actions">
        <img
          className=" logo sidebar-actions__logo"
          src={`${!toggleNav ? Logo : LogoDark}`}
          alt="logo"
        />
      </div>
      <button
        className="navbar__toggle sidebar-actions__toggle"
        onClick={handleToggle}
      >
        {toggleNav ? "X" : "☰"}
      </button>
      <aside className={`sidebar ${!toggleNav ? "sidebar--active" : ""}`}>
        <div className="sidebar__top">
          <NavLink to="/dashboard/create-list">
            <button className="sidebar__add-list-btn">+ Create New List</button>
          </NavLink>
          <ul className="sidebar-list">
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/trips"
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                My Trips
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/explore-public-lists"
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                Explore Public Lists
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/destination-insights"
                className={({ isActive }) =>
                  `sidebar-list__item ${
                    isActive ? "sidebar-list__item--selected" : ""
                  }`
                }
              >
                Destination Insights
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <span className="sidebar-list__item">Log Out</span>
        </div>
      </aside>
      {showForm && <Form />}
    </>
  );
}

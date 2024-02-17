import React, { useState } from "react";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as FaIcons from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import './navbar.css';

const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <PiIcons.PiSoccerBall />,
    cName: "nav-text",
  },
  {
    title: "Scouting",
    path: "/scouting",
    icon: <GiIcons.GiSunglasses />,
    cName: "nav-text",
  },
  {
    title: "Events",
    path: "/events",
    icon: <GiIcons.GiSoccerKick />,
    cName: "nav-text",
  },
];

function Navbar() {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // Check if the current path is the login page or the register page
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        {!isLoginPage && !isRegisterPage && (
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
        )}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {!isLoginPage && !isRegisterPage && (
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
            )}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

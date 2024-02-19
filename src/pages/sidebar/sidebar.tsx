import React, { useState } from "react";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as PiIcons from "react-icons/pi";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import './sidebar.css';

const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
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
  {
    title: "Reports",
    path: "/reports",
    icon: <TbIcons.TbReportSearch />,
    cName: "nav-text",
  },
];

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className={sidebar ? 'close-icon-black' : ''} />
              </Link>
            </li>
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

export default Sidebar;

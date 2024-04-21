import { Button } from "antd";
import { useState } from "react";
import { SCOUTING_PAGE_NAMES } from "../../constants/scoutingConstants";
import "./scouting.css";
import SkillConfiguration from "./skillPage/SkillConfiguration";

const ScoutingDashboard = () => {
  const [activePage, setActivePage] = useState(0);

  const handleButton1Click = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const handleButton3Click = () => {
    if (activePage < Object.keys(SCOUTING_PAGE_NAMES).length - 1) {
      setActivePage(activePage + 1);
    }
  };
  const getPage = () => {
    switch (activePage) {
      case 0:
        return <SkillConfiguration />;
      case 1:
        return <SkillConfiguration />;
      case 2:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="button-container">
        <Button onClick={handleButton1Click} className="arrow-button">
          &#8249;
        </Button>
        <Button className="content-button">
          {SCOUTING_PAGE_NAMES[activePage]}
        </Button>
        <Button onClick={handleButton3Click} className="arrow-button">
          &#8250;
        </Button>
      </div>
      <div className="page-content">
        <h1>{getPage()}</h1>
      </div>
    </div>
  );
};

export default ScoutingDashboard;

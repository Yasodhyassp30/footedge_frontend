import { Button, Card } from "antd";
import { useState } from "react";
import { SCOUTING_PAGE_NAMES } from "../../constants/scoutingConstants";
import ScoutConfiguration from "./scoutPage/ScoutConfiguration";
import ScoutResult from "./scoutResultPage/ScoutResult";
import "./scouting.css";
import SkillConfiguration from "./skillPage/SkillConfiguration";

const ScoutingDashboard = () => {
  const [activePage, setActivePage] = useState(0);

  const handlePrevButtonClick = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (activePage < Object.keys(SCOUTING_PAGE_NAMES).length - 1) {
      setActivePage(activePage + 1);
    }
  };

  const getPage = () => {
    switch (activePage) {
      case 0:
        return <SkillConfiguration />;
      case 1:
        return <ScoutConfiguration />;
      case 2:
        return <ScoutResult />;
      default:
        return null;
    }
  };

  return (
    <div className="scout-dashboard-container">
      <Card className="navigation-bar">
        <div className="button-container">
          <Button onClick={handlePrevButtonClick} className="arrow-button">
            &#8249;
          </Button>
          <Button className="content-button">
            {SCOUTING_PAGE_NAMES[activePage]}
          </Button>
          <Button onClick={handleNextButtonClick} className="arrow-button">
            &#8250;
          </Button>
        </div>
      </Card>
      <div className="page-content">{getPage()}</div>
    </div>
  );
};

export default ScoutingDashboard;

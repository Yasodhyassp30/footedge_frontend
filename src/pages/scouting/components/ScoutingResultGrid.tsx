import React from "react";
import "./ScoutingResultGrid.css"; // You may need to create a CSS file for styling

interface KeyToEnglishMap {
  [key: string]: string;
}

const keyToEnglishMap: KeyToEnglishMap = {
  head: "Head",
  rightKnee: "Right Knee",
  leftKnee: "Left Knee",
  leftToe: "Left Toe",
  RighttToe: "Right Toe",
  leftHandWrist: "Left Hand Wrist",
  rightHandWrist: "Right Hand Wrist",
};

interface PlayerStat {
  [key: string]: {
    overall: number;
    offsets: {
      left: number;
      right: number;
      up: number;
      down: number;
    };
  };
}

interface ScoutingOptionsGridComponentProps {
  playerStat: PlayerStat;
  onItemSelect: (index: number) => void;
}

const ScoutingResultsGridComponent: React.FC<
  ScoutingOptionsGridComponentProps
> = ({ playerStat, onItemSelect }) => {
  const tilesData = Object.entries(playerStat);

  return (
    <div className="dark-contrast-grid-result">
      <div className="grid-container-result">
        {tilesData.map(([key, stat], index) => (
          <div
            key={key}
            tabIndex={index}
            className="grid-item"
            // Use the following style to display overall rating as a background color
            style={{
              backgroundColor: `rgba(${Math.min(255, 255 - stat.overall * 2.55)}, ${Math.min(255, stat.overall * 2.55)}, 0, ${stat.overall / 100})`,
            }}
                                 
            onClick={() => onItemSelect(index)}
            onKeyDown={() => onItemSelect(index)}
          >
            <div className="grid-content-result">
              <h3 className="title-result">{keyToEnglishMap[key]}</h3>
              <span className="tooltip-result">
                Overall Positive Rating: {stat.overall}%
              </span>
              <span className="tooltip-result">
                Left Offest Count: {stat.offsets.left}%
              </span>
              <span className="tooltip-result">
                Right Offest Count: {stat.offsets.right}%
              </span>
              <span className="tooltip-result">
                Up Offest Count: {stat.offsets.up}%
              </span>
              <span className="tooltip-result">
                Down Offest Count: {stat.offsets.down}%
              </span>
              <span className="tooltip-link-result">
                {/* You can add a link based on your requirements */}
                <a href="#">See Summary</a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutingResultsGridComponent;

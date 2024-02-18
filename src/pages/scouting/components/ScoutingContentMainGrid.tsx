import React from "react";
import "./ScoutingContentMainGridStyles.css";

interface ScoutingOptionsGridComponentProps {
  tilesData: { id: number; imageUrl: string; title: string; tooltip: string, link: string }[];
  onItemSelect: (index: number) => void;
};

const ScoutingOptionsGridComponent: React.FC<ScoutingOptionsGridComponentProps> = ({ tilesData, onItemSelect }) => {
  return (
    <div className="dark-contrast-grid">
      <div className="grid-container">
        {tilesData.map((tile, index) => (
          <div
            key={tile.id}
            tabIndex={index}
            className="grid-item"
            style={{ backgroundImage: `url(${tile.imageUrl})` }}
            onClick={() => onItemSelect(index)}
            onKeyDown={() => onItemSelect(index)}
          >
            <div className="grid-content">
              <h3 className="title">{tile.title}</h3>
              <span className="tooltip">{tile.tooltip}</span>
              <span className="tooltip-link"><a href={tile.link}>Watch and Learn</a></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutingOptionsGridComponent;
import React from "react";
import "./ScoutingContentGrid.css"; // You may need to create a CSS file for styling

interface DarkContrastGridProps {
  tilesData: { id: number; imageUrl: string; title: string; tooltip: string }[];
  onItemSelect: (index: number) => void;
};

const DarkContrastGrid: React.FC<DarkContrastGridProps> = ({ tilesData, onItemSelect }) => {
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
          >
            <div className="grid-content">
              <h3 className="title">{tile.title}</h3>
              <span className="tooltip">{tile.tooltip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DarkContrastGrid;

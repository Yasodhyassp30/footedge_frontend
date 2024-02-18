import React from "react";
import "./NullIndicator.css";

interface NullIndicatorProps {
  message?: string;
  subMessage?: string;
}

const NullIndicator: React.FC<NullIndicatorProps> = ({
  message = "No Data Available",
  subMessage = "Please select an item from below to start scouting.",
}) => {
  return (
    <div className="null-indicator">
      <div className="null-indicator-message">{message}</div>
      <div className="null-indicator-message">{subMessage}</div>
      <div className="null-indicator-icon">🚫</div> {/* You can replace 🚫 with your desired null icon */}
    </div>
  );
};

export default NullIndicator;
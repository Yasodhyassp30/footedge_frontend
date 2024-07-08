import React from "react";
import { CustomOptionProps } from "../../../types/scoutingTypes";

const CustomOption: React.FC<CustomOptionProps> = ({ imageURL, categoryName, categoryValue }) => {
  const getBackgroundColor = (categoryVal: number): string => {
    const value = categoryVal % 5;
    switch (value) {
      case 1:
        return "#f5222d";
      case 2:
        return "#fa8c16";
      case 3:
        return "#52c41a";
      case 4:
        return "#1890ff";
      default:
        return "#d9d9d9";
    }
  };

  return (
    <div
      className="category-option"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100px", // Adjust the width as needed
        margin: "8px", // Adjust margin as needed
      }}
    >
      <div
        className="category-icon"
        style={{
          backgroundColor: getBackgroundColor(categoryValue),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "12px",
          marginRight: "8px", // Adjust margin right as needed
        }}
      >
        {imageURL ? (
          <img src={imageURL} alt={categoryName} style={{ borderRadius: "50%", width: "100%", height: "100%" }} />
        ) : (
          <span>{categoryName.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
      <span style={{ fontSize: "12px" }}>{categoryName}</span>
    </div>
  );
};

export default CustomOption;

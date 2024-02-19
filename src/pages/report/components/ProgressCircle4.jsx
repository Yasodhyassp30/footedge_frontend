import { Box, useTheme } from "@mui/material";
import { tokens } from "./chartcolour";

const ProgressCircle4 = ({ progress = "0.8", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  // Define your RGB values
  const redRGB = "255, 0, 0"; // Example RGB value for red
  const greenRGB = "0, 255, 0"; // Example RGB value for green
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, rgb(${redRGB}) ${angle}deg 360deg),
            rgb(${greenRGB})`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle4;

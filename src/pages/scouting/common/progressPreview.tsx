// src/HumanPose.tsx
import React, { useEffect, useRef, useState } from "react";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { ProgressContentProps } from "../../../types/scoutingTypes";
import { fetchData } from "../scoutingApis";

const points = [
  { id: 1, name: "leftEar", position: [-20, -200], value: "Left Ear" },
  { id: 2, name: "rightEar", position: [20, -200], value: "Right Ear" },
  { id: 3, name: "leftEye", position: [-10, -210], value: "Left Eye" },
  { id: 4, name: "rightEye", position: [10, -210], value: "Right Eye" },
  { id: 5, name: "mouth", position: [0, -190], value: "Mouth" },
  {
    id: 6,
    name: "leftShoulder",
    position: [-35, -160],
    value: "Left Shoulder",
  },
  {
    id: 7,
    name: "rightShoulder",
    position: [35, -160],
    value: "Right Shoulder",
  },
  { id: 8, name: "leftWrist", position: [-50, -100], value: "Left Wrist" },
  { id: 9, name: "rightWrist", position: [50, -100], value: "Right Wrist" },
  { id: 10, name: "leftElbow", position: [-45, -130], value: "Left Elbow" },
  { id: 11, name: "rightElbow", position: [45, -130], value: "Right Elbow" },
  { id: 12, name: "leftHip", position: [-30, -90], value: "Left Hip" },
  { id: 13, name: "rightHip", position: [30, -90], value: "Right Hip" },
  { id: 14, name: "leftKnee", position: [-30, -30], value: "Left Knee" },
  { id: 15, name: "rightKnee", position: [30, -30], value: "Right Knee" },
  { id: 16, name: "leftAnkle", position: [-30, 40], value: "Left Ankle" },
  { id: 17, name: "rightAnkle", position: [30, 40], value: "Right Ankle" },
];

const lines = [
  [1, 2], // Ears
  [3, 4], // Eyes
  [1, 3],
  [2, 4], // Ears to Eyes
  [1, 5],
  [2, 5], // Ears to Mouth
  [6, 7], // Shoulders
  [6, 10],
  [7, 11], // Shoulders to Elbows
  [10, 8],
  [11, 9], // Elbows to Wrists
  [6, 12],
  [7, 13], // Shoulders to Hips
  [12, 14],
  [13, 15], // Hips to Knees
  [14, 16],
  [15, 17], // Knees to Ankles
];

const canvasWidth = 600; // Adjusted canvas width
const canvasHeight = 600; // Adjusted canvas height

const HumanPose: React.FC<ProgressContentProps> = ({ selectedSkill }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [latestRequest, setLatestRequest] = useState<any>();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(rotation);

      // Draw lines between points
      context.strokeStyle = "black";
      lines.forEach((line) => {
        context.beginPath();
        line.forEach((pointId, index) => {
          const { position } = points.find((point) => point.id === pointId)!;
          const [x, y] = position;
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });

      // Draw points
      points.forEach((point) => {
        const { position } = point;
        const [x, y] = position;

        // Draw point
        context.beginPath();
        context.arc(x, y, 8, 0, 2 * Math.PI); // Increased point size for visibility
        context.fillStyle = "orange";
        context.fill();
        context.stroke();
      });

      context.restore();
    };

    draw();
  }, [rotation]);

  const handleRotationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotation(Number(event.target.value) * (Math.PI / 180));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    // Transform mouse position to canvas coordinates
    const transformedMouseX =
      (mouseX - width / 2) * Math.cos(-rotation) -
      (mouseY - height / 2) * Math.sin(-rotation);
    const transformedMouseY =
      (mouseX - width / 2) * Math.sin(-rotation) +
      (mouseY - height / 2) * Math.cos(-rotation);

    setMousePosition({ x: mouseX, y: mouseY });

    // Check mouse hover over points
    let foundHover = false;
    points.forEach((point) => {
      const { position } = point;
      const [px, py] = position;
      // Calculate distance from transformed mouse position to point
      const distance = Math.sqrt(
        Math.pow(transformedMouseX - px, 2) +
          Math.pow(transformedMouseY - py, 2)
      );
      if (distance < 8) {
        // Adjusted distance threshold
        setHoveredPoint(point.id);
        foundHover = true;
      }
    });

    if (!foundHover) {
      setHoveredPoint(null);
    }
  };

  useEffect(() => {
    if (selectedSkill) {
      const callAPI = async () => {
        // const url = `${SCOUTING_SERVICE_URL}/scout/${selectedSkill}`;
        const url = `${SCOUTING_SERVICE_URL}/scout/66798830bbb733081142f03a?type=SCOUTING`;
        const result = await fetchData(url);
        setLatestRequest(result);
      };

      callAPI();
    }
  }, [selectedSkill]);

  const getPointPopOver = (pointId: number) => {
    const point = points.find((point) => point.id === pointId);
    if (!point) return null;

    console.log(latestRequest)

    const results = latestRequest?.results || [];
    console.log(results[point.id -1])
    return (
      <div
        style={{
          position: "absolute",
          left: mousePosition!.x + 10,
          top: mousePosition!.y + 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          zIndex: 100,
        }}
      >
        {point.value} Offset: Angle:  {results[point.id -1]?.total_angle} Degrees and Distance {results[point.id -1]?.total_distance} pxs
      </div>
    );
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black" }}
        onMouseMove={handleMouseMove}
      />
      <div style={{ marginTop: "10px" }}>
        Rotation:
        <input
          type="range"
          min="0"
          max="360"
          value={rotation * (180 / Math.PI)}
          onChange={handleRotationChange}
        />
      </div>
      {getPointPopOver(hoveredPoint!)}
    </div>
  );
};

export default HumanPose;

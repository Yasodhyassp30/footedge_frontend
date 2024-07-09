// src/HumanPose.tsx
import { useEffect, useState } from "react";
import Sketch from "react-p5";
import { SCOUTING_SERVICE_URL } from "../../../constants/scoutingConstants";
import { fetchData } from "../scoutingApis";

const points = [
  { id: 1, name: "leftEar", position: [-20, 200, 0], value: "Left Ear" },
  { id: 2, name: "rightEar", position: [20, 200, 0], value: "Right Ear" },
  { id: 3, name: "leftEye", position: [-10, 210, 0], value: "Left Eye" },
  { id: 4, name: "rightEye", position: [10, 210, 0], value: "Right Eye" },
  { id: 5, name: "mouth", position: [0, 190, 0], value: "Mouth" },
  { id: 6, name: "leftShoulder", position: [-35, 160, 0], value: "Left Shoulder" },
  { id: 7, name: "rightShoulder", position: [35, 160, 0], value: "Right Shoulder" },
  { id: 8, name: "leftWrist", position: [-50, 100, 0], value: "Left Wrist" },
  { id: 9, name: "rightWrist", position: [50, 100, 0], value: "Right Wrist" },
  { id: 10, name: "leftElbow", position: [-45, 130, 0], value: "Left Elbow" },
  { id: 11, name: "rightElbow", position: [45, 130, 0], value: "Right Elbow" },
  { id: 12, name: "leftHip", position: [-30, 90, 0], value: "Left Hip" },
  { id: 13, name: "rightHip", position: [30, 90, 0], value: "Right Hip" },
  { id: 14, name: "leftKnee", position: [-30, 30, 0], value: "Left Knee" },
  { id: 15, name: "rightKnee", position: [30, 30, 0], value: "Right Knee" },
  { id: 16, name: "leftAnkle", position: [-30, -40, 0], value: "Left Ankle" },
  { id: 17, name: "rightAnkle", position: [30, -40, 0], value: "Right Ankle" },
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

const HumanPose = ({ selectedSkill }) => {
  const [latestRequest, setLatestRequest] = useState();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [datIndex, setDataIndex] = useState(null);

  useEffect(() => {
    if (selectedSkill) {
      const callAPI = async () => {
        const url = `${SCOUTING_SERVICE_URL}/scout/66798830bbb733081142f03a?type=SCOUTING`;
        const result = await fetchData(url);
        setLatestRequest(result);
      };

      callAPI();
    }
  }, [selectedSkill]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800, p5.WEBGL).parent(canvasParentRef); // Increased canvas size
  };

  const draw = (p5) => {
    p5.background(200);
    p5.orbitControl();

    // Draw background box
    p5.push();
    p5.noFill();
    p5.stroke(150);
    p5.box(400, 600, 400);
    p5.pop();

    // Draw points
    points.forEach((point) => {
      const { position } = point;
      p5.push();
      p5.translate(position[0], position[1], position[2]);
      p5.fill(255, 0, 0);
      p5.sphere(5);
      p5.pop();
    });

    // Draw lines
    lines.forEach((line) => {
      p5.beginShape();
      line.forEach((pointId) => {
        const point = points.find((p) => p.id === pointId);
        if (point) {
          const { position } = point;
          p5.vertex(position[0], position[1], position[2]);
        }
      });
      p5.endShape();
    });

    if (hoveredPoint && mousePosition) {
      setDataIndex(hoveredPoint)
    }
  };

  const mouseMoved = (p5) => {
    const x = p5.mouseX - p5.width / 2;
    const y = p5.mouseY - p5.height / 2;

    setMousePosition({ x, y });

    let foundHover = false;
    points.forEach((point) => {
      const { position } = point;
      const distance = p5.dist(x, y, 0, position[0], position[1], position[2]);
      if (distance < 10) {
        setHoveredPoint(point.id);
        foundHover = true;
      }
    });

    if (!foundHover) {
      setHoveredPoint(null);
    }
  };

  return <Sketch setup={setup} draw={draw} mouseMoved={mouseMoved} />;
};

export default HumanPose;
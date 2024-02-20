import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
import CircularProgress from "@mui/material/CircularProgress";
import "./dashboard.css";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import io, { Socket } from "socket.io-client";
import { Container } from "@mui/material";
import NullIndicator from "./components/NullIndicator";
import ScoutingResultsGridComponent from "./components/ScoutingResultGrid";
import ScoutingOptionsGridComponent from "./components/ScoutingContentMainGrid";

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const playerSkills = ["Dribbling", "Agility", "Creativity"];

const temp = [
  {
    id: 0,
    imageUrl: "",
    title: "",
    tooltip: "",
    stats: [],
    link: "",
    videoUrl: "",
  },
  {
    id: 1,
    imageUrl:
      "https://pngimg.com/uploads/football_player/football_player_PNG30.png",
    link: "https://www.youtube.com/watch?v=MNWKSpZRTgU&t=304s",
    videoUrl: "../../assets/scouting/videos/knee_juggling_once-twice.mp4",
    title: "Knee Juggling - Once and Twice Repeat",
    description:
      "Master the art of dribbling using your knees. This skill involves precise control and maneuvering of the ball using the player's knees, adding a unique flair to on-field dribbling.",
    tooltip: "Dribble with finesse using your knees.",
    stats: [
      {
        name: "Player 1",
        overallRating: 85,
        bestMatch: "Championship Final",
        skillRatings: {
          dribbling: 90,
          agility: 85,
          creativity: 80,
        },
      },
      {
        name: "Player 2",
        overallRating: 85,
        bestMatch: "Championship Final",
        skillRatings: {
          dribbling: 90,
          agility: 85,
          creativity: 80,
        },
      },
      // Add more players as needed
    ],
  },
  {
    id: 2,
    imageUrl:
      "https://pngimg.com/uploads/football_player/football_player_PNG30.png",
    title: "Goalkeeping",
    link: "https://www.youtube.com/watch?v=MNWKSpZRTgU&t=304s",
    videoUrl: "",

    description:
      "Become a reliable guardian of the goalpost, blocking shots with precision. Goalkeeping is a crucial skill that requires exceptional shot-stopping abilities, strategic positioning, and efficient distribution.",
    tooltip: "Guard the goalpost with unwavering skill.",
    stats: [
      {
        name: "Goalkeeper Legend",
        overallRating: 92,
        bestMatch: "World Cup Final",
        skillRatings: {
          shotStopping: 95,
          positioning: 90,
          distribution: 88,
        },
      },
      // Add more players as needed
    ],
  },
  // Add more items for different skills
];

const sampleData = {
  totalFrames: 1500,
  timeTaken: 30,
  confidenceValue: 85,
  overallRank: 1,
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

interface VideoFrame {
  // Define the structure of your video frame elements here
  // For example, if each element is a number, you can use number
  // If it's an object, define the object structure
  // Adjust according to the actual structure of your data
  value: number;
}

function ScoutingDashboard() {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [videoFrame, setVideoFrame] = useState<VideoFrame[] | null>(null);
  const [scoutingProgress, setScoutingProgress] = useState<number | null>(null);
  const [frameCount, setFrameCount] = useState<number | null>(null);
  const [scoutingProgressPlayerStat, setScoutingProgressPlayerStat] =
    useState<PlayerStat | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState({
    fileName: "",
    fileSize: "",
  });

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    if (socket) {
      // Listen for 'payload_received' event from the server
      socket.on("payload_received", (payload) => {
        setScoutingProgress(payload.index);
        setScoutingProgressPlayerStat(payload.playerStat);
        setVideoFrame(payload.video);
        setFrameCount(payload.frameCount)
      });

      // Listen for 'final_message_from_server' event from the server
      socket.on("final_message_from_server", () => {
        console.log("Received final message from the server");
        // Add your logic to handle the final message here
        // Disconnect the socket if needed
        socket.disconnect();
        setSocket(null);
      });

      return () => {
        // Clean up event listeners when component is unmounted
        socket.disconnect();
      };
    }
  }, [socket]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "video/mp4") {
        if (videoSrc) {
          URL.revokeObjectURL(videoSrc);
        }
        const videoUrl = URL.createObjectURL(file);
        setVideoDetails({
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2),
        });
        cancelSourceRef.current = axios.CancelToken.source();
        setVideoSrc(videoUrl);

        const formData = new FormData();
        formData.append("file", file);

        try {
          const response: AxiosResponse = await axios.post(
            "http://localhost:5000/api/uploadScouting",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded / progressEvent.total!) * 100
                );
                setUploadProgress(progress);
              },
              cancelToken: cancelSourceRef.current.token,
            }
          );

          if (response.status === 200) {
            console.log("File uploaded successfully");
            const receivedId = response.data.id;
            const newSocket = io(`http://localhost:5000/`);
            newSocket.on("connect", () => {
              newSocket.emit("join_room", { roomId: receivedId });
              newSocket.emit("start_processing", {
                video_path: receivedId,
                type: "SCOUTING",
                videoType: selectedTypeId,
              });
              setScoutingProgress(0);
              console.log(
                `Connected to Socket.IO channel for ID: ${receivedId}`
              );
            });
            setSocket(newSocket);
          } else {
            console.error("File upload failed");
          }
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      } else {
        setVideoSrc(null);
      }
    } else {
      setVideoSrc(null);
    }
  };
  const handleCancelUpload = () => {
    if (cancelSourceRef.current) {
      cancelSourceRef.current.cancel("Upload canceled by user");
    }
    setUploadProgress(0);
  };

  const onItemSelect = (index: number) => {
    setSelectedTypeId(index + 1);
  };

  interface Player {
    name: string;
    overallRating: number;
    bestMatch: string;
    skillRatings: Record<string, number>; // Dynamic keys based on playerSkills
  }

  const renderPlayerStats = (player: Player) => {
    return (
      <div key={player.name} className="player-stats-container">
        <h3>{player.name}</h3>
        <p>Overall Rating: {player.overallRating}</p>
        <p>Best Match: {player.bestMatch}</p>
        <p>Skill Ratings:</p>
        <ul>
          {playerSkills.map((skill) => (
            <li key={skill}>
              {skill}: {player.skillRatings[skill]}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  console.log(videoFrame?.length, videoFrame);
  return (
    <Container>
      <div className="dashboard_main">
        <div className="upload_section">
          {videoSrc && (
            <div className="video_section">
              <ReactPlayer
                url={videoSrc}
                controls
                width="640px"
                height="auto"
              />
              <div className="video_details">
                <h2>Details</h2>
                <h4>Filename: {videoDetails.fileName}</h4>
                <h4>File size: {videoDetails.fileSize}MB</h4>
                {selectedTypeId ? (
                  <h4>Traget Skill: {temp[selectedTypeId].title}</h4>
                ) : null}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      alignItems: "start",
                      display: "flex",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {scoutingProgress === null && (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={
                (uploadProgress > 0 && uploadProgress < 100) || !selectedTypeId
              }
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept="video/mp4"
                onChange={(event) => {
                  handleFileChange(event);
                }}
              />
            </Button>
          )}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Button
              sx={{
                margin: "10px",
              }}
              component="label"
              variant="contained"
              startIcon={<CancelIcon />}
              color="error"
            >
              Cancel
            </Button>
          )}
        </div>

        {selectedTypeId && scoutingProgress !== null ? (
          <div className="progress-bar-main">
            <BorderLinearProgress
              variant="determinate"
              value={scoutingProgress}
            />
            <div className="progress-bar-main value">{scoutingProgress}%</div>
          </div>
        ) : null}
        <div>
          {videoFrame && (
            // Render the video frame in your React component
            <img
              src={`data:image/png;base64,${videoFrame[0]}`}
              alt="Video Frame"
              style={{ width: "1000px", height: "auto" }}
            />
          )}
        </div>

        <div className="grid-container-main">
          {selectedTypeId ? (
            <div
              className="grid-item-main"
              onClick={() => setSelectedTypeId(0)}
              onKeyDown={(e) => console.log(e)}
              style={{
                backgroundImage: `url(${temp[selectedTypeId].imageUrl})`,
              }}
            >
              <div className="grid-content-main">
                <h3 className="title-main">{temp[selectedTypeId].title}</h3>
                <span className="tooltip-main">
                  {temp[selectedTypeId].tooltip}
                </span>
              </div>
            </div>
          ) : (
            <NullIndicator
              message="Nothing to show"
              subMessage="Please select an item from below to start scouting."
            />
          )}
        </div>

        {scoutingProgressPlayerStat ? (
          <div className="grid-container-main">
            <div className="grid-item">
              <div className="grid-content">
                <h3 className="title">Analytics</h3>
                <span className="tooltip">
                  Total Number of Frames: {frameCount}
                </span>
                <span className="tooltip">
                  Time Taken: {sampleData.timeTaken} seconds
                </span>
                <span className="tooltip">
                  Confidence Value: {sampleData.confidenceValue}%
                </span>
                <span className="tooltip">
                  Overall Rank: {sampleData.overallRank}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {!selectedTypeId && (
          <ScoutingOptionsGridComponent
            tilesData={temp.slice(1)}
            onItemSelect={onItemSelect}
          />
        )}

        {scoutingProgressPlayerStat && (
          <ScoutingResultsGridComponent
            playerStat={scoutingProgressPlayerStat}
            onItemSelect={onItemSelect}
          />
        )}
      </div>
    </Container>
  );
}

export default ScoutingDashboard;

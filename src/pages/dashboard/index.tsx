import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
import CircularProgress from "@mui/material/CircularProgress";
import "./dashboard.css";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import io, { Socket } from "socket.io-client";
import TeamActivity from "./components/teamActivity";
import { Container } from "@mui/material";


const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

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

function Dashboard() {
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
      socket.on("final_message_from_server", (data) => {
        socket.disconnect()
        setSocket(null)
      });
      return () => {
        socket.disconnect()
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
        formData.append("type", "TACTICAL");  

        try {
          const response: AxiosResponse = await axios.post(
            "http://localhost:5000/api/upload",
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
              newSocket.emit("start_processing", { video_path: receivedId,  type: 'TACTICAL'  });
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
  return (
    <Container maxWidth="lg">
    <div className="dashboard_main">
      <div className="upload_section">
        {videoSrc && (
          <div className="video_section">
            <ReactPlayer url={videoSrc} controls width="640px" height="auto" />
            <div className="video_details">
              <h2>Details</h2>
              <h4>Filename: {videoDetails.fileName}</h4>
              <h4>File size: {videoDetails.fileSize}MB</h4>
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
        
      </div>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={uploadProgress > 0 && uploadProgress < 100}
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

      <TeamActivity socket={socket} url={videoSrc} />
    </div>
    </Container>
  );
}

export default Dashboard;

import { Grid, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import Soccerfield from './soccerfield';

interface TeamActivityProps {
    socket: Socket | null;
  }
interface ImageData {
    frame: string[];
    topview: string[];
    kde1: string[];
    kde2: string[];
  }
const TeamActivity: React.FC<TeamActivityProps> = ({ socket }) => {
    const [imageData, setImageData] = useState<ImageData>({
        frame: [],
        topview: [],
        kde1: [],
        kde2: [],
      });
      const [slider,setSlider] =useState<number>(0)
    useEffect(() => {
        if (socket) {
          socket.on("message_from_server", (data) => {
    
            const  imageBase64_frame = data.frame;
            setImageData(prevState => ({ ...prevState, frame: [...prevState.frame, `data:image/jpeg;base64, ${imageBase64_frame}`] }));
            
            const imageBase64_topview = data.topview;
            setImageData(prevState => ({ ...prevState, topview: [...prevState.topview, `data:image/jpeg;base64, ${imageBase64_topview}`] }));
            
            const imageBase64_team1 = data.kde_team1;
            setImageData(prevState => ({ ...prevState, kde1: [...prevState.kde1, `data:image/jpeg;base64, ${imageBase64_team1}`] }));
            
            const imageBase64_team2 = data.kde_team2;
            
            setImageData(prevState => ({ ...prevState, kde2: [...prevState.kde2, `data:image/jpeg;base64, ${imageBase64_team2}`] }));
            if (imageData.frame.length==1){
              setSlider(1)
            }
          });
        }
      }, [socket]);
  return (
    <div>
              <Grid container spacing={0}>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
        {imageData.frame.length!==0 && (
         <img src={imageData.frame[slider-1]} className="result_image" alt="Received Image1" />
      )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
        {imageData.topview.length!==0  && (
        <img src={imageData.topview[slider-1]} className="result_image" alt="Received Image2" />
      )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
        {imageData.kde1.length!==0 && (
         <img src={imageData.kde1[slider-1]} className="result_image" alt="Received Image3" />
      )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
        {imageData.kde2.length!==0  && (
        <img src={imageData.kde2[slider-1]} className="result_image" alt="Received Image4" />
      )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
          <Soccerfield/>
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
       <Soccerfield/>
        </Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid item xs={10} md={6} sx={{
          width:"100%",
          padding:"10px"
        }}>
          {imageData.frame.length!==0 && <Slider
        aria-label="Temperature"
        defaultValue={slider}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={imageData.frame.length}
        onChange={(e,val)=>{setSlider(Number(val))}}
      />}
        </Grid>
      </Grid>
    </div>
  )
}

export default TeamActivity
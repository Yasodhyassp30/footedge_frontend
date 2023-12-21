import { Grid, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';
import Soccerfield from './soccerfield';

interface TeamActivityProps {
    socket: Socket | null;
  }
export interface players{
  team:number,
  color:number[],
  coordinates:number[]
}
interface ImageData {
    frame: string[];
    info: players[][];
  }
const TeamActivity: React.FC<TeamActivityProps> = ({ socket }) => {
    const [imageData, setImageData] = useState<ImageData>({
        frame: [],
        info: []
      });
      const [slider,setSlider] =useState<number>(0)
    useEffect(() => {
        if (socket) {
          socket.on("message_from_server", (data) => {
            console.log(data)
            setImageData((prevState) => ({
              frame: [...prevState.frame, `data:image/jpeg;base64, ${data.frame}`],
              info: [...prevState.info, data.info],
            }));
            console.log(imageData.info)
            if (imageData.frame.length==1){
              setSlider(1)
            }
          });
        }
      }, [socket]);

      useEffect(() => {
        console.log(imageData.info);
      }, [imageData.info])
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
               {imageData.info[slider-1]!==undefined ? (
          <Soccerfield data={imageData.info[slider-1]} />
        ) : (
          <div></div>
        )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
                {imageData.info[slider-1]!==undefined ? (
          <Soccerfield data={imageData.info[slider-1]} />
        ) : (
          <div></div>
        )}
        </Grid>
        <Grid item xs={12} md={6} sx={{
          minHeight:"320px",
          width:"100%",
          padding:"10px"
        }}>
       {imageData.info[slider-1]!==undefined ? (
          <Soccerfield data={imageData.info[slider-1]} />
        ) : (
          <div></div>
        )}
        </Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid item xs={10} md={6} sx={{
          width:"100%",
          padding:"10px"
        }}>
          {imageData.info.length !==0 && <Slider
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
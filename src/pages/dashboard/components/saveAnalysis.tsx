import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../reducers/combinedReducers';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Snackbar, SnackbarContent, TextField, Typography } from '@mui/material';
import { Save } from '@mui/icons-material';
import axios from 'axios';

export default function SaveAnalysisPopup() {
    const teams = useSelector((state: RootState) => state.tacticalAnalysis.teams);
    const teamPlayers = useSelector((state: RootState) => state.tacticalAnalysis.players);
    const colors = useSelector((state: RootState) => state.tacticalAnalysis.colors);
    const info = useSelector((state: RootState) => state.tacticalAnalysis.info);
    const ball = useSelector((state: RootState) => state.tacticalAnalysis.ball);
    const [snackbar,setSnackbar] = React.useState<boolean>(false);
    const name = React.useRef<HTMLInputElement>(null);
    const [error,setError]  = React.useState<boolean>(false);
    const [namedcount,setNamedList] = React.useState<number>(0);
    const [open,setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const saveAnalysis = async () => {
        let players: { id: string; name: string; color: number[]; positions: any; }[] = [];
        Object.keys(teamPlayers).map((team:string) => {
            let temp:any = [];
            info.forEach((frame) => {
                
                frame.forEach((player) => {
                  if (player.tracker_id === Number(team)) {
                    temp.push(player.coordinates);
                  }
                });
              });
                players.push({
                    id: team,
                    name: teamPlayers[Number(team)].name,
                    color: teamPlayers[Number(team)].color,
                    positions: temp
                });
        })

        try{
            const response = await axios.post("http://localhost:5000/api/analysis",{
                analysis : {
                    teams: teams,
                    colors: colors,
                    players: players
                },
                passings: ball,
                date: new Date(),
                name: name.current?.value
        })
        setOpen(false);
        setSnackbar(true);
        }catch(e){
            console.log(e);
            setError(true);
            setSnackbar(true);
        }
    }

    useEffect(() => {
        let count = 0;
    Object.keys(teamPlayers).map((team:string) => { 
        if(teamPlayers[Number(team)].name=== "") count+=1;
    })
        setNamedList(count);
    }, [teams,teamPlayers,colors])

  return (
    <div>
      <Snackbar open={snackbar} autoHideDuration={6000} anchorOrigin={
        { vertical: 'bottom', horizontal: 'right' }
      } onClose={() => setSnackbar(false)}>
        <Box sx={{ width: 300 }}>
          <SnackbarContent
            sx={{ backgroundColor: error ? "red" : "green" }}
            message={error ? "Error saving analysis" : "Analysis saved successfully"}
          />
        </Box>
      </Snackbar>
         <Button variant="outlined" sx={{
                    color: "green",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                  }} startIcon={<Save />} onClick={handleOpen}>
                  <Typography variant='body1' sx={{
                    fontSize: "12px",
                  }}>Save Analysis</Typography>
                  </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Summery</DialogTitle>
            <DialogContent>
            <Paper
        elevation={1}
        sx={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <div
            style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                backgroundColor: colors[0].length !== 0 ? `rgb(${colors[0][2]},${colors[0][1]},${colors[0][0]})` : "grey",
            }}
        ></div>
        <Typography variant="body1">{teams[0]==""?"Team 1" : teams[0]}</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography variant="body1">{teams[1]==""?"Team 2" : teams[1]}</Typography>
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            backgroundColor: colors[1].length !== 0 ? `rgb(${colors[1][2]},${colors[1][1]},${colors[1][0]})` : "grey",
          }}
        ></div>
         
      </Paper>
      <Typography variant="body2" sx={{
        color: (namedcount===0)?"green":"red",
        fontSize: "14px",
      }}>{
        (namedcount===0)?"All players are named":(namedcount===1)?`${namedcount} player is not named`:`${namedcount} players are not named`
      }</Typography>
      <Typography variant="body2" sx={{
        color: (namedcount===0)?"green":"red",
        fontSize: "12px",
      }}>{(namedcount===0)?"Requirements Satisfied":"Please name all the players before saving the analysis"}</Typography>
      <TextField label="Save as" fullWidth margin="normal" variant="outlined" inputRef={name}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveAnalysis}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  createTheme,
  ThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { PlayerData } from './type'; // Ensure the correct path
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d47a1', // Dark blue
    },
    secondary: {
      main: '#29b6f6', // Light blue
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
});

const PlayerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<PlayerData | null>(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/players/players/${id}`)
      .then(response => setPlayer(response.data))
      .catch(error => console.error('Error fetching player data:', error));
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container className="pt-24">
        <Typography variant="h4" className="mb-4 text-md font-bold text-gray-700">
          Player Profile
        </Typography>
        <Card className="mb-4">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt={player.name}
                  src={`data:image/jpeg;base64,${player.image_base64}`} // Use the correct MIME type if different
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="h5">{player.name}</Typography>
                <Typography variant="subtitle1">Age: {player.age}</Typography>
                <Typography variant="subtitle1">Gender: {player.gender}</Typography>
                <Typography variant="subtitle1">Height: {player.height} cm</Typography>
                <Typography variant="subtitle1">Weight: {player.weight} kg</Typography>
                <Typography variant="subtitle1">Club: {player.club}</Typography>
                <Typography variant="subtitle1">Position: {player.position}</Typography>
                <Typography variant="subtitle1">Nationality: {player.nationality}</Typography>
                <Typography variant="subtitle1">Date of Birth: {player.dob}</Typography>
                <Typography variant="subtitle1">Preferred Foot: {player.preferredFoot}</Typography>
                <Typography variant="subtitle1">Player Number: {player.playerNumber}</Typography>
                <Typography variant="subtitle1">Email: {player.email}</Typography>
                <Typography variant="subtitle1">Phone: {player.phone}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="physical-attributes-content" id="physical-attributes-header">
            <Typography>Physical Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Physical Endurance: {player.physicalEndurance}</Typography>
            <Typography variant="body1">Speed: {player.speed}</Typography>
            <Typography variant="body1">Strength: {player.strength}</Typography>
            <Typography variant="body1">Injury History: {player.injuryHistory}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="performance-stats-content" id="performance-stats-header">
            <Typography>Performance Statistics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Matches Played: {player.matchesPlayed}</Typography>
            <Typography variant="body1">Minutes Played: {player.minutesPlayed}</Typography>
            <Typography variant="body1">Goals Scored: {player.goalsScored}</Typography>
            <Typography variant="body1">Assists: {player.assists}</Typography>
            <Typography variant="body1">Shots on Target: {player.shotsOnTarget}</Typography>
            <Typography variant="body1">Pass Accuracy: {player.passAccuracy}</Typography>
            <Typography variant="body1">Dribbles: {player.dribbles}</Typography>
            <Typography variant="body1">Tackles: {player.tackles}</Typography>
            <Typography variant="body1">Interceptions: {player.interceptions}</Typography>
            <Typography variant="body1">Fouls Committed: {player.foulsCommitted}</Typography>
            <Typography variant="body1">Yellow Cards: {player.yellowCards}</Typography>
            <Typography variant="body1">Red Cards: {player.redCards}</Typography>
            <Typography variant="body1">Average Rating: {player.averageRating}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="training-data-content" id="training-data-header">
            <Typography>Training Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Training Sessions: {player.trainingSessions}</Typography>
            <Typography variant="body1">Training Hours: {player.trainingHours}</Typography>
            <Typography variant="body1">Skill Improvement: {player.skillImprovement}</Typography>
            <Typography variant="body1">Coach Feedback: {player.coachFeedback}</Typography>
            {/* Display Training Videos */}
            {/* {player.trainingVideos.length > 0 && (
              <Typography variant="body1" className="mt-2">
                Training Videos:
                {player.trainingVideos.map((video: File, index: number) => (
                  <video key={index} width="200" controls>
                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </Typography>
            )} */}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="achievements-content" id="achievements-header">
            <Typography>Achievements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Awards: {player.awards}</Typography>
            <Typography variant="body1">Trophies: {player.trophies}</Typography>
            <Typography variant="body1">Records: {player.records}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="personal-development-content" id="personal-development-header">
            <Typography>Personal Development</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Education: {player.education}</Typography>
            <Typography variant="body1">Languages Spoken: {player.languagesSpoken}</Typography>
            <Typography variant="body1">Hobbies: {player.hobbies}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="technical-skills-content" id="technical-skills-header">
            <Typography>Technical Skills</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Ball Control: {player.ballControl}/10</Typography>
            <Typography variant="body1">Passing: {player.passing}/10</Typography>
            <Typography variant="body1">Shooting: {player.shooting}/10</Typography>
            <Typography variant="body1">Defending: {player.defending}/10</Typography>
            <Typography variant="body1">Tactical Awareness: {player.tacticalAwareness}/10</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="psychological-attributes-content" id="psychological-attributes-header">
            <Typography>Psychological Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Mental Toughness: {player.mentalToughness}/10</Typography>
            <Typography variant="body1">Leadership: {player.leadership}/10</Typography>
            <Typography variant="body1">Teamwork: {player.teamwork}/10</Typography>
            <Typography variant="body1">Decision Making: {player.decisionMaking}/10</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="social-media-content" id="social-media-header">
            <Typography>Social Media & Public Relations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">Social Media Handles: {player.socialMediaHandles}</Typography>
            <Typography variant="body1">Public Appearances: {player.publicAppearances}</Typography>
            <Typography variant="body1">Fan Engagement: {player.fanEngagement}</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </ThemeProvider>
  );
};

export default PlayerProfile;


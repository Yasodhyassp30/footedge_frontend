// src/Players.tsx
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Grid, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
// import theme from './theme';
import { styled } from '@mui/material/styles';
// import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';

interface Player {
  _id: string;
  name: string;
  age: number;
  club: string;
  position: string;
  gender: string;
  age_group: string;
  image_url: string;
  image_base64: string;
}

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

const StyledFormControl = styled(FormControl)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0d47a1',
    },
    '&:hover fieldset': {
      borderColor: '#29b6f6',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#29b6f6',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiSelect-icon': {
    color: '#ffffff',
  },
});


const Players: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [ageGroupFilter, setAgeGroupFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  useEffect(() => {
    // Fetch players from the API
    axios.get('http://127.0.0.1:5000/api/players/players').then(response => {
      setPlayers(response.data);
    });
  }, []);

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genderFilter ? player.gender === genderFilter : true) &&
    (ageGroupFilter ? player.age_group === ageGroupFilter : true) &&
    (positionFilter ? player.position === positionFilter : true)
  );

   return (
   <ThemeProvider theme={theme}>
    <div style={{
         width: "100%",
         height: "100%",
         position:"fixed",
         top:0,
         left:0, 
         backgroundColor:"#9DB2BF",
         zIndex:-1
      }}>

      </div>
      <Container className='pt-24'>
      <Grid container spacing={2} alignItems="center" className="mb-4">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search Players"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputLabelProps={{
                style: { color: '#ffffff' }, // Color the label
              }}
              InputProps={{
                style: { color: '#ffffff' }, // Color the text field
              }}
              className="bg-gray-400 rounded-lg"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth variant="outlined" className="bg-gray-400  rounded-lg">
              <InputLabel style={{ color: '#ffffff' }}>Gender</InputLabel>
              <Select
                name="gender"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                style={{ color: '#ffffff' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth variant="outlined" className="bg-gray-400  rounded-lg">
              <InputLabel style={{ color: '#ffffff' }}>Age Group</InputLabel>
              <Select
                name="age_group"
                value={ageGroupFilter}
                onChange={(e) => setAgeGroupFilter(e.target.value)}
                style={{ color: '#ffffff' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="U16">U16</MenuItem>
                <MenuItem value="U18">U18</MenuItem>
                <MenuItem value="U20">U20</MenuItem>
                <MenuItem value="U23">U23</MenuItem>
                <MenuItem value="National">National</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth variant="outlined" className="bg-gray-400  rounded-lg">
              <InputLabel style={{ color: '#ffffff' }}>Position</InputLabel>
              <Select
                name="position"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                style={{ color: '#ffffff' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Forward">Forward</MenuItem>
                <MenuItem value="Midfielder">Midfielder</MenuItem>
                <MenuItem value="Defender">Defender</MenuItem>
                <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add-player"
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Add New Player
            </Button>
          </Grid>
        </Grid>
        
        <Grid container spacing={3}>
          {filteredPlayers.map((player) => (
            <Grid item xs={12} sm={6} md={4} key={player._id}>
              <Card className="bg-gray-800">
                <CardMedia
                component="img"
                height="140"
                image={`data:image/jpeg;base64,${player.image_base64}`}
                alt={`${player.name}`}
              />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ color: '#ffffff' }}>
                    {player.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {player.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Club: {player.club}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Position: {player.position}
                  </Typography>
                  <Button
                    // variant="outlined"
                    // color="primary"
                    component={Link}
                    to={`/add-player/${player._id}`}
                    className="mt-2"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Players;

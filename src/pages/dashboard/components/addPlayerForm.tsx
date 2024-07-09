// // src/AddPlayer.tsx
// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Grid,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   createTheme,
//   ThemeProvider
// } from '@mui/material';
// import { ExpandMore } from '@mui/icons-material';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
 
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#0d47a1', // Dark blue
//     },
//     secondary: {
//       main: '#29b6f6', // Light blue
//     },
//     background: {
//       default: '#303030',
//       paper: '#424242',
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#bbbbbb',
//     },
//   },
// });

// const AddPlayer: React.FC = () => {
//   const navigate = useNavigate();
//   const [playerData, setPlayerData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     height: '',
//     weight: '',
//     club: '',
//     position: '',
//     nationality: '',
//     dob: '',
//     preferredFoot: '',
//     playerNumber: '',
//     email: '',
//     phone: '',
//     physicalEndurance: '',
//     speed: '',
//     strength: '',
//     injuryHistory: '',
//     matchesPlayed: '',
//     minutesPlayed: '',
//     goalsScored: '',
//     assists: '',
//     shotsOnTarget: '',
//     passAccuracy: '',
//     dribbles: '',
//     tackles: '',
//     interceptions: '',
//     foulsCommitted: '',
//     yellowCards: '',
//     redCards: '',
//     averageRating: '',
//     trainingSessions: '',
//     trainingHours: '',
//     skillImprovement: '',
//     coachFeedback: '',
//     awards: '',
//     trophies: '',
//     records: '',
//     education: '',
//     languagesSpoken: '',
//     hobbies: '',
//     ballControl: '',
//     passing: '',
//     shooting: '',
//     defending: '',
//     tacticalAwareness: '',
//     mentalToughness: '',
//     leadership: '',
//     teamwork: '',
//     decisionMaking: '',
//     socialMediaHandles: '',
//     publicAppearances: '',
//     fanEngagement: '',
//     image: null as File | null,
//     trainingVideos: [] as File[],
//     heatmaps: '',
//     passMaps: '',
//     shotMaps: '',
//     keyMoments: ''
//   });
// const [loading, setLoading] = useState(false);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setPlayerData({
//       ...playerData,
//       [name]: value
//     });
//   };

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setPlayerData({
//       ...playerData,
//       [name as string]: value
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setPlayerData({
//         ...playerData,
//         image: e.target.files[0]
//       });
//     }
//   };

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setPlayerData({
//         ...playerData,
//         trainingVideos: files
//       });
//     }
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);

//   const formData = new FormData();
//   (Object.keys(playerData) as Array<keyof typeof playerData>).forEach((key) => {
//     if (key === 'trainingVideos') {
//       playerData.trainingVideos.forEach((video) => {
//         formData.append('trainingVideos', video);
//       });
//     } else if (playerData[key] !== null) {
//       formData.append(key, playerData[key] as string | Blob);
//     }
//   });

//   try {
//     const response = await axios.post('http://127.0.0.1:5000/api/players/add_player', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     setLoading(false);
//     toast.success(response.data.message);
//    navigate('/');
//   } catch (error) {
//     setLoading(false);
//     toast.error('An error occurred while adding the player profile.');
//   }
// };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container className="pt-24">
//         <Typography variant="h4" className="mb-4 text-md font-bold text-gray-700">
//           Add New Player
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="basic-info-content" id="basic-info-header">
//               <Typography>Basic Information</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Name"
//                     name="name"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.name}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Age</InputLabel>
//                     <Select
//                       name="age"
//                       value={playerData.age}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="16">16</MenuItem>
//                       <MenuItem value="18">18</MenuItem>
//                       <MenuItem value="20">20</MenuItem>
//                       <MenuItem value="23">23</MenuItem>
//                       <MenuItem value="National">National</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Gender</InputLabel>
//                     <Select
//                       name="gender"
//                       value={playerData.gender}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="Male">Male</MenuItem>
//                       <MenuItem value="Female">Female</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Height (cm)"
//                     name="height"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.height}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Weight (kg)"
//                     name="weight"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.weight}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Club"
//                     name="club"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.club}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Position"
//                     name="position"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.position}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Nationality"
//                     name="nationality"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.nationality}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Date of Birth"
//                     name="dob"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.dob}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Preferred Foot</InputLabel>
//                     <Select
//                       name="preferredFoot"
//                       value={playerData.preferredFoot}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="Left">Left</MenuItem>
//                       <MenuItem value="Right">Right</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Player Number"
//                     name="playerNumber"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.playerNumber}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Email"
//                     name="email"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.email}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Phone"
//                     name="phone"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.phone}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                <Grid item xs={12} sm={6}>
//                   <label className="block text-gray-500 font-bold mb-1 pr-4">
//                     Upload Player Image:
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="physical-attributes-content" id="physical-attributes-header">
//               <Typography>Physical Attributes</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Physical Endurance</InputLabel>
//                     <Select
//                       name="physicalEndurance"
//                       value={playerData.physicalEndurance}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="High">High</MenuItem>
//                       <MenuItem value="Medium">Medium</MenuItem>
//                       <MenuItem value="Low">Low</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Speed</InputLabel>
//                     <Select
//                       name="speed"
//                       value={playerData.speed}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="Fast">Fast</MenuItem>
//                       <MenuItem value="Average">Average</MenuItem>
//                       <MenuItem value="Slow">Slow</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
//                     <InputLabel>Strength</InputLabel>
//                     <Select
//                       name="strength"
//                       value={playerData.strength}
//                       onChange={handleSelectChange}
//                       style={{ color: '#ffffff' }}
//                     >
//                       <MenuItem value="Strong">Strong</MenuItem>
//                       <MenuItem value="Average">Average</MenuItem>
//                       <MenuItem value="Weak">Weak</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Injury History"
//                     name="injuryHistory"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.injuryHistory}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="performance-stats-content" id="performance-stats-header">
//               <Typography>Performance Statistics (Advanced Analytics)</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Matches Played"
//                     name="matchesPlayed"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.matchesPlayed}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Minutes Played"
//                     name="minutesPlayed"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.minutesPlayed}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Goals Scored"
//                     name="goalsScored"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.goalsScored}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Assists"
//                     name="assists"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.assists}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Shots on Target (%)"
//                     name="shotsOnTarget"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.shotsOnTarget}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Pass Accuracy (%)"
//                     name="passAccuracy"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.passAccuracy}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Dribbles"
//                     name="dribbles"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.dribbles}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Tackles"
//                     name="tackles"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.tackles}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Interceptions"
//                     name="interceptions"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.interceptions}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Fouls Committed"
//                     name="foulsCommitted"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.foulsCommitted}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Yellow Cards"
//                     name="yellowCards"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.yellowCards}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Red Cards"
//                     name="redCards"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.redCards}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Average Rating"
//                     name="averageRating"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.averageRating}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="training-data-content" id="training-data-header">
//               <Typography>Training Data</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Training Sessions"
//                     name="trainingSessions"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.trainingSessions}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Training Hours"
//                     name="trainingHours"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.trainingHours}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Skill Improvement"
//                     name="skillImprovement"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.skillImprovement}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Coach Feedback"
//                     name="coachFeedback"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.coachFeedback}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <label className="block text-gray-500 font-bold mb-1 pr-4">
//                     Upload Training Videos:
//                   </label>
//                   <input
//                     type="file"
//                     name="trainingVideos"
//                     multiple
//                     accept="video/*"
//                     onChange={handleVideoChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="achievements-content" id="achievements-header">
//               <Typography>Achievements</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Awards"
//                     name="awards"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.awards}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Trophies"
//                     name="trophies"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.trophies}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Records"
//                     name="records"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.records}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="personal-development-content" id="personal-development-header">
//               <Typography>Personal Development</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Education"
//                     name="education"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.education}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Languages Spoken"
//                     name="languagesSpoken"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.languagesSpoken}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Hobbies"
//                     name="hobbies"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.hobbies}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="technical-skills-content" id="technical-skills-header">
//               <Typography>Technical Skills</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Ball Control (out of 10)"
//                     name="ballControl"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.ballControl}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Passing (out of 10)"
//                     name="passing"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.passing}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Shooting (out of 10)"
//                     name="shooting"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.shooting}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Defending (out of 10)"
//                     name="defending"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.defending}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Tactical Awareness (out of 10)"
//                     name="tacticalAwareness"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.tacticalAwareness}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="psychological-attributes-content" id="psychological-attributes-header">
//               <Typography>Psychological Attributes</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Mental Toughness (out of 10)"
//                     name="mentalToughness"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.mentalToughness}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Leadership (out of 10)"
//                     name="leadership"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.leadership}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Teamwork (out of 10)"
//                     name="teamwork"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.teamwork}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Decision Making (out of 10)"
//                     name="decisionMaking"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.decisionMaking}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />} aria-controls="social-media-content" id="social-media-header">
//               <Typography>Social Media & Public Relations</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Social Media Handles"
//                     name="socialMediaHandles"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.socialMediaHandles}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Public Appearances"
//                     name="publicAppearances"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.publicAppearances}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Fan Engagement"
//                     name="fanEngagement"
//                     variant="outlined"
//                     fullWidth
//                     value={playerData.fanEngagement}
//                     onChange={handleChange}
//                     className="bg-gray-200 rounded-lg"
//                   />
//                 </Grid>
//               </Grid>
//             </AccordionDetails>
//           </Accordion>

//           <Grid item xs={12} sm={4} md={3} lg={2} className="pt-12">
//   <Button type="submit" variant="contained" color="primary" fullWidth={false} className="w-full sm:w-auto">
//     Save Player Profile
//   </Button>
// </Grid>

//         </form>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default AddPlayer;

import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      primary: '#000000', // Black text color
      secondary: '#000000', // Black text color
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#000000', // Black text color for input fields
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#000000', // Black text color for labels
        },
      },
    },
  },
});

const AddPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [playerData, setPlayerData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    club: '',
    position: '',
    nationality: '',
    dob: '',
    preferredFoot: '',
    playerNumber: '',
    email: '',
    phone: '',
    physicalEndurance: '',
    speed: '',
    strength: '',
    injuryHistory: '',
    matchesPlayed: '',
    minutesPlayed: '',
    goalsScored: '',
    assists: '',
    shotsOnTarget: '',
    passAccuracy: '',
    dribbles: '',
    tackles: '',
    interceptions: '',
    foulsCommitted: '',
    yellowCards: '',
    redCards: '',
    averageRating: '',
    trainingSessions: '',
    trainingHours: '',
    skillImprovement: '',
    coachFeedback: '',
    awards: '',
    trophies: '',
    records: '',
    education: '',
    languagesSpoken: '',
    hobbies: '',
    ballControl: '',
    passing: '',
    shooting: '',
    defending: '',
    tacticalAwareness: '',
    mentalToughness: '',
    leadership: '',
    teamwork: '',
    decisionMaking: '',
    socialMediaHandles: '',
    publicAppearances: '',
    fanEngagement: '',
    image: null as File | null,
    trainingVideos: [] as File[],
    heatmaps: '',
    passMaps: '',
    shotMaps: '',
    keyMoments: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:5000/api/players/players/${id}`)
        .then(response => setPlayerData(response.data))
        .catch(error => console.error('Error fetching player data:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name as string]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPlayerData({
        ...playerData,
        image: e.target.files[0]
      });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPlayerData({
        ...playerData,
        trainingVideos: files
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    (Object.keys(playerData) as Array<keyof typeof playerData>).forEach((key) => {
      if (key === 'trainingVideos') {
        playerData.trainingVideos.forEach((video) => {
          formData.append('trainingVideos', video);
        });
      } else if (playerData[key] !== null) {
        formData.append(key, playerData[key] as string | Blob);
      }
    });

    try {
      let response;
      if (id) {
        response = await axios.put(`http://127.0.0.1:5000/api/players/update_player/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success(response.data.message);
      } else {
        response = await axios.post('http://127.0.0.1:5000/api/players/add_player', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success(response.data.message);
      }
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred while adding/updating the player profile.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="pt-24 text-black-500">
        <Typography variant="h4" className="mb-4 text-md font-bold text-gray-700">
          {id ? 'Update Player Profile' : 'Add New Player'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="basic-info-content" id="basic-info-header">
              <Typography>Basic Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={playerData.name}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Age</InputLabel>
                    <Select
                      name="age"
                      value={playerData.age}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="16">16</MenuItem>
                      <MenuItem value="18">18</MenuItem>
                      <MenuItem value="20">20</MenuItem>
                      <MenuItem value="23">23</MenuItem>
                      <MenuItem value="National">National</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={playerData.gender}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Height (cm)"
                    name="height"
                    variant="outlined"
                    fullWidth
                    value={playerData.height}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Weight (kg)"
                    name="weight"
                    variant="outlined"
                    fullWidth
                    value={playerData.weight}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Club"
                    name="club"
                    variant="outlined"
                    fullWidth
                    value={playerData.club}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position"
                    name="position"
                    variant="outlined"
                    fullWidth
                    value={playerData.position}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nationality"
                    name="nationality"
                    variant="outlined"
                    fullWidth
                    value={playerData.nationality}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    variant="outlined"
                    fullWidth
                    value={playerData.dob}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Preferred Foot</InputLabel>
                    <Select
                      name="preferredFoot"
                      value={playerData.preferredFoot}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="Left">Left</MenuItem>
                      <MenuItem value="Right">Right</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Player Number"
                    name="playerNumber"
                    variant="outlined"
                    fullWidth
                    value={playerData.playerNumber}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={playerData.email}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    value={playerData.phone}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
               <Grid item xs={12} sm={6}>
                  <label className="block text-gray-500 font-bold mb-1 pr-4">
                    Upload Player Image:
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="physical-attributes-content" id="physical-attributes-header">
              <Typography>Physical Attributes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Physical Endurance</InputLabel>
                    <Select
                      name="physicalEndurance"
                      value={playerData.physicalEndurance}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Speed</InputLabel>
                    <Select
                      name="speed"
                      value={playerData.speed}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="Fast">Fast</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Slow">Slow</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" className="bg-gray-200 rounded-lg">
                    <InputLabel>Strength</InputLabel>
                    <Select
                      name="strength"
                      value={playerData.strength}
                      onChange={handleSelectChange}
                      style={{ color: '#000000' }}
                    >
                      <MenuItem value="Strong">Strong</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Weak">Weak</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Injury History"
                    name="injuryHistory"
                    variant="outlined"
                    fullWidth
                    value={playerData.injuryHistory}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="performance-stats-content" id="performance-stats-header">
              <Typography>Performance Statistics (Advanced Analytics)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Matches Played"
                    name="matchesPlayed"
                    variant="outlined"
                    fullWidth
                    value={playerData.matchesPlayed}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Minutes Played"
                    name="minutesPlayed"
                    variant="outlined"
                    fullWidth
                    value={playerData.minutesPlayed}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Goals Scored"
                    name="goalsScored"
                    variant="outlined"
                    fullWidth
                    value={playerData.goalsScored}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Assists"
                    name="assists"
                    variant="outlined"
                    fullWidth
                    value={playerData.assists}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Shots on Target (%)"
                    name="shotsOnTarget"
                    variant="outlined"
                    fullWidth
                    value={playerData.shotsOnTarget}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pass Accuracy (%)"
                    name="passAccuracy"
                    variant="outlined"
                    fullWidth
                    value={playerData.passAccuracy}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Dribbles"
                    name="dribbles"
                    variant="outlined"
                    fullWidth
                    value={playerData.dribbles}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tackles"
                    name="tackles"
                    variant="outlined"
                    fullWidth
                    value={playerData.tackles}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Interceptions"
                    name="interceptions"
                    variant="outlined"
                    fullWidth
                    value={playerData.interceptions}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fouls Committed"
                    name="foulsCommitted"
                    variant="outlined"
                    fullWidth
                    value={playerData.foulsCommitted}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Yellow Cards"
                    name="yellowCards"
                    variant="outlined"
                    fullWidth
                    value={playerData.yellowCards}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Red Cards"
                    name="redCards"
                    variant="outlined"
                    fullWidth
                    value={playerData.redCards}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Average Rating"
                    name="averageRating"
                    variant="outlined"
                    fullWidth
                    value={playerData.averageRating}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="training-data-content" id="training-data-header">
              <Typography>Training Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Training Sessions"
                    name="trainingSessions"
                    variant="outlined"
                    fullWidth
                    value={playerData.trainingSessions}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Training Hours"
                    name="trainingHours"
                    variant="outlined"
                    fullWidth
                    value={playerData.trainingHours}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Skill Improvement"
                    name="skillImprovement"
                    variant="outlined"
                    fullWidth
                    value={playerData.skillImprovement}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Coach Feedback"
                    name="coachFeedback"
                    variant="outlined"
                    fullWidth
                    value={playerData.coachFeedback}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label className="block text-gray-500 font-bold mb-1 pr-4">
                    Upload Training Videos:
                  </label>
                  <input
                    type="file"
                    name="trainingVideos"
                    multiple
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="achievements-content" id="achievements-header">
              <Typography>Achievements</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Awards"
                    name="awards"
                    variant="outlined"
                    fullWidth
                    value={playerData.awards}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Trophies"
                    name="trophies"
                    variant="outlined"
                    fullWidth
                    value={playerData.trophies}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Records"
                    name="records"
                    variant="outlined"
                    fullWidth
                    value={playerData.records}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="personal-development-content" id="personal-development-header">
              <Typography>Personal Development</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Education"
                    name="education"
                    variant="outlined"
                    fullWidth
                    value={playerData.education}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Languages Spoken"
                    name="languagesSpoken"
                    variant="outlined"
                    fullWidth
                    value={playerData.languagesSpoken}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Hobbies"
                    name="hobbies"
                    variant="outlined"
                    fullWidth
                    value={playerData.hobbies}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="technical-skills-content" id="technical-skills-header">
              <Typography>Technical Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Ball Control (out of 10)"
                    name="ballControl"
                    variant="outlined"
                    fullWidth
                    value={playerData.ballControl}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Passing (out of 10)"
                    name="passing"
                    variant="outlined"
                    fullWidth
                    value={playerData.passing}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Shooting (out of 10)"
                    name="shooting"
                    variant="outlined"
                    fullWidth
                    value={playerData.shooting}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Defending (out of 10)"
                    name="defending"
                    variant="outlined"
                    fullWidth
                    value={playerData.defending}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tactical Awareness (out of 10)"
                    name="tacticalAwareness"
                    variant="outlined"
                    fullWidth
                    value={playerData.tacticalAwareness}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="psychological-attributes-content" id="psychological-attributes-header">
              <Typography>Psychological Attributes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mental Toughness (out of 10)"
                    name="mentalToughness"
                    variant="outlined"
                    fullWidth
                    value={playerData.mentalToughness}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Leadership (out of 10)"
                    name="leadership"
                    variant="outlined"
                    fullWidth
                    value={playerData.leadership}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Teamwork (out of 10)"
                    name="teamwork"
                    variant="outlined"
                    fullWidth
                    value={playerData.teamwork}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Decision Making (out of 10)"
                    name="decisionMaking"
                    variant="outlined"
                    fullWidth
                    value={playerData.decisionMaking}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="social-media-content" id="social-media-header">
              <Typography>Social Media & Public Relations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Social Media Handles"
                    name="socialMediaHandles"
                    variant="outlined"
                    fullWidth
                    value={playerData.socialMediaHandles}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Public Appearances"
                    name="publicAppearances"
                    variant="outlined"
                    fullWidth
                    value={playerData.publicAppearances}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Fan Engagement"
                    name="fanEngagement"
                    variant="outlined"
                    fullWidth
                    value={playerData.fanEngagement}
                    onChange={handleChange}
                    className="bg-gray-200 rounded-lg"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Grid item xs={12} sm={4} md={3} lg={2} className="pt-12">
  <Button type="submit" variant="contained" color="primary" fullWidth={false} className="w-full sm:w-auto">
    {id ? 'Update Player Profile' : 'Save Player Profile'}
  </Button>
</Grid>

        </form>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
};

export default AddPlayer;

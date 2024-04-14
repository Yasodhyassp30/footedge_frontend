import { Button, Container, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Lock } from '@mui/icons-material';




export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const  email = useRef<HTMLInputElement>(null);
    const  password = useRef<HTMLInputElement>(null);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <Container maxWidth="lg" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    
    }}>
        <FormControl>
            <Typography variant="h5">
               <Lock/> Login
            </Typography>
            <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                inputRef={email}
                required
                fullWidth
            />

            <TextField
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                inputRef={password}
                required
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                                aria-label="toggle password visibility"
                                edge="end"
                            >
                                {
                                    showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                }
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    marginTop: "1rem",
                }}
                onClick={()=>{}}
            >
                Login
            </Button>
            <Link href="/register" sx={{
                textDecoration: "none",
                marginTop: "1rem",
            }}>Don't have an account? Register</Link>
            
        </FormControl>
        
        </Container>
  )
}

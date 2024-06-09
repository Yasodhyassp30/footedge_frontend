import { Lock } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Container, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../../reducers/authReducer';




export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const  email = useRef<HTMLInputElement>(null);
    const  password = useRef<HTMLInputElement>(null);
    const [error, setError] = React.useState("");
    const dispatch = useDispatch(); 

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if(email.current?.value && password.current?.value){
            setError("")
           try{
            const response = await axios.post("http://localhost:5000/users/login", {
                email: email.current.value,
                password: password.current.value
            })

            console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))
            dispatch(authSlice.actions.login())
            navigate('/dashboard');
           }catch(err){
               console.log(err)
           }

        }else{
            setError("All fields are required")
        }
    }

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
            <Typography variant="body2" sx={{
                color: "red"
            }}>{error}</Typography>
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
                onClick={handleLogin}
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

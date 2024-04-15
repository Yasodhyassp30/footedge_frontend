import { Button, Container, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { People } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../reducers/authReducer';


export default function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    const  email = useRef<HTMLInputElement>(null);
    const  password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);
    const [error, setError] = React.useState("");
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        if(password.current?.value !== confirmPassword.current?.value){
            setError("Password does not match")
        }else if(email.current?.value && password.current?.value && confirmPassword.current?.value){
            setError("")
           try{
            const response = await axios.post("http://localhost:5000/api/register", {
                email: email.current.value,
                password: password.current.value
            })

            localStorage.setItem("user", JSON.stringify(response.data))
            dispatch(authSlice.actions.login())
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
               <People/> Register
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

<TextField
                id="confirm password"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                inputRef={confirmPassword}
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
                onClick={handleRegister}
            >
                Register 
            </Button>
            <Link href="/register" sx={{
                textDecoration: "none",
                marginTop: "1rem",
            }}>Already User? Login</Link>
            
        </FormControl>
        
        </Container>
  )
}

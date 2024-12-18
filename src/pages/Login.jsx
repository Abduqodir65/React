import { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login as loginAction } from "../store/authSlice";
import { loginService } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {    
        const userData = await loginService(username,password)
        dispatch(loginAction({
            user: userData,
            token: userData.accessToken
        }))
        navigate("/")

    } catch (error) {
        consol.log(error)
    }
    
  };

  return (
    <Container maxWidth='xs'>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant='h5'>Sign In</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            type='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

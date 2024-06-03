import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../data/Login';
import { useAuth } from '../../context/AuthProvider';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        loading: false
    });

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            error: ''
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });
        try {
            const response = await login(state.email, state.password);
            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data;
                setAuth({ email: state.email, accessToken, refreshToken });
                navigate('/');
            } else {
                setState({ ...state, error: response?.data?.message || 'Login Failed', loading: false });
            }
        } catch (err) {
            setState({
                ...state,
                error: err.response.status === 401 ? "Wrong email or password" : err.message || 'No Server Response',
                loading: false
            });
        }
    };

    const renderTextField = (name, label, type) => (
        <TextField
            required
            fullWidth
            margin="normal"
            color="secondary"
            type={type}
            name={name}
            label={label}
            value={state[name]}
            onChange={handleInputChange}
        />
    );

    return (
        <Grid
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "90vh",
                width:"50vh",
                pl:3,
                pr:3,
                margin: 'auto'
            }}>
            <CssBaseline/>
            <Box sx={{}}>
                <Typography component="h1" variant="h4" color="#8C1CEC">
                    Log in
                </Typography>
                <Box component="form" onSubmit={handleLogin}>
                    {renderTextField("email", "Username", "email")}
                    {renderTextField("password", "Password", "password")}
                    <span style={{color: 'red', fontSize: "small"}}>{state.error}</span>
                    <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor:"#8C1CEC", mt:2}}
                        disabled={state.loading}>
                        {state.loading ? 'Logging In...' : 'Log in'}
                    </Button>
                    <Grid container sx={{p:1}}>
                        <Grid item>
                            <Link onClick={() => navigate("/signup")} variant="body2" sx={{color:"#32CBE4", cursor:"default"}}>
                                {"Don't have an account yet? Sign up!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}

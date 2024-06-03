import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { signup } from "../../data/Login";
import CustomDialog from "../../components/CustomDialog";

export default function Signup() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        navigate("/login", { replace: true });
    };

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
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

    const handlePasswordBlur = () => {
        let passwordMatchError = "";
        let passwordRequirementsError = "";

        if (state.password !== state.repeatPassword && state.password !== "" && state.repeatPassword !== "") {
            passwordMatchError = "Passwords do not match";
        }

        // Password rules
        const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(state.password) && state.password !== "") {
            passwordRequirementsError = "Password must have at least one non-alphanumeric character, one digit, and one uppercase letter.";
        }

        // Set the error message based on conditions
        if (passwordMatchError && passwordRequirementsError) {
            setState({ ...state, error: `${passwordMatchError}. ${passwordRequirementsError}` });
        } else if (passwordMatchError) {
            setState({ ...state, error: passwordMatchError });
        } else if (passwordRequirementsError) {
            setState({ ...state, error: passwordRequirementsError });
        } else {
            setState({ ...state, error: "" });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (state.password !== state.repeatPassword) {
            setState({ ...state, error: "Passwords do not match" });
            return;
        }

        if (state.error !== "") {
            return;
        }

        setState({ ...state, loading: true });
        try {
            const response = await signup(state.name, state.email, state.password);


            if (response.status === 200) {
                setOpen(true);
            } else {
                setState({ ...state, error: response?.data?.message || 'Signup Failed', loading: false });
            }
        } catch (err) {
            if (err.response.status === 400) {
                setState({ ...state, error: "Account with this email already exists", loading: false });
            } else {
                setState({ ...state, error: 'No Server Response', loading: false });
            }
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
            onBlur={name === 'password' || name === 'repeatPassword' ? handlePasswordBlur : null}
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
            <CustomDialog open={open} handleClose={handleClose}  content={"Account created successfully. You can now login"}  />
            <CssBaseline/>
            <Box sx={{}}>
                <Typography component="h1" variant="h4" color="#8C1CEC">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSignup}>
                    {renderTextField("name", "Name", "text")}
                    {renderTextField("email", "Email", "email")}
                    {renderTextField("password", "Password", "password")}
                    {renderTextField("repeatPassword", "Repeat password", "password")}
                    <span style={{color: 'red', fontSize:"small"}}>{state.error}</span>
                    <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        size="large"
                        sx={{mt: 3, mb: 2, backgroundColor: "#8C1CEC"}}
                        disabled={state.loading}>
                        {state.loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link onClick={() => navigate("/login")} variant="body2"
                                  sx={{color: "#32CBE4", cursor: "default"}}>
                                {"Already have an account? Log in"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}

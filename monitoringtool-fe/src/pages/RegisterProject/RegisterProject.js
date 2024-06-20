import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function RegisterProject({onClose}) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        url: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const msTempReg = await axios.post("https://curler-hlfxsphkja-ew.a.run.app/api/URLsChecker", {},{
                params: {
                    url:formData.url,
                    name:formData.name,
                },
            });
            const response = await axios.post('http://localhost:8085/projects', formData);
            if (response.status === 200) {
                alert('Project registered successfully!');
                onClose();
            } else {
                setError(response.data.message || 'Registration Failed');
            }

           



        } catch (err) {
            setError(err.response?.data?.message || 'No Server Response');
        }
        setLoading(false);
    };

    return (
        // <Grid
        //     container
        //     sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         maxHeight: '70vh',
        //         padding: '0 24px',
        //         margin: 'auto',
        //     }}
        // >
        //     <CssBaseline />
            <Box
                sx={{
                    // width: '100%',
                    // maxWidth: '400px',
                    padding: '24px',
                    // backgroundColor: 'white',
                    borderRadius: '8px',
                    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography component="h1" variant="h4" color="#8C1CEC" gutterBottom>
                    Register Project
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>

                    <FormControl fullWidth margin="normal" color="secondary">
                        <InputLabel>Project Type</InputLabel>
                        <Select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            label="Project Type"
                        >
                            <MenuItem value="Sentry" disabled>Sentry</MenuItem>
                            <MenuItem value="Curler">Curler</MenuItem>
                        </Select>
                    </FormControl>
                    
                    
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        color="secondary"
                        name="name"
                        label="Project Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        color="secondary"
                        name="organization"
                        label="Organization"
                        value={formData.organization}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        color="secondary"
                        name="url"
                        label="Project URL"
                        type="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                    {error && (
                        <Typography variant="body2" color="error" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        color="secondary"
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: '#8C1CEC', marginTop: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                    <Grid container sx={{ paddingTop: 1 }}>
                        {/*<Grid item>*/}
                        {/*    <Link*/}
                        {/*        onClick={() => navigate('/')}*/}
                        {/*        variant="body2"*/}
                        {/*        sx={{ color: '#32CBE4', cursor: 'pointer' }}*/}
                        {/*    >*/}
                        {/*        {'Go back to homepage'}*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Box>
            </Box>
        // </Grid>
    );
}

import React, {useEffect, useState} from 'react';
import { TextField, Button, Grid, Box, Dialog, DialogContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tabs, Tab, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAuth} from "../context/AuthProvider";
import {addOrganization, deleteOrganization, GetOrganizations} from "../data/DeploymentsService";


export default function OrganizationForm() {
    const [organizationID, setOrganizationID] = useState("");
    const [integrationToken, setIntegrationToken] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [tab, setTab] = useState(0);
    const { authState } = useAuth();
    console.log(organizations)
    useEffect(() => {
        const fetchOrganizations = async () => {
            const orgs = await GetOrganizations(authState.token);
            console.log("orgs", orgs)
            setOrganizations(orgs);
        };

        fetchOrganizations();
    }, []);

    console.log(organizations)


    const handleDelete = async (id) => {

        await deleteOrganization(authState.token, id);
        const updatedOrganizations = await GetOrganizations(authState.token);
        setOrganizations(updatedOrganizations);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const status = await addOrganization(authState.token, { organizationsID : organizationID, integrationToken });
        if (status === 200) {
            setOrganizations( await GetOrganizations(authState.token));
            setIntegrationToken("");
            setTab(0);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Grid
            sx={{
                display: "flex",
                minHeight: "50vh",
                width:"100%",
                pl:3,
                pr:3,
            }}>
            <CssBaseline/>
            <Box sx={{width:"100%",}}>
                <Tabs value={tab} onChange={handleTabChange} >
                    <Tab label="Organizations" />
                    <Tab label="Add Organization" />
                </Tabs>
                {tab === 0 && (
                    organizations.length > 0 ? (
                        <List sx={{width:"100%"}}>
                            {organizations && organizations.map((organization, index) => (

                                <ListItem key={index}>
                                    <ListItemText color={"black"} primary={organization.organizationsID} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(organization.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="h6" align="center" sx={{pt:3}}>No organizations found</Typography>
                    )
                )}
                {tab === 1 && (
                    <Box component="form" onSubmit={handleSubmit} sx={{  display: "flex", flexDirection:"column",
                        justifyContent: "center", width:"100%", height:"90%",
                        alignItems: "center",}} >
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            color="secondary"
                            label="Organization ID"
                            value={organizationID}
                            onChange={(e) => setOrganizationID(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            margin="normal"
                            color="secondary"
                            label="Integration Token"
                            value={integrationToken}
                            onChange={(e) => setIntegrationToken(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            size="large"
                            sx={{ backgroundColor:"#8C1CEC", mt:2}}>
                            Add Organization
                        </Button>
                    </Box>
                )}
            </Box>
        </Grid>
    );
}
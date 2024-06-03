import {Tabs, Tab, createMuiTheme, ThemeProvider, Dialog, DialogTitle, DialogContent} from "@mui/material";
import React, { useState } from 'react';
import SentryTab from "./SentryTab";
import CurlerTab from "./CurlerTab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RegisterProject from "../RegisterProject/RegisterProject";
import AllTab from "./AllTab";

const theme = createMuiTheme({
    palette:{
        primary:{
            main: '#8C1CEC'
        }
    }
})

export default function ProjectsPage() {
    const [tabIndex, setTabIndex] =
        React.useState(parseInt(localStorage.getItem('tabIndex')) || 0);
    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
        localStorage.setItem('tabIndex', newValue);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };


    return (
        <ThemeProvider  theme={theme}>
            <Box sx={{flexDirection:"row", justifyContent:"space-between", display:"flex"}}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="simple tabs example">
                    <Tab
                        label="All"
                    />
                    <Tab
                        label="Sentry"
                    />
                    <Tab
                        label="Curler"
                    />
                </Tabs>
                <Button variant="outlined" sx={{mr:3}}  onClick={handleOpen}>Register project</Button>
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>

                <DialogContent>
                    <RegisterProject onClose={handleClose} />
                </DialogContent>
            </Dialog>

            {tabIndex === 0 && <AllTab />}
            {tabIndex === 1 && <SentryTab />}
            {tabIndex === 2 && <CurlerTab />}
        </ThemeProvider>
    );
}

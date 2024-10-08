import FilterSection from "../../components/FilterSection";
import DeploymentsList from "../../components/DeploymentsList";
import React, {useCallback, useEffect, useState} from "react";
import {
    getSentryProjectsFiltered
} from "../../data/DeploymentsService";
import Loader from "../../components/common/Loader";
import Box from "@mui/material/Box";
import SentryCard from "../../components/SentryCard";
import {useAuth} from "../../context/AuthProvider";
import {getSavedFilterSettings, updateFilterSettings} from "../../data/Helpers";
import {Dialog, DialogContent} from "@mui/material";
import Button from "@mui/material/Button";
import OrganizationForm from "../../components/OrganizationForm";
import Paper from "@mui/material/Paper";

export default function SentryTab() {
    const [filterSettings, setFilterSettings] = useState(getSavedFilterSettings('sentryFilterSettings'));
    const [deploymentsData, setDeploymentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { authState } = useAuth();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const updateData = useCallback((updates) => {
        setFilterSettings(prevState => ({ ...prevState, ...updates }));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await updateFilterSettings(filterSettings, 'sentryFilterSettings');
                const fetchedData = await getSentryProjectsFiltered(authState.token);
                console.log(fetchedData);
                setDeploymentsData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [filterSettings]);


    return (
        <Box component="main" sx={{
            display: "flex",
            justifyContent: "flex-start", flexDirection: "row",
            alignItems: "bottom", maxHeight: "90vh", overflow: 'auto',
        }}>
            <Box sx={{
                mr: "auto",
                height: "80vh",
                flexBasis: "20%",
                flexGrow: 1,
                flexDirection: "column",
                maxWidth:"15%",
                justifyContent: "space-between"
            }}>
                <Box sx={{overflowY: 'auto', flexGrow: 1, height: "80vh",
                    m: 1,
                    p: 1,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start", width:"90%",
                    flexDirection: "column",}}>
                    <FilterSection filterOptions={filterSettings} updateData={updateData} />
                </Box>

                <Box sx={{ display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column", height: "3vh",flexBasis: "20%", flexGrow: 1,   m: 1,
                    p: 1, minWidth: "15%" }}>
                    <Button onClick={handleOpen}>Sentry Organizations</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                        <DialogContent>
                            <OrganizationForm />
                        </DialogContent>
                    </Dialog>
                </Box>

            </Box>

            {isLoading ? (
                <Paper sx={{
                    width: "100%",
                    height: "85vh",
                    m: 1,
                    p: 1,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Loader isLoading={true}/>
                </Paper>
            ) : (
                <DeploymentsList ProjectComponent={SentryCard}  data={deploymentsData}/>
            )}
        </Box>



    );
}

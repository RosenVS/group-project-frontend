import React, {useCallback, useEffect, useState} from "react";
import {getSavedFilterSettings, updateFilterSettings} from "../../data/Helpers";
import {useAuth} from "../../context/AuthProvider";
import Box from "@mui/material/Box";
import FilterSection from "../../components/FilterSection";
import Loader from "../../components/common/Loader";
import DeploymentsList from "../../components/DeploymentsList";
import PingCard from "../../components/PingCard";
import {getCurlerProjectsFiltered} from "../../data/PingService";
import {Dialog, DialogContent} from "@mui/material";
import RegisterProject from "../RegisterProject/RegisterProject";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function CurlerTab() {
    const [filterSettings, setFilterSettings] = useState(getSavedFilterSettings('curlerFilterSettings'));
    const [deploymentsData, setDeploymentsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { authState } = useAuth();
    const updateData = useCallback((updates) => {
        setFilterSettings(prevState => ({ ...prevState, ...updates }));
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await updateFilterSettings(filterSettings, 'curlerFilterSettings');
                const fetchedData = await getCurlerProjectsFiltered(authState.token);
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
                // minWidth: "15%",
                flexDirection: "column",
                maxWidth:"15%",
                justifyContent: "space-between"
            }}>
                <Box sx={{overflowY: 'auto', flexGrow: 1, height: "85vh",
                    m: 1, width:"90%",
                    p: 1,
                    border: "1px solid black",
                   }}>
                <FilterSection filterOptions={filterSettings} updateData={updateData} />
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
                <DeploymentsList ProjectComponent={PingCard}  data={deploymentsData}/>
            )}


        </Box>
    );
}
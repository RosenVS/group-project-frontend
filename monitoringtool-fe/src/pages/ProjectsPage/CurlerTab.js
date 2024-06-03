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
            <Box sx={{mr: "auto",   flexBasis: "20%", flexGrow: 1, minWidth: "15%", }}>
                <Box sx={{overflowY: 'auto', flexGrow: 1, height: "85vh",
                    m: 1,
                    p: 1,
                    border: "1px solid black",
                   }}>
                <FilterSection filterOptions={filterSettings} updateData={updateData} />
            </Box>
            </Box>

            {isLoading ? (
                <Loader isLoading={true}/>
            ) : (
                <DeploymentsList ProjectComponent={PingCard}  data={deploymentsData}/>
            )}


        </Box>
    );
}
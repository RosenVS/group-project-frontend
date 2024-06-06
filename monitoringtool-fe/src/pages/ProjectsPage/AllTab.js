import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../components/common/Loader";
import DeploymentsList from "../../components/DeploymentsList";
import {useAuth} from "../../context/AuthProvider";
import {getSentryProjectsFiltered} from "../../data/DeploymentsService";
import {getCurlerProjectsFiltered} from "../../data/PingService";
import PingCard from "../../components/PingCard";
import SentryCard from "../../components/SentryCard";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SortSection from "../../components/SortSection";

export default function AllTab() {
    const [isLoading, setIsLoading] = useState(true);
    const [allProjects, setAllProjects] = useState([]);
    const [sortedProjects, setSortedProjects] = useState([]);
    const [sortMethod, setSortMethod] = useState('newtoOld');
    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    };
    const handleSearch = () => {
        if (searchString === '') {
            setSortedProjects(allProjects);
            return;
        }
        const filteredProjects = allProjects.filter(project =>
            project.name.toLowerCase().includes(searchString.toLowerCase())
        );
        setSortedProjects(filteredProjects);
    };

    const {authState} = useAuth();

    const updateSortMethod = (newSortMethod) => {
        setSortMethod(newSortMethod);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const sentryProjects = await getSentryProjectsFiltered(authState.token);
                const curlerProjects = await getCurlerProjectsFiltered(authState.token);
                let allProjects = [...curlerProjects, ...sentryProjects];
                allProjects.sort((a, b) => {
                    if (a.IsInitializing && !b.IsInitializing) {
                        return -1;
                    }
                    if (!a.IsInitializing && b.IsInitializing) {
                        return 1;
                    }

                    if (!a.isOnline && b.isOnline) {
                        return -1;
                    }
                    if (a.isOnline && !b.isOnline) {
                        return 1;
                    }
                    if (sortMethod === 'newToOld') {
                        // Sort from new to old
                        return new Date(b.latestResponse) - new Date(a.latestResponse);
                    } else if (sortMethod === 'oldToNew') {
                        // Sort from old to new
                        return new Date(a.latestResponse) - new Date(b.latestResponse);
                    }
                });
                setAllProjects(allProjects);
                setSortedProjects(allProjects); // Corrected line
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [sortMethod]);
    return (
        <Box component="main" sx={{
            display: "flex",
            justifyContent: "flex-start", flexDirection: "row",
            alignItems: "bottom", maxHeight: "90vh", overflow: 'auto', width:"100vw"
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
                    m: 1,
                    p: 1,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",}}>
                    <TextField
                        sx={{ p: 1, m: 1,  width: "90%",  '& .MuiInputBase-root': { height: '40px'  } }}
                        id="search"
                        label="Search"
                        variant="outlined"
                        value={searchString}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <SortSection updateSortMethod={updateSortMethod} />
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
                <DeploymentsList
                    data={sortedProjects}
                    ProjectComponent={({projectData}) => {
                        return projectData.type === 'sentry' ?
                            <SentryCard projectData={projectData}/>
                            :
                            <PingCard projectData={projectData}/>;
                    }}
                />
            )}
        </Box>
    );
}


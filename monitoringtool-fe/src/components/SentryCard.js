import {Card, CardContent, Dialog, DialogContent, TextareaAutosize} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import React, {useState} from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {getSentryIssues, getSentryProjectsFiltered} from "../data/DeploymentsService";
import {useAuth} from "../context/AuthProvider";
import Button from "@mui/material/Button";
import IssueCard from "./IssueCard";
import {updateFilterSettings} from "../data/Helpers";
import Paper from "@mui/material/Paper";
import Loader from "./common/Loader";
import DeploymentsList from "./DeploymentsList";

export default function SentryCard ({projectData}){
    const {name, slug,  organization,  platform} = projectData;
    const { authState } = useAuth();
    const [issues,setIssues] = useState([]);
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const handleOpen = () => {

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedData = await getSentryIssues(authState.accessToken, organization, name);
                console.log("fetched issues", fetchedData)
                setIssues(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
              setIsLoading(false);
            }
        };
        // fetch isssues
        setOpen(true);
        fetchData();

    };

    const handleClose = () => {
        setOpen(false);

    };
    return(
        <Card sx={{
            width: "100%",
            minHeight: "70px",
            mt: 1,
            boxShadow: 2,
            borderRadius: 1,
            bgcolor: 'background.default',
            overflow: 'hidden'
        }}>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                <DialogContent>
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button autoFocus onClick={handleClose}
                                style={{maxHeight:40, maxWidth:50}} variant={"outlined"}>X</Button>
                    </div>
                    <Box>

                        {isLoading ? (
                            <Paper sx={{
                                width: "100%",
                                height: "85vh",
                                m: 1,
                                p: 1,

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}>
                                <Loader isLoading={true}/>
                            </Paper>
                        ) : (
                            issues ? issues.map((issue) => {
                                return <IssueCard issueData={issue} key={issue.id}/>
                            })
                                :
                             <Typography variant="h6" color="text.primary" sx={{ p: 1 }}> No issues detected </Typography>
                        )}



                    </Box>

                </DialogContent>
            </Dialog>
            <CardContent sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                p: 2,
            }}   onClick={handleOpen} >
                <Typography variant="h6" color="text.primary" sx={{ p: 1 }}>
                    {name}
                </Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%",
                    alignItems: "center",
                    gap: 2,
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                        {organization}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
                        {platform}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

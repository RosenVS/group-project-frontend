import {Card, CardContent, Dialog, DialogContent, TextareaAutosize} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, {useEffect, useState} from "react";
import RegisterProject from "../pages/RegisterProject/RegisterProject";
import Button from "@mui/material/Button";

export default function PingCard({key, projectData}){
    const {name, url, isOnline, lastChecked, lastResponse,isInitializing} = projectData;
    const convertToDate = (dateString)=> {
        const date = new Date(dateString);
        return date.toLocaleString();
    }
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    console.log(projectData)
    return (
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
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                      <h4>Last Response:</h4>
                      <Button autoFocus onClick={handleClose}
                              style={{maxHeight:40, maxWidth:30}} variant={"outlined"}>X</Button>
                  </div>
                    <TextareaAutosize style={{width:"100%"}} disabled={true}>{lastResponse}</TextareaAutosize>

                </DialogContent>
            </Dialog>
            <CardContent sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                p: 2,
            }}   onClick={handleOpen}>
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
                        URL: {url}
                    </Typography>
                    {
                        isInitializing
                            ?
                            <RegisterProject fontSize={"large"} sx={{  color: "yellow"}} />
                        :
                            <>


                            {

                                isOnline
                                    ?
                                    <CheckCircleOutlineOutlinedIcon fontSize={"large"} sx={{  color: "green"}} />
                                    :
                                    <>
                                        <Typography variant="body2" color="text.secondary" sx={{  pb:3, }}>
                                            Last successful ping: {convertToDate(lastChecked)}
                                        </Typography>
                                        <CancelOutlinedIcon  fontSize={"large"} sx={{  color: "red"}} />
                                    </>
                            }

                        </>

                    }
                </Box>
            </CardContent>
        </Card>
    )
}

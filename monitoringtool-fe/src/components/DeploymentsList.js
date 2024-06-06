import {Paper} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export default function DeploymentsList({data,  ProjectComponent}){
    data.map(projectData => console.log(projectData));
    console.log("Deployments list", data);
    return(
        <Paper sx={{
            width: "100%",
            height: "85vh",
            m: 1,
            p: 1,
            border: "1px solid black",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
        }}>
            <Box sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                {
                    data.map( projectData  => (
                        <ProjectComponent projectData={projectData} />
                    ))
                }
            </Box>
        </Paper>
    )
}

import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export default function SentryCard ({projectData}){
    const {name, organization,  platform} = projectData;

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
            <CardContent sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "90%",
                p: 2,
            }}>
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

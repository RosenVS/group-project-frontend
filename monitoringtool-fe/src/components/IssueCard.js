import { Card, CardContent, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React from "react";

export default function IssueCard({ issueData }) {
    const { id, title, level, status, firstSeen, lastSeen, count, userCount, platform, culprit } = issueData;

    let StatusIcon;
    switch(level) {
        case 'error':
            StatusIcon = ErrorOutlineIcon;
            break;
        case 'warning':
            StatusIcon = WarningIcon;
            break;
        default:
            StatusIcon = ErrorOutlineIcon;
    }

    return (
        <Card sx={{ width: "100%", mt: 1, boxShadow: 2, borderRadius: 1, bgcolor: 'background.default' }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" color="text.primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <StatusIcon /> {culprit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <PeopleOutlineIcon /> Affected Users: {userCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <CalendarTodayIcon /> First Seen: {new Date(firstSeen).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <CalendarTodayIcon /> Last Seen: {new Date(lastSeen).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Platform: {platform}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {status}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
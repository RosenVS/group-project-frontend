import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Box from "@mui/material/Box";

export default function SortSection({ updateSortMethod }) {
    const handleSortChange = (event) => {
        updateSortMethod(event.target.value);
    };



    return (
        <Box sx={{display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", width:"100%"}}>
            <FormControl variant="standard"  sx={{width:"90%", display:"flex", justifyContent:"center", alignItems:"canter"}}>
                <InputLabel id="sort-label">Sort by</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort"
                    fullWidth
                    onChange={handleSortChange}
                    defaultValue="newToOld"
                >
                    <MenuItem value="newToOld">From New to Old</MenuItem>
                    <MenuItem value="oldToNew">From Old to New</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
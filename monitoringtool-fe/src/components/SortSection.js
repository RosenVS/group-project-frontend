import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Box from "@mui/material/Box";

export default function SortSection({ updateSortMethod, updateFailingOnTop }) {
    const handleSortChange = (event) => {
        updateSortMethod(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        updateFailingOnTop(event.target.checked);
    };

    return (
        <Box sx={{display:"flex", flexDirection:"row",
            alignItems:"space-between", justifyContent:"space-between", width:"100%", }}>
            {/*<FormControlLabel*/}
            {/*    control={*/}
            {/*        <Checkbox*/}
            {/*            onChange={handleCheckboxChange}*/}
            {/*            name="failingOnTop"*/}
            {/*            color="primary"*/}
            {/*        />*/}
            {/*    }*/}
            {/*    label="See failing"*/}
            {/*/>*/}
            <FormControl variant="standard">
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
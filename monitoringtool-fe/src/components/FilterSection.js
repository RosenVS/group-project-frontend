import React, {useCallback, useState} from 'react';
import FilterComponent from "./FilterComponent";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const FilterSection = ({ filterOptions, updateData }) => {
    const [searchString, setSearchString] = useState(filterOptions.search);
    const [filters, setFilter] = useState((Array.isArray(filterOptions.sortingOptions) && (filterOptions.sortingOptions).length > 0) ? filterOptions.sortingOptions : []);
    const update = useCallback((categoryTitle, updatedOptions) => {
        if(filters.length>0){
            const categoryIndex = filters.findIndex(category => category.title === categoryTitle);
            const newFilters = [...filters];
            newFilters[categoryIndex].options = updatedOptions;
            setFilter(newFilters);
            updateData({ sortingOptions: newFilters });
        }

    }, [filters, updateData]);

    const handleIconClick = (e) => {
        updateData({search:searchString});
    }

    const handleSearchChange = (newSearchString) => {
        setSearchString(newSearchString);
        const newFilters = [...filters];
        setFilter(newFilters);
        updateData({ search: newSearchString, sortingOptions: newFilters });
    }

    return (
        <Box sx={{overflowY:'auto',maxHeight:"100%"}}>
            <TextField
                sx={{ p: 1, m: 1,  width: "90%",  '& .MuiInputBase-root': { height: '40px'  } }}
                id="search"
                label="Search"
                variant="outlined"
                value={searchString}
                onChange={(e) => handleSearchChange(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleIconClick}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Box >


                {
                    (Array.isArray(filters) && filters.length > 0) && filters.map((category) => (
                        <FilterComponent mainTitle={category.title}
                                         data={category.options}
                                         updateData={(updatedOptions) => update(category.title,updatedOptions)} />

                    ))}
            </Box>

        </Box>
    );
};

export default FilterSection;


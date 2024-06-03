import Typography from "@mui/material/Typography";
import {Collapse, FormControlLabel, FormGroup} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";

export default function FilterComponent({data,  updateData, mainTitle}){
    const [allSelected, setAllSelected] = useState(Array.isArray(data) && data.length > 0 ? data.every(el => el.isChecked) : false);
    const [isOpen, setIsOpen] = useState(true);
    const handleChange = (e) => {
        const updatedData = data.map(item =>
            item.title === e.target.value ? { ...item, isChecked: e.target.checked } : item
        );
        const isAllSelected = updatedData.every(el => el.isChecked);
        setAllSelected(isAllSelected);
        updateData(updatedData);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        const updatedData = data.map(item => ({ ...item, isChecked }));
        updateData( updatedData);
        setAllSelected(isChecked);
    };

    return (
        <FormGroup sx={{pl: 1, flexDirection:"column"}} title={mainTitle}>
            <Button onClick={() => setIsOpen(!isOpen)}>
                <Typography variant={"h6"} sx={{ pl: 2, pr: 1, mr:'auto'}}>{mainTitle}</Typography>
            </Button>
            <Collapse in={isOpen} timeout="auto">
                {Array.isArray(data) && data.map(({ title, isChecked }) => (
                    <FormControlLabel
                        key={title}
                        label={title}
                        control={<Checkbox value={title} checked={isChecked} onChange={handleChange} style={{ color: 'inherit' }} />}
                        sx={{ backgroundColor: "white", border: "1px solid black", m: 1, width:"70%"  }}
                    />
                ))}

                <FormControlLabel
                    key={"All"}
                    label={"All"}
                    control={<Checkbox checked={allSelected} onChange={handleSelectAll} style={{ color: 'inherit'}} />}
                    sx={{ backgroundColor: "white", border: "1px solid black", m: 1, width:"70%"  }}
                />
            </Collapse>

        </FormGroup>
    );

}


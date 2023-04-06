import React, { useState } from "react";
import { Typography, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import GetALLSkills from "../../data/skills";

function SkillsForm(){

    const [skills, setSkills] = useState([]);

    const handleChange = (event) => {
        setSkills(event.target.value);
    };

    return(
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <InputLabel id="skills">Skills</InputLabel>
            <Select labelId="skills" value={skills} onChange={handleChange} fullWidth variant="standard" label="Skills" multiple renderValue={(selected) => selected.join(", ")}>
                {GetALLSkills.map((skills) => (
                <MenuItem key={skills} value={skills}>
                {skills}
                </MenuItem>
                ))}
            </Select>
        </Grid>
      </Grid>
    </React.Fragment>
    )
}

export default SkillsForm;
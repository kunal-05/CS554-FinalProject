import React, { useState } from "react";
import { Typography, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import GetALLSkills from "../../data/skills";

function SkillsForm(props) {
    const [skills, setSkills] = useState([]);

    const handleChange = (event) => {
        setSkills(event.target.value);
        props.setSkills(event.target.value);
    };

    const handlePictureUpload = async (e) => {
        const formData = new FormData();
        if (!e.target.files) {
            setFileNoError(false);
            return;
        }
        if (
            e.target.files[0].type !== "image/jpeg" &&
            e.target.files[0].type !== "image/png"
        ) {
            setFileNoError(false);
            return;
        }

        setFileNoError(true);
        formData.append("file", e.target.files[0]);

        //1. send image to API for imagemagick
        const response = await axios.post(
            "http://localhost:4000/users/profilepic",
            formData,
            {
                responseType: "blob",
            }
        );
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Skills
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="skills">Skills</InputLabel>
                    <Select
                        labelid="skills"
                        value={skills}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                        label="Skills"
                        multiple
                        renderValue={(selected) => selected.join(", ")}
                    >
                        {GetALLSkills.map((skills) => (
                            <MenuItem key={skills} value={skills}>
                                {skills}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default SkillsForm;

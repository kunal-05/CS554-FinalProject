import React from "react";
import GetAllEthinicity from "../../data/ethinicity";
import { Typography, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { useState } from "react";

function EmploymentForm(props) {
    const [employment, setEmployment] = useState({
        ethinicity: "",
        gender: "",
        authorizedToWork: "",
        veteranStatus: "",
        disability: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployment({
            ...employment,
            [name]: value,
        });
        props.setEmployment({
            ...employment,
            [name]: value,
        });
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Equal Employment Opportunity
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="ethinicity">Ethinicity</InputLabel>
                    <Select
                        labelid="ethinicity"
                        value={employment.ethinicity}
                        onChange={handleChange}
                        fullWidth
                        variant="standard"
                        label="Ethinicity"
                        name="ethinicity"
                    >
                        {GetAllEthinicity.map((ethinicity) => (
                            <MenuItem key={ethinicity} value={ethinicity}>
                                {ethinicity}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <FormLabel sx={{ pr: "16px" }}>Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={employment.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <FormLabel sx={{ pr: "16px" }}>
                            Are you legally authorized to work in US?
                        </FormLabel>
                        <RadioGroup
                            row
                            name="authorizedToWork"
                            value={employment.authorizedToWork}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <FormLabel sx={{ pr: "16px" }}>
                            Are you a protectected veteran?
                        </FormLabel>
                        <RadioGroup
                            row
                            name="veteranStatus"
                            value={employment.veteranStatus}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <FormLabel sx={{ pr: "16px" }}>Disability</FormLabel>
                        <RadioGroup
                            row
                            name="disability"
                            value={employment.disability}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default EmploymentForm;

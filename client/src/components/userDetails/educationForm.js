import React, { useState } from "react";
import GetAllDegree from "../../data/degree";
import GetAllMajors from "../../data/majors";
import { Grid, TextField, Typography, InputLabel, Select, MenuItem } from "@mui/material";

function EducationForm(){

    const [date, setDate] = useState("");
    const [degree, setDegree] = useState("");
    const [major, setMajor] = useState("");

    const handleChange = (event) => {
        setDegree(event.target.value);
        setMajor(event.target.value);
        setDate(event.target.value);
    };
    return(
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="universityName"
            name="universityName"
            label="University Name"
            fullWidth
            autoComplete="university-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputLabel id="degree">Degree</InputLabel>
            <Select labelId="degree" value={degree} onChange={handleChange} fullWidth variant="standard" label="Degree">
                {GetAllDegree.map((degree) => (
                <MenuItem key={degree} value={degree}>
                {degree}
                </MenuItem>
                ))}
            </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
            <InputLabel id="major">Major</InputLabel>
            <Select labelId="major" value={major} onChange={handleChange} fullWidth variant="standard" label="Major">
                {GetAllMajors.map((major) => (
                <MenuItem key={major} value={major}>
                {major}
                </MenuItem>
                ))}
            </Select>
        </Grid>
        <Grid item xs={12} sx={{mb: -2}}>
            <InputLabel id="duration">Duration</InputLabel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            labelId="duration"
            required
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            autoComplete="start-date"
            variant="standard"
            value={date}
            onChange={handleChange}
            InputLabelProps={{
                shrink: true,
              }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            labelId="duration"
            required
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            autoComplete="end-date"
            variant="standard"
            value={date}
            onChange={handleChange}
            InputLabelProps={{
                shrink: true,
                }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="gpa"
            name="gpa"
            label="GPA"
            type="number"
            fullWidth
            autoComplete="gpa"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
    )
}

export default EducationForm;
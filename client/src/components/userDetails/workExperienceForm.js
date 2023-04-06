import React from "react";
import { Grid, TextField, Typography, InputLabel } from "@mui/material";
import { useState } from "react";

function ExperienceForm(){

    const [date, setDate] = useState('');
      
        const handleChange = (event) => {
          setDate(event.target.value);
        };

    return(
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            fullWidth
            autoComplete="job-title"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Company Name"
            fullWidth
            autoComplete="company-name"
            variant="standard"
          />
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
        <Grid item xs={12}>
          <TextField
            required
            id="jobDescription"
            name="jobDescription"
            label="Job Description"
            fullWidth
            autoComplete="job-description"
            variant="standard"
            multiline
          />
        </Grid>
      </Grid>
    </React.Fragment>
    )
}

export default ExperienceForm;
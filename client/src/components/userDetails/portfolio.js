import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

function Portfolio(){
    return(
        <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Portfolio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            required
            id="githubUrl"
            name="githubUrl"
            label="Github URL"
            fullWidth
            autoComplete="github-url"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="linkedinUrl"
            name="linkedinUrl"
            label="LinkedIn URL"
            fullWidth
            autoComplete="linkedin-URL"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="otherUrl"
            name="otherUrl"
            label="Other URL"
            fullWidth
            autoComplete="other-URL"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
    )
}

export default Portfolio;
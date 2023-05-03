import React, { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

function Portfolio(props) {
    const [portfolioValues, setPortfolioValues] = useState({
        githubUrl: "",
        linkedinUrl: "",
        otherUrl: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPortfolioValues({ ...portfolioValues, [name]: value });
        props.setPortfolio(portfolioValues);
    };

    return (
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
                        value={portfolioValues.githubUrl}
                        onChange={handleChange}
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
                        value={portfolioValues.linkedinUrl}
                        onChange={handleChange}
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
                        value={portfolioValues.otherUrl}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Portfolio;

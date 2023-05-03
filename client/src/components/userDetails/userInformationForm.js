import React, { useState } from "react";
import {
    Typography,
    Grid,
    TextField,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import GetAllCities from "../../data/cities";
import GetAllStates from "../../data/states";
import GetAllCountries from "../../data/countries";

function UserInfoForm(props) {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const userInfo = {
            ...props.userInfo,
            [name]: value,
            city,
            state,
            country,
            date,
        };
        props.setUserInfo(userInfo);
    };

    const handleCityChange = (event) => {
        const userInfo = {
            ...props.userInfo,
            city: event.target.value,
        };
        props.setUserInfo(userInfo);
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        const userInfo = {
            ...props.userInfo,
            state: event.target.value,
        };
        props.setUserInfo(userInfo);
        setState(event.target.value);
    };

    const handleCountryChange = (event) => {
        const userInfo = {
            ...props.userInfo,
            country: event.target.value,
        };
        props.setUserInfo(userInfo);

        setCountry(event.target.value);
    };

    const handleDateChange = (event) => {
        const userInfo = {
            ...props.userInfo,
            date: event.target.value,
        };
        props.setUserInfo(userInfo);

        setDate(event.target.value);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="emailId"
                        name="emailId"
                        label="Email Id"
                        fullWidth
                        autoComplete="email-id"
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="dateOfBirth"
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        fullWidth
                        autoComplete="date-of-birth"
                        variant="standard"
                        value={date}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        labelid="city"
                        value={city}
                        onChange={handleCityChange}
                        fullWidth
                        variant="standard"
                        label="City"
                    >
                        {GetAllCities.map((city) => (
                            <MenuItem key={city} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="state">State</InputLabel>
                    <Select
                        value={state}
                        onChange={handleStateChange}
                        fullWidth
                        variant="standard"
                    >
                        {GetAllStates.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="country">Country</InputLabel>
                    <Select
                        value={country}
                        onChange={handleCountryChange}
                        fullWidth
                        variant="standard"
                    >
                        {GetAllCountries.map((country) => (
                            <MenuItem key={country} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UserInfoForm;

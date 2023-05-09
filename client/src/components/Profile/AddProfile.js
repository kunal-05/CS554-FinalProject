import React, { useState, useContext } from "react";
import {
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    FormLabel,
    Container,
    Typography,
    Paper,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import GetAllCities from "../../data/cities";
import GetAllStates from "../../data/states";
import GetAllCountries from "../../data/countries";
import GetAllDegree from "../../data/degree";
import GetAllMajors from "../../data/majors";
import GetAllEthinicity from "../../data/ethinicity";
import UpdateProfile from "./UpdateProfile";
import {
    checkString,
    checkEmail,
    checkNumber,
    checkZipCode,
    checkSelection,
    checkDate,
    checkUrl,
    compareDate,
} from "../../helpers";
import { AuthContext } from "../../firebase/Auth";

function AddProfile() {
    const theme = createTheme();
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    const userID = currentUser.uid;
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        emailId: currentUser.email,
        date: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    });

    const [workExperience, setWorkExperience] = useState({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        jobDescription: "",
    });

    const [education, setEducation] = useState({
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        gpa: "",
    });

    const [portfolio, setPortfolio] = useState({
        githubUrl: "",
        linkedInUrl: "",
        otherUrl: "",
    });

    const [employment, setEmployment] = useState({
        ethnicity: "",
        gender: "",
        isAuthorized: "",
        protectedVeteran: "",
        disability: "",
    });

    const [profileUrl, setProfileUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Validating all the fields
            checkString(userInfo.firstName, "First Name");
            if (userInfo.lastName && userInfo.lastName.length > 0) {
                checkString(userInfo.lastName, "Last Name");
            }
            checkEmail(userInfo.emailId);
            checkDate(userInfo.date, "Date of Birth");
            checkString(userInfo.address1, "Address 1");
            if (userInfo.address2 && userInfo.address2.length > 0) {
                checkString(userInfo.address2, "Address 2");
            }
            checkSelection(userInfo.city, "City");
            checkSelection(userInfo.state, "State");
            checkZipCode(userInfo.zipCode);
            checkSelection(userInfo.country, "Country");
            checkString(workExperience.jobTitle, "Job Title");
            checkString(workExperience.companyName, "Company Name");
            checkDate(workExperience.startDate, "Work Experience Start Date");
            checkDate(workExperience.endDate, "Work Experience End Date");
            compareDate(
                workExperience.startDate,
                workExperience.endDate,
                "Work Experience"
            );
            checkString(workExperience.jobDescription, "Job Description");
            checkString(education.universityName, "University Name");
            checkSelection(education.degree, "Degree");
            checkSelection(education.major, "Major");
            checkDate(education.startDate, "Education Start Date");
            checkDate(education.endDate, "Education End Date");
            compareDate(education.startDate, education.endDate, "Education");
            checkNumber(education.gpa, "GPA");
            if (portfolio.githubUrl && portfolio.githubUrl.length > 0) {
                checkUrl(portfolio.githubUrl, "Github URL");
            }
            if (portfolio.linkedInUrl && portfolio.linkedInUrl.length > 0) {
                checkUrl(portfolio.linkedInUrl, "LinkedIn URL");
            }
            if (portfolio.otherUrl && portfolio.otherUrl.length > 0) {
                checkUrl(portfolio.otherUrl, "Other URL");
            }
            checkSelection(employment.ethnicity, "Ethnicity");
            checkSelection(employment.gender, "Gender");
            checkSelection(employment.isAuthorized, "Authorization");
            checkSelection(employment.protectedVeteran, "Veteran Status");
            checkSelection(employment.disability, "Disability");
            await UpdateProfile(
                userID,
                userInfo,
                workExperience,
                education,
                portfolio,
                employment
            );
        } catch (e) {
            alert(`${e}`);
        }
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                    >
                        <Typography component="h1" variant="h4" align="center">
                            User Details
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* User Information */}
                                <Grid item xs={12}>
                                    <Typography component="h2" variant="h5">
                                        User Information
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        required
                                        label="First Name"
                                        variant="standard"
                                        fullWidth
                                        value={userInfo.firstName}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                firstName: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        required
                                        label="Last Name"
                                        variant="standard"
                                        fullWidth
                                        value={userInfo.lastName}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="emailId"
                                        name="emailId"
                                        required
                                        label="Email ID"
                                        variant="standard"
                                        fullWidth
                                        value={userInfo.emailId}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                emailId: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="dateofBirth"
                                        name="dateofBirth"
                                        required
                                        label="Date of Birth"
                                        variant="standard"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="mm/dd/yyyy"
                                        value={userInfo.date}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                date: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="address1"
                                        name="address1"
                                        required
                                        label="Address Line 1"
                                        variant="standard"
                                        fullWidth
                                        value={userInfo.address1}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                address1: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="address2"
                                        name="address2"
                                        label="Address Line 2"
                                        variant="standard"
                                        fullWidth
                                        value={userInfo.address2}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                address2: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="city">City</InputLabel>
                                        <Select
                                            labelId="city"
                                            fullWidth
                                            variant="standard"
                                            label="City"
                                            value={userInfo.city}
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    city: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllCities.map((city) => (
                                                <MenuItem
                                                    key={city}
                                                    value={city}
                                                >
                                                    {city}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">
                                            State
                                        </InputLabel>
                                        <Select
                                            labelId="state"
                                            fullWidth
                                            variant="standard"
                                            label="State"
                                            value={userInfo.state}
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    state: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllStates.map((state) => (
                                                <MenuItem
                                                    key={state}
                                                    value={state}
                                                >
                                                    {state}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="zipCode"
                                        name="zipCode"
                                        required
                                        label="Zip Code"
                                        variant="standard"
                                        fullWidth
                                        type="number"
                                        value={userInfo.zipCode}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                zipCode: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="country">
                                            Country
                                        </InputLabel>
                                        <Select
                                            labelId="country"
                                            fullWidth
                                            variant="standard"
                                            label="Country"
                                            id="country"
                                            name="country"
                                            value={userInfo.country}
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    country: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllCountries.map((country) => (
                                                <MenuItem
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Work Experience */}
                                <Grid item xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Work Experience
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="jobTitle"
                                        name="jobTitle"
                                        required
                                        label="Job Title"
                                        variant="standard"
                                        fullWidth
                                        value={workExperience.jobTitle}
                                        onChange={(e) =>
                                            setWorkExperience({
                                                ...workExperience,
                                                jobTitle: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="companyName"
                                        name="companyName"
                                        required
                                        label="Company Name"
                                        variant="standard"
                                        fullWidth
                                        value={workExperience.companyName}
                                        onChange={(e) =>
                                            setWorkExperience({
                                                ...workExperience,
                                                companyName: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ mb: -2 }}>
                                    <InputLabel id="duration">
                                        Duration
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        labelId="duration"
                                        required
                                        id="startDate"
                                        name="startDate"
                                        label="Start Date"
                                        variant="standard"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="mm/dd/yyyy"
                                        value={workExperience.startDate}
                                        onChange={(e) =>
                                            setWorkExperience({
                                                ...workExperience,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        labelId="duration"
                                        id="endDate"
                                        name="endDate"
                                        variant="standard"
                                        required
                                        label="End Date"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="mm/dd/yyyy"
                                        value={workExperience.endDate}
                                        onChange={(e) =>
                                            setWorkExperience({
                                                ...workExperience,
                                                endDate: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="jobDescription"
                                        name="jobDescription"
                                        variant="standard"
                                        required
                                        label="Job Description"
                                        fullWidth
                                        multiline
                                        value={workExperience.jobDescription}
                                        onChange={(e) =>
                                            setWorkExperience({
                                                ...workExperience,
                                                jobDescription: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                {/* Education */}
                                <Grid item xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Education
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="universityName"
                                        name="universityName"
                                        variant="standard"
                                        label="University Name"
                                        fullWidth
                                        value={education.universityName}
                                        onChange={(e) =>
                                            setEducation({
                                                ...education,
                                                universityName: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="degree">
                                            Degree
                                        </InputLabel>
                                        <Select
                                            labelId="degree"
                                            fullWidth
                                            variant="standard"
                                            label="Degree"
                                            id="degree"
                                            name="degree"
                                            value={education.degree}
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    degree: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllDegree.map((degree) => (
                                                <MenuItem
                                                    key={degree}
                                                    value={degree}
                                                >
                                                    {degree}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="major">
                                            Major
                                        </InputLabel>
                                        <Select
                                            labelId="major"
                                            fullWidth
                                            variant="standard"
                                            label="Major"
                                            id="major"
                                            name="major"
                                            value={education.major}
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    major: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllMajors.map((major) => (
                                                <MenuItem
                                                    key={major}
                                                    value={major}
                                                >
                                                    {major}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ mb: -2 }}>
                                    <InputLabel id="Eduduration">
                                        Duration
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        labelId="Eduduration"
                                        id="eduStartDate"
                                        name="eduStartDate"
                                        variant="standard"
                                        label="Start Date"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="mm/dd/yyyy"
                                        value={education.startDate}
                                        onChange={(e) =>
                                            setEducation({
                                                ...education,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        labelId="Eduduration"
                                        id="eduEnddate"
                                        name="eduEnddate"
                                        variant="standard"
                                        required
                                        label="End Date"
                                        fullWidth
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder="mm/dd/yyyy"
                                        value={education.endDate}
                                        onChange={(e) =>
                                            setEducation({
                                                ...education,
                                                endDate: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="gpa"
                                        name="gpa"
                                        variant="standard"
                                        label="GPA"
                                        fullWidth
                                        type="number"
                                        value={education.gpa}
                                        onChange={(e) =>
                                            setEducation({
                                                ...education,
                                                gpa: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                {/* Portfolio */}
                                <Grid item xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Portfolio
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="githubUrl"
                                        name="githubUrl"
                                        variant="standard"
                                        label="GitHub URL"
                                        fullWidth
                                        value={portfolio.githubUrl}
                                        onChange={(e) =>
                                            setPortfolio({
                                                ...portfolio,
                                                githubUrl: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="linkedInUrl"
                                        name="linkedInUrl"
                                        variant="standard"
                                        label="LinkedIn URL"
                                        fullWidth
                                        value={portfolio.linkedInUrl}
                                        onChange={(e) =>
                                            setPortfolio({
                                                ...portfolio,
                                                linkedInUrl: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="otherUrl"
                                        name="otherUrl"
                                        variant="standard"
                                        label="Other URL"
                                        fullWidth
                                        value={portfolio.otherUrl}
                                        onChange={(e) =>
                                            setPortfolio({
                                                ...portfolio,
                                                otherUrl: e.target.value,
                                            })
                                        }
                                    />
                                </Grid>

                                {/* Equal Employment Opportunity */}
                                <Grid item xs={12}>
                                    <Typography component="h2" variant="h5">
                                        Equal Employment Opportunity
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="ethnicitylabel">
                                            Ethnicity
                                        </InputLabel>
                                        <Select
                                            labelId="ethnicitylabel"
                                            fullWidth
                                            variant="standard"
                                            id="ethnicity"
                                            name="ethnicity"
                                            value={employment.ethnicity}
                                            onChange={(e) =>
                                                setEmployment({
                                                    ...employment,
                                                    ethnicity: e.target.value,
                                                })
                                            }
                                        >
                                            {GetAllEthinicity.map(
                                                (ethinicity) => (
                                                    <MenuItem
                                                        key={ethinicity}
                                                        value={ethinicity}
                                                    >
                                                        {ethinicity}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        component="fieldset"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Gender
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            name="gender"
                                            value={employment.gender}
                                            onChange={(e) =>
                                                setEmployment({
                                                    ...employment,
                                                    gender: e.target.value,
                                                })
                                            }
                                        >
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        component="fieldset"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Are you authorized to work?
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="isAuthorized"
                                            name="isAuthorized"
                                            value={employment.isAuthorized}
                                            onChange={(e) =>
                                                setEmployment({
                                                    ...employment,
                                                    isAuthorized:
                                                        e.target.value,
                                                })
                                            }
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
                                        component="fieldset"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Are you a protected Veteran?
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="vetaran"
                                            name="vetaran"
                                            value={employment.protectedVeteran}
                                            onChange={(e) =>
                                                setEmployment({
                                                    ...employment,
                                                    protectedVeteran:
                                                        e.target.value,
                                                })
                                            }
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
                                        component="fieldset"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <FormLabel sx={{ pr: "16px" }}>
                                            Disability
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="disability"
                                            name="disability"
                                            value={employment.disability}
                                            onChange={(e) =>
                                                setEmployment({
                                                    ...employment,
                                                    disability: e.target.value,
                                                })
                                            }
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

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default AddProfile;

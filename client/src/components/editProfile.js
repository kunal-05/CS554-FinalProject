import React, { useState } from "react";
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
import GetAllCities from "../data/cities";
import GetAllStates from "../data/states";
import GetAllCountries from "../data/countries";
import GetAllDegree from "../data/degree";
import GetAllMajors from "../data/majors";
import GetAllEthinicity from "../data/ethinicity";
import UpdateProfile from "./updateProfile";
import app from "../firebase/Firebase";
import UploadImage from "./uploadImage";
import {
    checkString,
    checkEmail,
    checkNumber,
    checkZipCode,
    checkSelection,
    checkDate,
    checkUrl,
    compareDate,
} from "../helpers";

function EditUserDetailsPage() {
    //Create state to fetch existing data
    const [existingData, setExistingData] = useState();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [emailid, setEmailId] = useState("");
    //Create async function to fetch data from firebase
    async function fetchExistingData() {
        const userID = "ee0f933b-ac4f-497a-9403-97fbda392155";
        const userRef = app.firestore().collection("users").doc(userID);
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log("No such document!");
        } else {
            console.log("Document data:", doc.data());
            setExistingData(doc.data());
            setFirstName(doc.data().userInfo.firstName);
            setLastName(doc.data().userInfo.lastName);
            setEmailId(doc.data().userInfo.emailId);
            setUserInfo(doc.data().userInfo);
            setWorkExperience(doc.data().workExperience);
            setEducation(doc.data().education);
            setPortfolio(doc.data().portfolio);
            setEmployment(doc.data().employment);
        }
    }
    //Insert name, lastname and email directly inside unserINfo

    const theme = createTheme();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Validating all the fields
            checkString(userInfo.firstName, "First Name");
            checkString(userInfo.lastName, "Last Name");
            checkEmail(userInfo.emailId);
            checkDate(userInfo.date, "Date of Birth");
            checkString(userInfo.address1, "Address 1");
            checkString(userInfo.address2, "Address 2");
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
            checkUrl(portfolio.githubUrl, "Github URL");
            checkUrl(portfolio.linkedInUrl, "LinkedIn URL");
            checkUrl(portfolio.otherUrl, "Other URL");
            checkSelection(employment.ethnicity, "Ethnicity");
            checkSelection(employment.gender, "Gender");
            checkSelection(employment.isAuthorized, "Authorization");
            checkSelection(employment.protectedVeteran, "Veteran Status");
            checkSelection(employment.disability, "Disability");
            await UpdateProfile(
                userInfo,
                workExperience,
                education,
                portfolio,
                employment
            );
        } catch (e) {
            alert(`Error in submitting the form : ${e}`);
        }
    };

    React.useEffect(() => {
        fetchExistingData();
    }, []);

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
                        {/* <UploadImage
                            userId={"ee0f933b-ac4f-497a-9403-97fbda392155"}
                        /> */}
                        {existingData && (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    {/* User Information */}
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
                                            User Information
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* <TextField
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
                                    /> */}
                                        <Typography variant="body1">
                                            First Name: {firstname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* <TextField
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
                                    /> */}
                                        <Typography variant="body1">
                                            Last Name: {lastname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {/* <TextField
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
                                    /> */}
                                        <Typography variant="body1">
                                            Email ID: {emailid}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {existingData.userInfo.date && (
                                            <TextField
                                                id="dateofBirth"
                                                name="dateofBirth"
                                                required
                                                label="Date of Birth"
                                                variant="standard"
                                                fullWidth
                                                type="date-local"
                                                defaultValue={
                                                    existingData.userInfo.date
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                placeholder="mm/dd/yyyy"
                                                onChange={(e) =>
                                                    setUserInfo({
                                                        ...userInfo,
                                                        date:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .userInfo
                                                                      .date,
                                                    })
                                                }
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="address1"
                                            name="address1"
                                            required
                                            label="Address Line 1"
                                            variant="standard"
                                            fullWidth
                                            defaultValue={
                                                existingData.userInfo.address1
                                            }
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    address1:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .userInfo
                                                                  .address1,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="address2"
                                            name="address2"
                                            required
                                            label="Address Line 2"
                                            variant="standard"
                                            fullWidth
                                            defaultValue={
                                                existingData.userInfo.address2
                                            }
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    address2:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .userInfo
                                                                  .address2,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="city">
                                                City
                                            </InputLabel>
                                            <Select
                                                labelId="city"
                                                fullWidth
                                                variant="standard"
                                                label="City"
                                                defaultValue={
                                                    existingData.userInfo.city
                                                }
                                                onChange={(e) =>
                                                    setUserInfo({
                                                        ...userInfo,
                                                        city:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .userInfo
                                                                      .city,
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
                                                defaultValue={
                                                    existingData.userInfo.state
                                                }
                                                onChange={(e) =>
                                                    setUserInfo({
                                                        ...userInfo,
                                                        state:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .userInfo
                                                                      .state,
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
                                            type="string"
                                            variant="standard"
                                            fullWidth
                                            defaultValue={
                                                existingData.userInfo.zipCode
                                            }
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    zipCode:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .userInfo
                                                                  .zipCode,
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
                                                defaultValue={
                                                    existingData.userInfo
                                                        .country
                                                }
                                                onChange={(e) =>
                                                    setUserInfo({
                                                        ...userInfo,
                                                        country:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .userInfo
                                                                      .country,
                                                    })
                                                }
                                            >
                                                {GetAllCountries.map(
                                                    (country) => (
                                                        <MenuItem
                                                            key={country}
                                                            value={country}
                                                        >
                                                            {country}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Work Experience */}
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
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
                                            defaultValue={
                                                existingData.workExperience
                                                    .jobTitle
                                            }
                                            onChange={(e) =>
                                                setWorkExperience({
                                                    ...workExperience,
                                                    jobTitle:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .workExperience
                                                                  .jobTitle,
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
                                            defaultValue={
                                                existingData.workExperience
                                                    .companyName
                                            }
                                            onChange={(e) =>
                                                setWorkExperience({
                                                    ...workExperience,
                                                    companyName:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .workExperience
                                                                  .companyName,
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
                                        {console.log("Start Date:")}
                                        {console.log(
                                            existingData.workExperience
                                                .startDate
                                        )}
                                        <TextField
                                            id="startDate"
                                            name="startDate"
                                            required
                                            label="Start Date"
                                            variant="standard"
                                            fullWidth
                                            type="date-local"
                                            defaultValue={
                                                existingData.workExperience
                                                    .startDate
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="mm/dd/yyyy"
                                            onChange={(e) =>
                                                setWorkExperience({
                                                    ...workExperience,
                                                    startDate:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .workExperience
                                                                  .startDate,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="endDate"
                                            name="endDate"
                                            required
                                            label="End Date"
                                            variant="standard"
                                            fullWidth
                                            type="date-local"
                                            defaultValue={
                                                existingData.workExperience
                                                    .endDate
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="mm/dd/yyyy"
                                            onChange={(e) =>
                                                setWorkExperience({
                                                    ...workExperience,
                                                    endDate:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .workExperience
                                                                  .endDate,
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
                                            defaultValue={
                                                existingData.workExperience
                                                    .jobDescription
                                            }
                                            onChange={(e) =>
                                                setWorkExperience({
                                                    ...workExperience,
                                                    jobDescription:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .workExperience
                                                                  .jobDescription,
                                                })
                                            }
                                        />
                                    </Grid>

                                    {/* Education */}
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
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
                                            defaultValue={
                                                existingData.education
                                                    .universityName
                                            }
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    universityName:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .education
                                                                  .universityName,
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
                                                defaultValue={
                                                    existingData.education
                                                        .degree
                                                }
                                                onChange={(e) =>
                                                    setEducation({
                                                        ...education,
                                                        degree:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .education
                                                                      .degree,
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
                                                defaultValue={
                                                    existingData.education.major
                                                }
                                                onChange={(e) =>
                                                    setEducation({
                                                        ...education,
                                                        major:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .education
                                                                      .major,
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
                                            labelId="Eduduration"
                                            id="eduStartDate"
                                            name="eduStartDate"
                                            required
                                            label="Start Date"
                                            variant="standard"
                                            fullWidth
                                            type="date-local"
                                            defaultValue={
                                                existingData.education.startDate
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="mm/dd/yyyy"
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    startDate:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .education
                                                                  .startDate,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            labelId="Eduduration"
                                            id="eduEnddate"
                                            name="eduEnddate"
                                            required
                                            label="End Date"
                                            variant="standard"
                                            fullWidth
                                            type="date-local"
                                            defaultValue={
                                                existingData.education.endDate
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            placeholder="mm/dd/yyyy"
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    endDate:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .education
                                                                  .endDate,
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
                                            defaultValue={
                                                existingData.education.gpa
                                            }
                                            onChange={(e) =>
                                                setEducation({
                                                    ...education,
                                                    gpa:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .education
                                                                  .gpa,
                                                })
                                            }
                                        />
                                    </Grid>

                                    {/* Portfolio */}
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
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
                                            defaultValue={
                                                existingData.portfolio.githubUrl
                                            }
                                            onChange={(e) =>
                                                setPortfolio({
                                                    ...portfolio,
                                                    githubUrl:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .portfolio
                                                                  .githubUrl,
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
                                            defaultValue={
                                                existingData.portfolio
                                                    .linkedInUrl
                                            }
                                            onChange={(e) =>
                                                setPortfolio({
                                                    ...portfolio,
                                                    linkedInUrl:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .portfolio
                                                                  .linkedInUrl,
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
                                            defaultValue={
                                                existingData.portfolio.otherUrl
                                            }
                                            onChange={(e) =>
                                                setPortfolio({
                                                    ...portfolio,
                                                    otherUrl:
                                                        e.target.value !== ""
                                                            ? e.target.value
                                                            : existingData
                                                                  .portfolio
                                                                  .otherUrl,
                                                })
                                            }
                                        />
                                    </Grid>

                                    {/* Equal Employment Opportunity */}
                                    <Grid item xs={12}>
                                        <Typography variant="h5">
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
                                                defaultValue={
                                                    existingData.employment
                                                        .ethnicity
                                                }
                                                onChange={(e) => {
                                                    setEmployment({
                                                        ...employment,
                                                        ethnicity:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .employment
                                                                      .ethnicity,
                                                    });
                                                }}
                                            >
                                                {GetAllEthinicity.map(
                                                    (ethnicity) => (
                                                        <MenuItem
                                                            key={ethnicity}
                                                            value={ethnicity}
                                                        >
                                                            {ethnicity}
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
                                                defaultValue={
                                                    existingData.employment
                                                        .gender
                                                }
                                                onChange={(e) =>
                                                    setEmployment({
                                                        ...employment,
                                                        gender:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .employment
                                                                      .gender,
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
                                                defaultValue={
                                                    existingData.employment
                                                        .isAuthorized
                                                }
                                                onChange={(e) =>
                                                    setEmployment({
                                                        ...employment,
                                                        isAuthorized:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .employment
                                                                      .isAuthorized,
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
                                                defaultValue={
                                                    existingData.employment
                                                        .protectedVeteran
                                                }
                                                onChange={(e) =>
                                                    setEmployment({
                                                        ...employment,
                                                        protectedVeteran:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .employment
                                                                      .protectedVeteran,
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
                                                defaultValue={
                                                    existingData.employment
                                                        .disability
                                                }
                                                onChange={(e) =>
                                                    setEmployment({
                                                        ...employment,
                                                        disability:
                                                            e.target.value !==
                                                            ""
                                                                ? e.target.value
                                                                : existingData
                                                                      .employment
                                                                      .disability,
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
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Paper>
                </Container>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default EditUserDetailsPage;

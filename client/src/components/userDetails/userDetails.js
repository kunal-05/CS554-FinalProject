import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmploymentForm from "./employmentForm";
import EducationForm from "./educationForm";
import ReviewForm from "./reviewForm";
import SkillsForm from "./skillsForm";
import UserInfoForm from "./userInformationForm";
import ExperienceForm from "./workExperienceForm";
import Portfolio from "./portfolio";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

const steps = [
    "User Information",
    "Work Experience",
    "Education",
    "Portfolio",
    "Skills",
    "Equal Employment Opportunity",
    "Review",
];

const theme = createTheme();

function UserDetailsPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [userInfo, setUserInfo] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [education, setEducation] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [skills, setSkills] = useState("");
    const [employment, setEmployment] = useState("");

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <UserInfoForm
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                    />
                );
            case 1:
                return (
                    <ExperienceForm
                        workExperience={workExperience}
                        setWorkExperience={setWorkExperience}
                    />
                );
            case 2:
                return (
                    <EducationForm
                        education={education}
                        setEducation={setEducation}
                    />
                );
            case 3:
                return (
                    <Portfolio
                        portfolio={portfolio}
                        setPortfolio={setPortfolio}
                    />
                );
            case 4:
                return <SkillsForm skills={skills} setSkills={setSkills} />;
            case 5:
                return (
                    <EmploymentForm
                        employment={employment}
                        setEmployment={setEmployment}
                    />
                );
            case 6:
                return (
                    <ReviewForm
                        userInfo={userInfo}
                        workExperience={workExperience}
                        education={education}
                        portfolio={portfolio}
                        skills={skills}
                        employment={employment}
                    />
                );
            default:
                throw new Error("Unknown step");
        }
    }

    const handleSubmit = async (e) => {
        await UpdateProfile(
            userInfo,
            workExperience,
            education,
            portfolio,
            skills,
            employment
        );
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        User Details
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed
                                your order confirmation, and will send you an
                                update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {activeStep !== 0 && (
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1
                                        ? "Place order"
                                        : "Next"}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default UserDetailsPage;

/*
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  useParams
} from "react-router-dom";
import data from '../components/companyDetails/EmployerData.json'

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const EmployerDetails = () => {
  const { employer_id } = useParams();
  console.log("employeeData --> ", employer_id);
  // Find the data for the employee with the matching id
  const showData = data.find((emp) => emp.employer_id === employer_id);
  const routeMatch = useRouteMatch(["/employee/:id", "/employee/:id/home"]);
  const currentTab = routeMatch?.pattern?.path;
  console.log("current tab is: ", currentTab)

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={currentTab}>
        <Tab
          label="Home"
          value="/employee/:id"
          to={`/employee/${showData.employer_id}`}
          component={Link}
        />
      </Tabs>
      <Tabs value={currentTab}>
      <Tab label="Charts" value="/employee/:id/home" to={`/employee/${showData.employer_id}/home`} component={Link} />

      </Tabs>
    </Box>
  );
};
export default EmployerDetails;

*/


const Home = () => {
    return(
        <div>
        <p>This is Home Page - show employer details</p></div>
    )
}

export default Home

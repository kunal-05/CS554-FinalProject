import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from '@mui/icons-material/Home';
import "../App";
import EmployerJobTitleSalaryGraph from "./EmployerJobTitleSalaryGraph";
const styles = {
  root: {
    display: "flex",
  },
  header1: {
    fontSize: "1em",
    fontFamily: "sans-serif",
    marginTop: 0.5
  },
  dt: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  card: {
    flex: 1,
    margin: "0 16px",
    maxWidth: 550,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  cardSecond: {
    flex: 1,
    margin: "0 16px",
    maxWidth: 550,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0 16px",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#1e8678",
    fontWeight: "bold",
    fontSize: 12,
  },
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EmployerDetails = (props) => {
  const [showData, setShowData] = useState("");
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //const styles = useStyles();

  const { id } = useParams();
  //id validation
  if (!id) {
    throw new Error(`NO ID was provided`);
  }
  if (typeof id !== "string" || id == null) {
    throw new Error(`ID must be a string`);
  }
  if (id.trim().length === 0 || id === "") {
    throw new Error(`Invalid ID`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:8000/${id}`);
        // console.log("data recieved from backend-->", data.data);
        if (!data.data) {
          setLoading(true);
        } else if (data.data === "NoData") {
          setLoading(false);
          throw new Error(`ERROR 404 - No data with id: ${id}`);
        } else {
          setShowData(data.data);
          setLoading(false);
        }
      } catch (e) {
        console.log("error in fetching data -> ", e);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if (showData) {
    console.log("showDtaa is -->", showData);
    const jobTitles = showData.job_title ? Object.keys(showData.job_title) : [];
    const nameSplit = showData.employer_name.split("");
    return (
      <div style={styles.root}>
        <Card style={styles.card} variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="companyName">
                {nameSplit[0]}
              </Avatar>
            }
            style={styles.titleHead}
            title={showData.employer_name}
          />
          <CardContent>
            <div style={{ display: "flex" }}>
              <Typography
                display="inline"
                style={styles.header1}
                variant={"subtitle2"}
              >
                <span style={{ fontWeight: "bold" }}>Name:</span>
              </Typography>
              <Typography
                // style={{ marginTop: 0.5 }}
                style={styles.header1}
              >
                {showData.employer_name}
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Typography
                display="inline"
                style={styles.header1}
                variant={"subtitle2"}
              >
                <span style={{ fontWeight: "bold" }}>Address:  </span>
              </Typography>
              <Typography style={styles.header1}>
              {showData &&
              showData.employer_address &&
              showData.employer_city &&
              showData.employer_postal_code &&
              showData.employer_state
                ? showData.employer_address +
                  "," +
                  showData.employer_city +
                  "," +
                  showData.employer_postal_code +
                  "," +
                  showData.employer_state
                : "N/A"}
              </Typography>
            </div>
            <br />
            {/* <Typography
              display="inline"
              style={styles.header1}
              variant={"subtitle2"}
            >
              <span style={{ fontWeight: "bold" }}>ADDRESS: </span>
              {showData &&
              showData.employer_address &&
              showData.employer_city &&
              showData.employer_postal_code &&
              showData.employer_state
                ? showData.employer_address +
                  "," +
                  showData.employer_city +
                  "," +
                  showData.employer_postal_code +
                  "," +
                  showData.employer_state
                : "N/A"}
            </Typography> */}
            <br />
            <Typography
              display="inline"
              style={styles.header1}
              variant={"subtitle2"}
            >
              <span style={{ fontWeight: "bold" }}>Certified Visa Cases: </span>
              {showData.certified_count ? showData.certified_count : "0"}
            </Typography>{" "}
            <br />
            <Typography
              display="inline"
              style={styles.header1}
              variant={"subtitle2"}
            >
              <span style={{ fontWeight: "bold" }}>Denied Visa Cases: </span>
              {showData.denied_count ? showData.denied_count : "0"}
            </Typography>
            <br />
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to="/">
             <HomeIcon/> Company Listing Page
            </Button>
          </CardActions>
          {jobTitles.length ? (
            <div>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                  <Typography variant="body2" color="textSecondary">
                    Expand
                  </Typography>
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography
                    display="inline"
                    style={styles.header1}
                    variant={"subtitle2"}
                  >
                    <span style={{ fontWeight: "bold" }}>Recent Job Listings: </span>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "20px",
                      }}
                    >
                      {jobTitles.length
                        ? jobTitles?.map((title, index) => (
                            <li key={index}>{title}</li>
                          ))
                        : "N/A"}
                    </ul>
                  </Typography>
                </CardContent>
              </Collapse>
            </div>
          ) : (
            ""
          )}
        </Card>
        <br />
        {jobTitles.length ?
        (<div>
          <EmployerJobTitleSalaryGraph />
        </div>) : ""
         }
        {/* <br/>
        <div>
          <EmployerJobTitleSalaryGraph />
        </div> */}
      </div>
    );
  } else {
    return <p>NO data found for id : {id}</p>;
  }
};

export default EmployerDetails;

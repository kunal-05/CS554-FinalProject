import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import "../App.css";
//import Index from "./Graphs/index";
const useStyles = makeStyles({
  root: {
    display: "flex",
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
});

const EmployerDetails = (props) => {
  const [showData, setShowData] = useState("");
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const classes = useStyles();

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
        console.log("data recieved from backend-->", data.data);
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
    //console.log("jobtitles -->", jobTitles.length);
    return (
      <div className={classes.root}>
        <Card className={classes.card} variant="outlined">
          <CardHeader
            className={classes.titleHead}
            title={showData.employer_name}
          />
          <CardContent>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.dt}
              component="span"
            >
              NAME: {showData.employer_name}
            </Typography>
            <br />
            <Typography
              variant="h5"
              className={classes.dt}
              color="textPrimary"
              component="span"
            >
              ADDRESS:{" "}
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
            <br />
            <Typography
              variant="h5"
              className={classes.dt}
              color="textPrimary"
              component="span"
            >
              Certified Visa Cases:{" "}
              {showData.certified_count ? showData.certified_count : "0"}
            </Typography>{" "}
            <br />
            <Typography
              variant="h5"
              className={classes.dt}
              color="textPrimary"
              component="span"
            >
              Denied Visa Cases:{" "}
              {showData.denied_count ? showData.denied_count : "0"}
            </Typography>
            <br />
            <Typography
              variant="h5"
              className={classes.dt}
              color="textPrimary"
              component="span"
            >
              {jobTitles.length ? (
                <p>
                  Job Titles:
                  <ul>
                    {jobTitles.length
                      ? jobTitles?.map((title, index) => (
                          <li key={index}>{title}</li>
                        ))
                      : "N/A"}
                  </ul>
                </p>
              ) : (
                ""
              )}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="span">
              <Link to="/" style={{textAlign: 'center'}}>
                {" "}
                Go through company listing again?
              </Link>
            </Typography>
          </CardContent>
        </Card>

        {/* <Card className={classes.cardSecond} variant="outlined">
          <CardHeader
            className={classes.titleHead}
            title={"Year wise Confirmed and Rejected Visa Cases"}
          />
          <CardContent>
            <p>will display charts here!</p>
          </CardContent>
        </Card> */}
        {/* <div>
          <Index />
        </div> */}
      </div>
    );
  } else {
    return <p>NO data found for id : {id}</p>;
  }
};

export default EmployerDetails;

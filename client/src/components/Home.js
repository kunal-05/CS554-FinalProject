// const Home = () => {

//     return(
//         <div>
//         <p>This is Home Page - show employer details</p></div>
//     )
// }

// export default Hom

import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
//import Index from "./Graphs/index";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { CardHeader, Grid } from '@material-ui/core';
//import Stack from '@mui/material/Stack'

import "./styles.css";


const styles = muiBaseTheme => ({
  root: {
    display: "flex",
  },

  header1: {
    fontSize: "1em",
    fontFamily: "sans-serif",
  },

  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  content: {
    textAlign: "left",
    padding: 7 * 3
  },
  titleHead: {
    fontWeight: "bold",
    textAlign: "center",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  avatar: {
    marginLeft: 20
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

function stringAvatar(name) {
  return {
    sx: {
      backgroundColor: generateColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function generateColor(name) {
  console.log(name + ' #' +  Math.random().toString(16).substr(-6));
  return '#' +  Math.random().toString(16).substr(-6);
}

function App({ classes }) {
  return (
    <div className={classes.root}>
    <Card className={classes.card} variant="outlined">
      <Grid container 
      spacing={2} 
      direction="row"
      justifyContent="center"
      alignItems="center">

        <Grid item xs={2}>
          <Avatar className={classes.avatar} {...stringAvatar('Full Company Employer Name')} />
        </Grid>
        <Grid item xs={10}>
          <CardHeader
            className={classes.titleHead}
            title={"Full Company Employer Name"}
          />
        </Grid>
      </Grid>

      <Divider className={classes.divider} light />
      <CardContent className={classes.content}>

      {/* <Grid container 
      spacing={2} 
      alignItems="center" >
        <Grid item>
      <Typography
            className={classes.header1}
            variant={"subtitle1"}
            
          >
          NAME: 
        </Typography>
        </Grid>
        <Grid item>
        <Typography
          className={classes.content1}
          variant={"body2"}>
          {"Employer Name 1"}
        </Typography>
        </Grid>
      </Grid> */}

     
        <Typography display="inline"
            className={classes.header1}
            variant={"subtitle2"}
          >
          <span style={{fontWeight:"bold"}}>NAME:</span>
          {"Employer Name"}
        </Typography>
      
        <Typography display="inline"
            className={classes.header1}
            variant={"subtitle2"}
          >
          <span style={{fontWeight:"bold"}}>ADDRESS:{" "}</span>
          
          {"14 Schiller Street, Boston 02130"}
        </Typography>

        <Typography display="inline"
            className={classes.header1}
            variant={"subtitle2"}
          >
          <span style={{fontWeight:"bold"}}>Certified Visa Cases:{" "}
          </span>
          {2 ? 2 : "0"}
        </Typography>
        <Typography display="inline"
            className={classes.header1}
            variant={"subtitle2"}
          >
          <span style={{fontWeight:"bold"}}>Denied Visa Cases:{" "}</span>
          {4 ? 3 : "0"}
        </Typography>
        <Typography display="inline"
            className={classes.header1}
            variant={"subtitle2"}
          >
          {true ? (
            <div>
              <span style={{fontWeight:"bold"}}>Job Titles:</span>
              <ul style={{marginTop:"-5px"}}>
                      <li >Job Title 1</li>
                      <li >Job Title 2</li>
                      <li >Job Title 3</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </Typography>

        <Divider className={classes.divider} light />


        {/* <Typography
          variant="h5"
          className={classes.header1}
          color="textPrimary"
          component="span"
        >
          Certified Visa Cases:{" "}
          {2 ? 2 : "0"}
        </Typography>{" "} */}
       
        <Typography variant="caption" color="textPrimary" component="span">
         {/* <Link to="/" style={{textAlign: 'center'}}>
            {" "}
            Go through company listing again?
          </Link> */}
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
    <div>
    
    </div>
  </div>
  );
}

const WrappedApp = withStyles(styles)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<WrappedApp />, rootElement);
// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from 'axios';
// import {
//   makeStyles,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardHeader,
//   Avatar
// } from "@material-ui/core";
// import "../App.css";
// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//   },
//   dt: {
//     fontWeight: "bold",
//     fontSize: "1.2rem",
//     marginBottom: "0.5rem",
//   },
//   card: {
//     flex: 1,
//     margin: "0 16px",
//     maxWidth: 550,
//     height: "auto",
//     marginLeft: "auto",
//     marginRight: "auto",
//     marginTop: "auto",
//     borderRadius: 5,
//     border: "1px solid #1e8678",
//     boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
//   },
//   cardSecond: {
//     flex: 1,
//     margin: "0 16px",
//     maxWidth: 550,
//     marginLeft: "auto",
//     marginRight: "auto",
//     marginTop: "0 16px",
//   },
//   titleHead: {
//     borderBottom: "1px solid #1e8678",
//     fontWeight: "bold",
//     textAlign: 'center'
//   },
//   grid: {
//     flexGrow: 1,
//     flexDirection: "row",
//   },
//   media: {
//     height: "100%",
//     width: "100%",
//   },
//   button: {
//     color: "#1e8678",
//     fontWeight: "bold",
//     fontSize: 12,
//   },
// });

// const EmployerDetails =  (props) => {
//   const [showData, setShowData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const [data, setData] = useState([]);
//   const classes = useStyles();

//   const { id } = useParams();
// useEffect(()=>{
//   async function fetchData(){
//     const {data} = await axios.get(`http://localhost:8000/${id}`);
//     //console.log(data.data)
//     setShowData(data.data)
//   }
//   fetchData("showData-->",showData);
// },[])

//   // if (loading) {
//   //   return (
//   //     <div>
//   //       <h2>Loading....</h2>
//   //     </div>
//   //   );
//   // } else if(showData) {
//   return (
//     <div className={classes.root}>
//       <Card className={classes.card} variant="outlined">
//         <CardHeader
//           className={classes.titleHead}
//           title={showData.employer_name}
//         />
//         <CardContent>
//           <Typography variant="subtitle1" color="textPrimary" className={classes.dt} component="span">
//             NAME:{showData.employer_name}
//           </Typography>
//           <br/>
//           <Typography variant="h5" className={classes.dt} color="textPrimary" component="span">
//             ADDRESS: {showData.employer_city + "," + showData.employer_state}
//           </Typography>
//           <br/>
//           <Typography variant="h5" className={classes.dt} color="textPrimary" component="span">
//             ADDRESS: {showData.employer_city + "," + showData.employer_state}
//           </Typography>
//         </CardContent>
//       </Card>

//       <Card className={classes.cardSecond} variant="outlined">
//         <CardHeader
//           className={classes.titleHead}
//           title={showData.employer_name}
//         />
//         <CardContent>
//           <Typography variant="body2" color="textPrimary" component="span">
//             This will display chart information
//             <Link to="/">Back to company listing page...</Link>
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>    
//   );
//   // }
//   // else{
//   //   return <p><NoDataFound/> </p>
//   //  }
// };

// export default EmployerDetails;

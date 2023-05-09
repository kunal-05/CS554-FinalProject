// import axios from "axios";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import React, { useState, useEffect, useLayoutEffect } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useParams } from "react-router-dom";
// import Button from "@mui/material/Button";
// import FileDownload from "@mui/icons-material/FileDownload";

// const Chart = () => {
//   const [originaldata, setData] = useState([]);
//   const { id } = useParams();
//   const [chartNode, setChartNode] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       const { data } = await axios.get(`http://localhost:8000/${id}`);
//       const arrayOfObjects = data.data.job_title;
//       console.log("Araay-->", arrayOfObjects);
//       const jobArray = Object.entries(arrayOfObjects).map(
//         ([title, salary]) => ({
//           job_title: title,
//           salary: salary,
//         })
//       );
//       const highest10 = jobArray.slice(0, 10);
//       console.log("jobArray->", highest10);
//       setData(highest10);
//     }
//     fetchData();
//   }, [id]);

//   const handleDownload = () => {
//     html2canvas(chartNode).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape", "pt", "a4");
//       const imgWidth = 500;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0);
//       pdf.save("graph.pdf");
//     });
//   };

//   useLayoutEffect(() => {
//     setChartNode(document.querySelector(".recharts-wrapper")); // update the state with the chart element
//   }, []);

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <BarChart width={500} height={500} data={originaldata} id="chart">
//         <XAxis dataKey="job_title" />
//         <YAxis />
//         <Legend />
//         <Tooltip />
//         <Bar dataKey="job_title" fill="#007600" />
//         <Bar dataKey="salary" fill="#c32600" />
//       </BarChart>
//       <div>
//         {/* <button onClick={handleDownload}>Download Graph</button> */}
//         <Button
//           size="small"
//           style={{ color: "#0066ba" }}
//           onClick={handleDownload}
//         >
//           <FileDownload /> Download Graph
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Chart;

import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
//import html2canvas from "html2canvas";
import { useReactToPrint } from 'react-to-print';
import { TeX } from 'react-latex';
//import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import FileDownload from "@mui/icons-material/FileDownload";

const Chart = () => {
  const [originaldata, setData] = useState([]);
  const { id } = useParams();
  const [chartNode, setChartNode] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:8000/${id}`);
      const arrayOfObjects = data.data.job_title;
     // console.log("Araay-->", arrayOfObjects);
      const jobArray = Object.entries(arrayOfObjects).map(
        ([title, salary]) => ({
          job_title: title,
          salary: salary,
        })
      );
      const highest10 = jobArray.slice(0, 10);
      console.log("jobArray->", highest10);
      setData(highest10);
    }
    fetchData();
  }, [id]);
  const chartRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => chartRef.current,
    documentTitle: 'Job title vs Salary Bar Chart',
    pageStyle: `
      @page {
        size: 210mm 297mm;
        margin: 20mm;
      }
      body {
        font-size: 12pt;
        font-family: 'Times New Roman', Times, serif;
      }
    `,
    onBeforeGetContent: () => {
      const nodes = chartRef.current.container.querySelectorAll("div.recharts-wrapper");
      nodes.forEach((node) => {
        const { innerHTML } = node;
        node.innerHTML = TeX({ children: innerHTML });
      });
    },
  });
  // const handleDownload = () => {
  //   html2canvas(chartNode).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("landscape", "pt", "a4");
  //     const imgWidth = 500;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  //     pdf.save("graph.pdf");
  //   });
  // };

  // useLayoutEffect(() => {
  //   setChartNode(document.querySelector(".recharts-wrapper")); // update the state with the chart element
  // }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarChart width={500} height={500} data={originaldata} ref={chartRef}>
        <XAxis dataKey="job_title" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="job_title" fill="#007600" />
        <Bar dataKey="salary" fill="#c32600" />
      </BarChart>
      <div>
        {/* <button onClick={handleDownload}>Download Graph</button> */}
        <Button
          size="small"
          style={{ color: "#0066ba" }}
          onClick={handlePrint}
        >
          <FileDownload /> Download Graph
        </Button>
      </div>
    </div>
  );
};

export default Chart;
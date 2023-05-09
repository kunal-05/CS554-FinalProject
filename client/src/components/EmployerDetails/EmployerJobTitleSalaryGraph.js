import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import React, { useState, useEffect, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
      console.log("Araay-->", arrayOfObjects);
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

  const handleDownload = () => {
    html2canvas(chartNode).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "pt", "a4");
      const imgWidth = 500;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("graph.pdf");
    });
  };

  useLayoutEffect(() => {
    setChartNode(document.querySelector(".recharts-wrapper")); // update the state with the chart element
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BarChart width={500} height={500} data={originaldata} id="chart">
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
          onClick={handleDownload}
        >
          <FileDownload /> Download Graph
        </Button>
      </div>
    </div>
  );
};

export default Chart;

// import React, { useRef } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
// import svgToPdf from "svg-to-pdfkit";
// import pdfKit from "pdfkit";

// const MyChart = ({ data }) => {
//   const chartRef = useRef(null);

//   const downloadPdf = () => {
//     // Get the SVG element from the chart
//     const svg = chartRef.current.querySelector("svg");

//     // Create a new PDF document
//     const doc = new pdfKit();

//     // Convert the SVG to PDF and add it to the document
//     svgToPdf(doc, svg.outerHTML, 0, 0);

//     // Generate LaTeX code to embed the PDF in a document
//     const latexCode = `
//       \\documentclass{article}
//       \\usepackage{graphicx}
//       \\begin{document}
//       \\begin{figure}
//       \\centering
//       \\includegraphics[width=\\textwidth]{chart.pdf}
//       \\end{figure}
//       \\end{document}
//     `;

//     // Generate the LaTeX document
//     const latexDoc = new pdfKit();
//     latexDoc.pipe(fs.createWriteStream("chart.tex"));
//     latexDoc.font("Helvetica");
//     latexDoc.fontSize(12);
//     latexDoc.text(latexCode);
//     latexDoc.end();

//     // Compile the LaTeX document into a PDF
//     const process = spawn("pdflatex", ["chart.tex"]);
//     process.stdout.on("data", (data) => {
//       console.log(`stdout: ${data}`);
//     });
//     process.stderr.on("data", (data) => {
//       console.error(`stderr: ${data}`);
//     });
//     process.on("close", (code) => {
//       console.log(`child process exited with code ${code}`);
//     });
//   };

//   return (
//     <>
//       <BarChart
//         ref={chartRef}
//         width={500}
//         height={300}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="value" fill="#8884d8" />
//       </BarChart>
//       <button onClick={downloadPdf}>Download as PDF</button>
//     </>
//   );
// };

import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const Chart = () => {
  const [originaldata, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:8000/${id}`);
      const arrayOfObjects = data.data.job_title;
      console.log("Araay-->",arrayOfObjects)
      const jobArray = Object.entries(arrayOfObjects).map(
        ([title, salary]) => ({
          job_title: title,
          salary: salary,
        })
      );
      const highest10 = jobArray.slice(0, 10);
      console.log("jobArray->",highest10);
      setData(highest10);
    }
    fetchData();
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart width={500} height={500} data={originaldata}>
        <XAxis dataKey="job_title" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="job_title" fill="#239B56" />
        <Bar dataKey="salary" fill="#E74C3C" />
      </BarChart>
    </div>
  );
};

export default Chart;

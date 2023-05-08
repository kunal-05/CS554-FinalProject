import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import React, { useState, useEffect } from "react";
const Chart = () => {
 const [originaldata, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:8000/yearData`);
      const arrayOfObjects = data.data
      console.log(arrayOfObjects)
      setData(arrayOfObjects);
    }
    fetchData();
  }, []);
    return (
      <BarChart width={600} height={600} data={originaldata}>
        <XAxis dataKey="year" />
        <YAxis />
        <Legend />
        <Tooltip />
        <Bar dataKey="certified" fill="#239B56" />
        <Bar dataKey="denied" fill="#E74C3C" />
      </BarChart>
    );
  };
  
  export default Chart;
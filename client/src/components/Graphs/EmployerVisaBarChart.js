//Graph for Employer naame and count of visas
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import React, { useState, useEffect } from "react";


const CustomBarChart = () => {
  const [originaldata, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:8000/`);
      const arrayOfObjects = data.data
      const sortedArray = arrayOfObjects.sort((a, b) => b.certified_count - a.certified_count);
      const highest10 = sortedArray.slice(0, 10);
      console.log(highest10)
      setData(highest10);
    }
    fetchData();
  }, []);

  return (
    <BarChart width={600} height={600} data={originaldata} layout="vertical" margin={{ left: 100, right: 50 }}>
      <XAxis type="number" />
      <YAxis type="category" dataKey="employer_name" width={150} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="certified_count" fill="darkred" />
    </BarChart>
  );
};

export default CustomBarChart;






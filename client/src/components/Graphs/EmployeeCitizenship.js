//Graph for Employe citizenship and all status case of visas
import {Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from "axios";
import React, { useState, useEffect } from "react";




const MyChart = () => {
  const [originaldata, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `http://localhost:8000/employeeCitizenship`
      );
      const arrayOfObjects = data.data;
      const sortedArray = arrayOfObjects.sort(
        (a, b) => (b.case_status) - (a.case_status)
      );
      const highest10 = sortedArray.slice(0, 10);
      setData(highest10);
      
    }
    fetchData();
  }, []);
  

  return (
   
       <BarChart width={600} height={600} data={originaldata} layout="vertical" margin={{ left: 100, right: 50 }}>
      <XAxis type="number" />
      <YAxis type="category" dataKey="country_of_citizenship" width={150} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="case_status" fill="#426e76" />
    </BarChart>

  );
};

export default MyChart;

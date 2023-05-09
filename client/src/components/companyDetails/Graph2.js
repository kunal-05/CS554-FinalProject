//Graph for Employer city and cout of visas
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  
  const CustomBarChart = () => {
    const [originaldata, setData] = useState([]);
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(`http://localhost:8000/`);
        const arrayOfObjects = data.data;
        const groupedData = arrayOfObjects.reduce((acc, obj) => {
          const city = obj.employer_city;
          const count = parseInt(obj.certified_count);
          if (city && !isNaN(count)) {
            const index = acc.findIndex(item => item.employer_city === city);
            if (index === -1) {
              acc.push({
                employer_city: city,
                certified_count: count
              });
            } else {
              acc[index].certified_count += count;
            }
          }
          return acc;
        }, []);
        const sortedData = Object.entries(groupedData)
          .sort((a, b) => b[1].certified_count - a[1].certified_count)
          .slice(0, 10)
          .map(([key, value]) => value);
        console.log(sortedData);
        setData(sortedData);
      }
      fetchData();
    }, []);
  
    return (
      <BarChart
        width={600}
        height={400}
        data={originaldata}
        layout="vertical"
        margin={{ left: 100, right: 50 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="employer_city" width={150} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="certified_count" fill="darkred" />
      </BarChart>
    );
  };
  
  export default CustomBarChart;
  
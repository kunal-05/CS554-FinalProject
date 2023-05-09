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
          const state = obj.employer_state;
          const count = parseInt(obj.certified_count);
          if (state && !isNaN(count)) {
            const index = acc.findIndex(item => item.employer_state=== state);
            if (index === -1) {
              acc.push({
                employer_state: state,
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BarChart
        width={600}
        height={400}
        data={originaldata}
        layout="vertical"
        margin={{ left: 100, right: 50 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="employer_state" width={150} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="certified_count" fill="#FFBB28" />
      </BarChart>
      </div>
    );
  };
  
  export default CustomBarChart;
  
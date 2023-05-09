//Graph for Employe citizenship and all status case of visas
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Tooltip, Legend,RadarChart,PolarGrid, PolarAngleAxis,PolarRadiusAxis,Radar } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from "axios";
import React, { useState, useEffect,PureComponent } from "react";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // replace with your desired colors

const MyChart = () => {
  const [originaldata, setData] = useState([]);
  // const [rows, setFilteredRows] = useState([]);
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
       <BarChart width={600} height={400} data={originaldata} layout="vertical" margin={{ left: 100, right: 50 }}>
      <XAxis type="number" />
      <YAxis type="category" dataKey="country_of_citizenship" width={150} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="case_status" fill="pink" />
    </BarChart>
    </div>
  );
};

export default MyChart;

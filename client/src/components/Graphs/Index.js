import React from 'react';
import './Graph.css'
import YearWiseBarChart from './YearWiseBarChart';
import EmployerStateVisaBarChart from './EmployerStateVisaBarChart'
import EmployerCityVisaBarChart from './EmployerCityVisaBarChart'
import EmployeeCitizenship from './EmployeeCitizenship'
import EmployerVisaBarChart from './EmployerVisaBarChart'

const ChartContainer = () => {
  return (
    <div className="chart-container">
      <div className="card-container">
        <div className="chart-card">
          <YearWiseBarChart/>
        </div>
        <div className="chart-card">
          <EmployerStateVisaBarChart/>
        </div>
        <div className="chart-card">
          <EmployerCityVisaBarChart/>
        </div>
        <div className="chart-card">
          <EmployeeCitizenship/>
        </div>
        <div className="chart-card">
          <EmployerVisaBarChart/>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Company from './components/companyDetails/Company';
import EmployerDetails from './components/EmployerDetails';
import Home from './components/Home'
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Company} />
        <Route path="/employee/:id" Component = {EmployerDetails}/>
        {/* <Route path="/employee/:employer_id/home" Component = {Home}/> */}
        {/* <Route path="/employee/:employer_id/charts" Component = {Charts}/> */}
      </Routes>
    </Router>
  );
}

export default App;
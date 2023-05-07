import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Company from './components/companyDetails/Company';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Company} />
      </Routes>
    </Router>
  );
}

export default App;
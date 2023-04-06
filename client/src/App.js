import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDetailsPage from './components/userDetails/userDetails';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UserDetailsPage} />
      </Routes>
    </Router>
  );
}

export default App;

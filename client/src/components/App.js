import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Account from './Account/Account';
import Navigation from './Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';
import Profile from './Profile/Profile'
import Company from './companyDetails/Company'
import Index from './Graphs/Index'
import {AuthProvider} from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
import EmployerDetails from './EmployerDetails/EmployerDetails';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <Navigation />
          </header>
        </div>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path="/employee/:id" Component = {EmployerDetails}/>
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Company />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/graphs' element={<PrivateRoute />}>
            <Route path='/graphs' element={<Index />} />
          </Route>
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

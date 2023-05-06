import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Account from './Account/Account';
import Home from '../components/Home/Home';
import Navigation from './Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';
import Profile from './Profile/Profile'
import Jobs from './Jobs/Jobs'
import {AuthProvider} from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
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
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/jobs' element={<PrivateRoute />}>
            <Route path='/jobs' element={<Jobs />} />
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

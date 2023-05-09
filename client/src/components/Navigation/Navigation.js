import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../../firebase/Auth';
import SignOutButton from '../SignOut';
import img from './header.png';
import './Navigation.css';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  // console.log("ID",currentUser);
  return <div>
    {currentUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </div>;
};

const NavigationAuth = () => {
  return (
    <>
    <NavLink to="/">
      <img
        src={img}
        alt="Career Connect original logo"
        className="logo"
      />
		</NavLink>
    <nav className='navigation'>
    <ul>
      <li>
        <NavLink to='/home'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/graphs'>Stats</NavLink>
      </li>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
      <li>
        <NavLink to='/account'>Account</NavLink>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </nav>
  </>
  );
};

const NavigationNonAuth = () => {
  return (
    <>
    <NavLink to="/">
      <img
        src={img}
        alt="Career Connect original logo"
        className="logo"
      />
		</NavLink>
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink to='/signup'>Sign-up</NavLink>
        </li>

        <li>
          <NavLink to='/signin'>Sign-In</NavLink>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Navigation;

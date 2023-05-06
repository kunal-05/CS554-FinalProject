import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import './SignOut.css'

const SignOutButton = () => {
  return (
    <button className='signoutBtn' type='button' onClick={doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;

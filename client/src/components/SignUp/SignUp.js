import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../../firebase/FirebaseFunctions';
import {AuthContext} from '../../firebase/Auth';
import img from './login.png'
import './SignUp.css'
// import SocialSignIn from './SocialSignIn';
function SignUp() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {displayName, email, passwordOne, passwordTwo} = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName
      );
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
    return <Navigate to='/home' />;
  }

  return (
    <div className='container'>
      <img src={img} width="200" height="150" alt="login" />
      <h1>SignUp to start your journey</h1>
      {pwMatch && <h4 className='error'>{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className='form-group'>
          <label>
            Name:
            <br></br>
            <input
              className='form-control'
              required
              name='displayName'
              type='text'
              placeholder='Name'
              style={{'background-color': "#edf5f3","padding":"8px",
              "border-radius": "20px",
              "border": "none",
              "background-color": "#edf5f3",
              "width": "350px",
              "max-width": "100%",
              "box-sizing": "border-box",
              "margin-bottom": "10px",
              "font-size": "16px"}}
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Email:
            <br></br>
            <input
              className='form-control'
              required
              name='email'
              type='email'
              placeholder='Email'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Password:
            <br></br>
            <input
              className='form-control'
              id='passwordOne'
              name='passwordOne'
              type='password'
              placeholder='Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Confirm Password:
            <br></br>
            <input
              className='form-control'
              name='passwordTwo'
              type='password'
              placeholder='Confirm Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <button id='submitButton' className='submitButton' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;

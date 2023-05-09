import React, { useContext } from "react";
// import SocialSignIn from './SocialSignIn';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../firebase/Auth";
import {
    doSignInWithEmailAndPassword,
    doPasswordReset,
} from "../../firebase/FirebaseFunctions";
import img from "./login.png";
import "./SignIn.css";

function SignIn() {
    const { currentUser } = useContext(AuthContext);
    const handleLogin = async (event) => {
        event.preventDefault();
        let { email, password } = event.target.elements;

        try {
            await doSignInWithEmailAndPassword(email.value, password.value);
        } catch (error) {
            alert(error);
        }
    };

    const passwordReset = (event) => {
        event.preventDefault();
        let email = document.getElementById("email").value;
        if (email) {
            doPasswordReset(email);
            alert("Password reset email was sent");
        } else {
            alert(
                "Please enter an email address below before you click the forgot password link"
            );
        }
    };
    if (currentUser) {
        return <Navigate to="/home" />;
    }
    return (
        <div className="container">
            <img src={img} width="200" height="150" alt="login" />
            {/* <h1>Welcome !</h1> */}
            <h1>SignIn to your Account</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>
                        Email:
                        <br></br>
                        <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                        <br></br>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            required
                        />
                    </label>
                </div>
                <div className="btnContainer">
                    <button className="loginbtn" type="submit">
                        Log in
                    </button>
                    <button className="forgotPassword" onClick={passwordReset}>
                        Forgot Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;

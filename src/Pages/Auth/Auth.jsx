import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./SignUp.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataContext";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState({
    signin: false,
    signup: false,
  });

  const navigate = useNavigate();
  const navStateData = useLocation();

  const {  dispatch } = useContext(DataContext);
  // const { user } = state;


  const authHandler = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, signin: true });
    if (e.target.name === "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setIsLoading({ ...isLoading, signin: false });
          setError("");
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading({ ...isLoading, signin: false });
        });
    } else {
      setIsLoading({ ...isLoading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setError("");
          setIsLoading({ ...isLoading, signup: false });
       navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading({ ...isLoading, signup: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state?.msg}
          </small>
        )}

        <form action="">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
          <button
            name="signin"
            type="submit"
            onClick={authHandler}
            className={classes.signInButton}
          >
            {isLoading.signin ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "SignIn"
            )}
          </button>
        </form>
        {/* Agreements */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account btn */}
        <button
          name="signup"
          type="button"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {isLoading.signup ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {/* Error message */}
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

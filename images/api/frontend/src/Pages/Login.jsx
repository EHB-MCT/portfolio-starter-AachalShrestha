import React from "react";
import "../Styles/loginRegister.css";
import Navigation from "../Components/Nav";
import LoginForm from "../Components/LoginForm";

const Login = () => {
  return (
    <div className="App">
      <Navigation />
      <div className="form-wrapper">
        <h2>
          Welcome to the
          <br />
          cool music app
        </h2>
        <LoginForm />
        <p>
          Dont't have an account yet? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

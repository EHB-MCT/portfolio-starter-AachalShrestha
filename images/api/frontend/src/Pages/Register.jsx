import React from "react";
import "../Styles/loginRegister.css";
import Navigation from "../Components/Nav";
import RegisterForm from "../Components/RegisterForm";

const Register = () => {
  return (
    <div className="App">
      <Navigation />
      <div className="form-wrapper">
        <h2>
          Welcome to the
          <br />
          cool music app
        </h2>
        <RegisterForm />
        <p>
          Already got an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgetPassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/forget-password/", { email })
      .then((res) => {
        console.log(res);
        // Assuming the backend returns a success message upon sending the reset email/OTP
        alert("Reset email/OTP sent successfully. Please check your inbox.");
        navigate("/ChangeForgetPass"); // Navigate to the reset password page
      })
      .catch((err) => {
        console.error(err);
        // Handle error responses from the backend
        if (err.response && err.response.data && err.response.data.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="forget-password-container ">
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          Send Reset Email/OTP
        </button>
      </form>
      <p>
        Remember your password?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default ForgetPassword;

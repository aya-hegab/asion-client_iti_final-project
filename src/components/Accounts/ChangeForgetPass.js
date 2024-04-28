import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangeForgetPass.css";

function ChangeForgetPass() {
  const [passwords, setPasswords] = useState({
    new_password: "",
    confirmPassword: "",
    otp: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleFieldChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwords.new_password !== passwords.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8000/change-password/", {
        email: passwords.email,
        new_password: passwords.new_password,
        otp: passwords.otp,
      })
      .then((res) => {
        console.log(res);
        alert("Password changed successfully.");
        navigate("/login"); // Navigate to the login page after successful password change
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
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={passwords.email}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            name="otp"
            value={passwords.otp}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="new_password"
            value={passwords.new_password}
            onChange={handleFieldChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleFieldChange}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangeForgetPass;

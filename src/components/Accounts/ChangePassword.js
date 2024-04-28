import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    try {
      const response = await axios.post('http://localhost:8000/verify-otp/', { email, otp, new_password: newPassword, confirm_password: confirmPassword },{headers});
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleLogout = () => {
    const token = Cookies.get("token");
    Cookies.remove("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    axios
      .post("http://localhost:8000/api/logout/", null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Change Password</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="otp">OTP:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                <button type="button" className="btn btn-primary btn-block" onClick={handleLogout}>Logout</button>
              </form>
              {message && <p className="text-center mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

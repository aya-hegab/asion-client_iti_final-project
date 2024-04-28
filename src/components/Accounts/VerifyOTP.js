import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    try {
      const response = await axios.post('http://localhost:8000/reset-password/', { email },{headers});
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className="container  ">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Reset Password</h3>
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
                <button type="submit" className="btn btn-primary btn-block">Send OTP</button>
                <Link to="/ChangePassword" className="btn btn-primary btn-block">Click To Change Your Password</Link>
              </form>
              {message && <p className="text-center mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default VerifyOTP;

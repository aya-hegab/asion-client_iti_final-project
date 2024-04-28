
import React, { useState } from "react";
import welc from "../../imags/register/welc.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCake } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faShopify } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./reg.css";
import { Link } from 'react-router-dom';

function Register() {
    const [userForm, setUserForm] = useState({
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
        username: "",
        email: "",
        birthdate: "",
        phone: "",
        usertype: "",
        address: "",
        shopname: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleFieldChange = (event) => {
        const field_name = event.target.name;
        const field_value = event.target.value;

        setUserForm({
            ...userForm,
            [field_name]: field_value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userForm.password.length < 8) {
          setErrorMessage("Password must be at least 8 characters long, and ");
          return;
      }
        axios
            .post("http://localhost:8000/api/register/", userForm)
            .then((res) => {
                console.log(res);
                navigate("/message");
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.message);
                }
                console.log(err);
            });
    };

  return (
    <>
    
    <div className="all-register d-flex justify-content-center align-items-center vh-100">
    <div className="containerr py-3">
    <div className='row  ' style={{width:'100%'}}>
        
      <img src={welc} alt="Welcome" className='col-md-5 ' />
      
      <div className="col-md-7">
      <form onSubmit={handleSubmit} className="pl-2">
        <div className="row mb-3">
          <div className="col-md-6 ">
            <label htmlFor="firstname" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              placeholder="FirstName"
              value={userForm.first_name}
              onChange={handleFieldChange}
              name="first_name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastname" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="LastName"
              value={userForm.last_name}
              onChange={handleFieldChange}
              name="last_name"
            />
          </div>
          {!(userForm.first_name && userForm.last_name) && (
            <div className="col-md-12">
              <span className="text-danger">
                Both first name and last name are required
              </span>
            </div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={userForm.password}
              onChange={handleFieldChange}
              name="password"
            />
            {userForm.password && (
  <span className="text-danger">
    {userForm.password.length < 8 && (
      <>Password must be at least 8 characters long</>
    )}
    {userForm.password.length >= 8 &&
      !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(userForm.password) && (
        <>Password must contain at least one uppercase character and one special character</>
      )}
  </span>
)}

          </div>
          <div className="col-md-6">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={userForm.confirmPassword}
              onChange={handleFieldChange}
              name="confirmPassword"
            />
            {userForm.confirmPassword !== userForm.password && (
              <span className="text-danger">Passwords do not match</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="user" className="form-label">
              Username
            </label>
            <div className="input-group">
              <span className="input-group-text" id="user">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="user"
                value={userForm.username}
                onChange={handleFieldChange}
                name="username"
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text" id="email">
                @
              </span>
              <input
                type="email"
                className="form-control"
                value={userForm.email}
                id="email"
                onChange={handleFieldChange}
                name="email"
                required
              />
            </div>
            {errorMessage && <span className="text-danger">{errorMessage}</span>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="birthdate" className="form-label">
              BirthDate
            </label>
            <div className="input-group">
              <span className="input-group-text" id="birthdate">
                <FontAwesomeIcon icon={faCake} />
              </span>
              <input
                type="date"
                className="form-control"
                value={userForm.birthdate}
                id="birthdate"
                onChange={handleFieldChange}
                name="birthdate"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Mobile Phone
            </label>
            <div className="input-group">
              <span className="input-group-text" id="phone">
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
              <input
                type="tel"
                className="form-control"
                value={userForm.phone}
                id="phone"
                onChange={handleFieldChange}
                name="phone"
                required
              />
            </div>
            {userForm.phone && !userForm.phone.startsWith("+20") && (
              <span className="text-danger">
                Mobile phone must begin with +20
              </span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="usertype" className="form-label">
              User Type
            </label>
            {/* <span className="input-group-text" id="user"><FontAwesomeIcon icon={faUser} /></span> */}
            <select
              className="form-select"
              id="usertype"
              value={userForm.usertype}
              onChange={handleFieldChange}
              name="usertype"
              required
            >
              <option value="">Select User Type</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              {/* <option value="DeliveryMan">DeliveryMan</option> */}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
              <input
                type="text"
                className="form-control"
                value={userForm.address}
                id="address"
                onChange={handleFieldChange}
                name="address"
                required
              />
            </div>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-md-6">
            <label htmlFor="shopname" className="form-label">
              Shop Name
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faShopify} />
              </span>
              <input
                type="text"
                className="form-control"
                id="shopname"
                value={userForm.shopname}
                onChange={handleFieldChange}
                name="shopname"
                disabled={userForm.usertype !== "vendor" }
                required
              />
              {userForm.usertype === "vendor" &&
                userForm.shopname.trim() === "" && (
                  <span className="text-danger">
                    Shop name is required for vendor
                  </span>
                )}
            </div>
          </div>
        </div>
        <div className="submitbtn">
        <button
          className="btn btn-dark"
          type="submit"
          style={{ padding: "10px", width: "150px", marginTop:"7px" }}
        >
          Submit
        </button>
        </div>
      </form>
      </div>
     
     
    </div>
    </div>
    <div className='login_btn mt-2' >
      <div>
        <p className='paragraph'>Already Have An Account? </p>
        </div>
        <Link to="/login" className="link">Login</Link>
      </div>
    </div>
    
      </>

  );
}

export default Register;

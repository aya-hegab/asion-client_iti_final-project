import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        usertype: "",
        address: "",
        shopname: "",
        is_active: true,
        is_staff: false,
        is_superuser: false,
        birthdate: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long, and ");
            return;
        }

        const token = Cookies.get("token");
        if (token) {
            axios.post("http://localhost:8000/add-user/", formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    // "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log("User added successfully");
                    navigate("/UserManagement")
                    setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        phone: "",
                        usertype: "",
                        address: "",
                        shopname: "",
                        is_active: true,
                        is_staff: false,
                        is_superuser: false,
                        birthdate: "",
                    });
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        setErrorMessage(err.response.data.message);
                    }
                    console.log(err);
                });
        }
    };

    return (
        <div className="container">
            <h3 className="my-4">Add User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                {!(formData.first_name && formData.last_name) && (
            <div className="col-md-12">
              <span className="text-danger">
                Both first name and last name are required
              </span>
            </div>
          )}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                {errorMessage && <span className="text-danger">{errorMessage}</span>}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                {formData.password && (
  <span className="text-danger">
    {formData.password.length < 8 && (
      <>Password must be at least 8 characters long</>
    )}
    {formData.password.length >= 8 &&
      !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(formData.password) && (
        <>Password must contain at least one uppercase character and one special character</>
      )}
  </span>
)}

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    {formData.confirmPassword !== formData.password && (
              <span className="text-danger">Passwords do not match</span>
            )}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                {formData.phone && !formData.phone.startsWith("+20") && (
              <span className="text-danger">
                Mobile phone must begin with +20
              </span>
            )}
                <div className="mb-3">
                    <label htmlFor="usertype" className="form-label">User Type</label>
                    <select
              className="form-select"
              id="usertype"
              value={formData.usertype}
              onChange={handleChange}
              name="usertype"
              required
            >
              <option value="">Select User Type</option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="DeliveryMan">DeliveryMan</option>
              <option value="Admin">Admin</option>
            </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="shopname" className="form-label">Shop Name</label>
                    <input type="text" className="form-control" id="shopname" name="shopname" value={formData.shopname}  disabled={formData.usertype !== "vendor" } onChange={handleChange} />
                    {formData.usertype === "vendor" &&
                formData.shopname.trim() === "" && (
                  <span className="text-danger">
                    Shop name is required for vendor
                  </span>
                )}
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                    <input type="date" className="form-control" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_active">Is Active</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_staff" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_staff">Is Staff</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="is_superuser" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_superuser">Is Superuser</label>
                </div>
                <button type="submit" className="btn btn-dark">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;
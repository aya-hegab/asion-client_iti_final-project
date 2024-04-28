import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        id: id,
        first_name: "",
        last_name: "",
        email: "",
        birthdate: "",
        address: "",
        phone: "",
        usertype: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/user-profile/${id}/`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/profile/${id}/`, user)
            .then((res) => {
                console.log("Update successful");
                if (window.confirm("The User Profile has been updated successfully")) {
                    navigate("/UserManagement");
                }
            })
            .catch((error) => {
                console.error("Update error:", error);
            });
    };

    return (
        <div>
            <h3>Update User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" value={user.first_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" value={user.last_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                    <input type="date" className="form-control" id="birthdate" name="birthdate" value={user.birthdate} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Mobile Number</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="usertype" className="form-label">User Type</label>
                    <input type="text" className="form-control" id="usertype" name="usertype" value={user.usertype} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default UpdateUser;

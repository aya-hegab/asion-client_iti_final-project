import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            axios.get("http://localhost:8000/api/allUser/", { headers: { Authorization: `Token ${token}` } })
                .then((response) => {
                    setUsers(response.data.Users);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, []);

    const handleDeleteUser = (userId) => {
        const token = Cookies.get("token");
        if (token) {
            axios.delete(`http://localhost:8000/profile/`, {
                headers: {
                    Authorization: `Token ${token}`
                },
                data: { id: userId }
            })
                .then((response) => {
                    console.log("User deleted successfully");
                    // Update the user list after deletion
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        }
    };

    return (
        <>
            <h3 style={{marginTop:"10px"}}>User Management</h3>
            {/* <br></br>
            <Link to="/AddUser"><button className="btn btn-dark">Add User</button></Link>
            <br></br> <br></br> */}
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Birthdate</th>
                        <th scope="col">Address</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="table-light">
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthdate}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>{user.usertype}</td>

                            <td>
                                <Link to={`/UpdateUser/${user.id}`}><button className="btn btn-dark">Update</button></Link>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default UserManagement;

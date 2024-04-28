import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";

function Sidebar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            axios.get("http://localhost:8000/api/allUser/", { headers: { Authorization: `Token ${token}` } })
                .then((response) => {
                    if (response.data.Users.length > 0) {
                        setUser(response.data.Users[0]);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        }
    }, []);
    
    const navigate = useNavigate();
    
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
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
    };
  return (
    <>
     <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/Admin">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            {/* <Link className="nav-link" to="/addCategory">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Add Category
                            </Link> */}
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts2" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Category
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts2" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/addCategory">Add Category</Link>
                                    <Link className="nav-link" to="/viewCategory">view Category</Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts3" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Sub Category
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts3" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/addsubcategory">Add Sub Category</Link>
                                    <Link className="nav-link" to="/viewsubcategory">List Sub Category</Link>
                                </nav>
                            </div>
                            
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts4" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Product
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts4" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/AdminAddPro">Add Product</Link>
                                    <Link className="nav-link" to="/ProductManagement">view Products </Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts5" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                User
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts5" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/UserManagement">view users</Link>
                                    <Link className="nav-link" to="/AddUser">Add User </Link>
                                </nav>
                            </div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts6" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Plan
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts6" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/VendorPayment">Vendor history</Link>
                                    <Link className="nav-link" to="/PlanManagment">Add plan </Link>
                                </nav>
                            </div>
                            <Link className="nav-link" to="/order">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Orders
                            </Link>
                           
                            <div className="sb-sidenav-menu-heading">Addons</div>
                            <Link className="nav-link" to="/Admin">
                                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                Charts
                            </Link>
                            {/* <Link className="nav-link" to="#">
                                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                                Tables
                            </Link> */}
                           
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <div className="sb-sidenav-footer">
                    <div className="small">Logged in as: {user ? user.first_name : ''}</div>
                    </div>
                    <button onClick={handleLogout} style={{backgroundColor:"rgb(33, 37, 41)"}}>
                                Logout
                            </button>
                </nav>
    </>
  )
}

export default Sidebar


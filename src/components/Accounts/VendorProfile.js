
import React from 'react';
import {  useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from "react";
import SubscriptionVendor from '../plan/SubscriptionVendor';

import { Link } from "react-router-dom";
function VendorProfile() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const baseImageUrl = "http://127.0.0.1:8000";
  const handleLogout = () => {
    const token = Cookies.get('token');
    Cookies.remove('token');
    const headers = {
      Authorization: `Token ${token}`
    };
    axios.post('http://localhost:8000/api/logout/', null, { headers })
      .then(() => {
        console.log("Logout successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  /////////////////////////////////////////////////////////

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
    birthdate: ''
  });
  useEffect(() => {
    const token = Cookies.get('token');
    const headers = {
      Authorization: `Token ${token}`
    };

    axios.get('http://localhost:8000/api/profile/', { headers })
      .then((res) => {
        setUser(res.data.message);
        setUserId(res.data.message.id);
        setUpdatedUser(res.data.message);

      })
      .catch((error) => {
        console.error("Fetch user error:", error);

      });
  }, []);
  

  useEffect(() => {
    if (user && user.usertype === 'customer') {
      navigate("/not-found");
    }
  }, [user, navigate]);

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/API/allpro/`)
      .then((res) => {

        const filteredProducts = res.data.products.filter(product => product.vendor === userId);
        setProducts(filteredProducts);
      })
      .catch((err) => console.log(err));
  },);




  return (
    <>

      <div className='bodyvendor'>

      <div class="vendorView container ">
        <h3 className=' font-weight-bold font-family-lobster  text-uppercase text-center'>Welcome {user ? user.first_name : ''}   </h3>
        {user && (
          <div >
            <h5 className=' font-weight-bold' style={{ color: "#dc3545" }}>Vendor Info</h5>
            <p className='mt-3'> <span className='font-weight-bold'> Email:</span> {user.email}</p>
            <p> <span className='font-weight-bold'> First Name:</span>  {user.first_name}</p>
            <p> <span className='font-weight-bold'> Last Name:</span>  {user.last_name}</p>
            <p> <span className='font-weight-bold'> User Type:</span>  {user.usertype}</p>
            <p> <span className='font-weight-bold'> Shop name:</span>  {user.shopname}</p>
            <SubscriptionVendor vendorId={userId} />
            <Link
                to="/VerifyOTP"
                className="header__right__auth__link"
                style={{ color: "#007bff" }}
              >
                Change Password
              </Link>
          </div>
        )}
      </div>



      <div className="row mt-5 mx-2">
        {products.map((prod) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mix women"
            key={prod.id}
          >
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{
                  backgroundImage: `url('${baseImageUrl}${prod.image}')`,
                }}
              >
                {prod.new ? (
                  <div className="label new">New</div>
                ) : prod.sale ? (
                  <div className="label sale">Sale</div>
                ) : prod.stock === 0 ? (
                  <div className="label stockout">out of stock</div>
                ) : null}
                <ul className="product__hover">
                  <li>
                    <a href={prod.image} className="image-popup">
                      <a href={`/vendorpro/${prod.id}`}>
                        {" "}
                        <span className="arrow_expand"></span>
                      </a>
                    </a>
                  </li>


                </ul>
              </div>
              <div className="product__item__text">
                <h6>
                  <a href="h">{prod.name}</a>
                </h6>

                {prod.sale ? (
                  <div
                    className="product__price  "
                    style={{ color: "#ca1515" }}
                  >
                    {prod.newprice} <span>{prod.price}</span>
                  </div>
                ) : (
                  <div className="product__price">{prod.price}</div>
                )}




              </div>
            </div>
          </div>
        ))}
      </div>




      </div>

    </>
  );
}


export default VendorProfile;
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../../apis/configpaln";
import Cookies from "js-cookie";
import { axiosInstance } from "../../apis/config";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCount, setItemsid } from "../../store/slices/total";

function Thankyou() {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const orderTmp = Cookies.get("orderTmp");
  const headers = {
    Authorization: `Token ${token}`,
  };
  useEffect(() => {
    axiosInstance
      .get("/API/orders/Tmp", { headers })
      .then((res) => {
        console.log(res.data.orders[0]);
        const data = {
          first_name: res.data.orders[0].first_name,
          last_name: res.data.orders[0].last_name,
          country: res.data.orders[0].country,
          city: res.data.orders[0].city,
          zip_code: res.data.orders[0].zip_code,
          state: res.data.orders[0].state,
          street: res.data.orders[0].street,
          phone_number: res.data.orders[0].phone_number,
          email: res.data.orders[0].email,
          order_Items: res.data.orders[0].orderItems,
        };

        axiosInstance
          .post("/API/orders/new/", data, { headers })
          .then((res) => {
            console.log(res);
            axiosInstance
              .get(`/api/cart/list/`, { headers })
              .then((res) => {
                console.log(res.data.total_items_count);
                console.log(res.data.cart_items.map((item) => item.item));
                dispatch(setTotalCount(res.data.total_items_count));
                dispatch(
                  setItemsid(res.data.cart_items.map((item) => item.item))
                );
              })
              .catch((err) => console.log(err));
            axiosInstance
              .get("/API/orders/Tmp", { headers })
              .then((res) => {
                console.log(res.data.orders[0].id);
                axiosInstance
                  .delete(`/API/orders/${res.data.orders[0].id}/deleteTmp/`, {
                    headers,
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home"></i> Home
                </Link>
                <span>Thank You</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      <div className="py-4">
        <div className="container">
          <div className="col-md-12">
            <div className="card text-center p-5">
              <h4 className="text-success mb-4">
                Thanks for purchasing with our fashion store
              </h4>
              <p className="lead">
                Your order has been successfully placed. We appreciate your
                business!
              </p>
              <img
                src="https://i.etsystatic.com/39068520/r/il/75b3f7/4487468309/il_fullxfull.4487468309_5tbx.jpg" // Replace with your image URL
                alt="Thank You"
                className="img-fluid mt-4 mb-4 mx-auto" // Added mx-auto to center the image
                style={{ maxWidth: "50%", height: "auto" }}
              />
              <p className="text-muted">
                For any inquiries or issues, please contact our customer
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;

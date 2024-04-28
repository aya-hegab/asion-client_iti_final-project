import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { clearAllListeners } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const Orderdetails = () => {
  const [orderdetails, setOrderdetails] = useState({});
  const params = useParams();
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/API/orders/${params.id}/`, { headers })
      .then((res) => {
        console.log(res.data.order);
        console.log(res.data.order.orderItems);
        setOrderdetails(res.data.order);
      })
      .catch((err) => console.log(err));
  }, []);

  // const updateStatus = async (order) => {
  //   if (order.status !== "D") {
  //     try {
  //       const response = await axiosInstance.put(
  //         `/api/delivaryman/update/${order.id}`,
  //         null,
  //         { headers }
  //       );
  // if (order.status === "P") {
  //   order.status = "S";
  // } else if (order.status === "S") {
  //   order.status = "D";
  // }
  // setOrderdetails({ ...order });
  //     } catch (error) {
  //       console.error("Error:", error.response);
  //     }
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  // };

  const orderFailed = async (order) => {
    if (order.status === "S") {
      try {
        const response = await axiosInstance.put(
          `/api/delivaryman/failed/${order.id}`,
          null,
          { headers }
        );
        // if (order.status === "P") {
        // order.status = "S";
        // } else if (order.status === "S") {
        order.status = "F";
        // }
        setOrderdetails({ ...order });
      } catch (error) {
        console.error("Error:", error.response);
      }
      console.log("yes");
    } else {
      console.log("no");
    }
  };

  const orderDelivered = async (order) => {
    if (order.status === "S") {
      try {
        const response = await axiosInstance.put(
          `/api/delivaryman/delivered/${order.id}`,
          null,
          { headers }
        );
        // if (order.status === "P") {
        // order.status = "S";
        // } else if (order.status === "S") {
        order.status = "D";
        // }
        setOrderdetails({ ...order });
      } catch (error) {
        console.error("Error:", error.response);
      }
      console.log("yes");
    } else {
      console.log("no");
    }
  };

  return (
    <div className="populer container p-4 mt-5 ">
      <div className="card text-center mb-5">
        <div className="card-header">
          <span
            style={{
              color: "#ca1515",
            }}
          >
            code:
          </span>{" "}
          {orderdetails.id}
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              email:
            </span>{" "}
            {orderdetails.email}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              total:
            </span>{" "}
            <span className="text-success">${orderdetails.total_price}</span>
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              phone number:
            </span>{" "}
            {orderdetails.phone_number}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              city:
            </span>{" "}
            {orderdetails.city}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              name:
            </span>{" "}
            {orderdetails.first_name} {orderdetails.last_name}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              date:
            </span>{" "}
            {orderdetails.placed_at}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              state:
            </span>{" "}
            {orderdetails.state}
          </h5>
          <h5 className="card-title">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              street:
            </span>{" "}
            {orderdetails.street}
          </h5>
          <h5 className="card-title mb-4">
            <span
              style={{
                color: "#ca1515",
              }}
            >
              zip code:
            </span>{" "}
            {orderdetails.zip_code}
          </h5>
          {orderdetails.orderItems &&
            orderdetails.orderItems.map((product) => {
              return (
                <ol
                  key={product.id}
                  className="list-group list-group-numbered "
                >
                  <li className="list-group-item d-flex justify-content-center align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{product.name}</div>
                      price:
                      <span className="text-success"> ${product.price}</span>
                      <div className="fw-bold">
                        total:{" "}
                        <span className="text-success">
                          ${product.price * product.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="badge text-bg-primary rounded-pill">
                      {product.quantity}
                    </span>
                  </li>
                </ol>
              );
            })}
        </div>
        <div className="card-footer text-muted">
          <button
            type="button"
            className="site-btn"
            style={{
              backgroundColor:
                orderdetails.status === "D" || orderdetails.status === "F"
                  ? "gray"
                  : null,
            }}
            onClick={() => orderDelivered(orderdetails)}
          >
            Delivered
          </button>
          <button
            type="button"
            className="site-btn ms-2"
            style={{
              backgroundColor:
                orderdetails.status === "D" || orderdetails.status === "F"
                  ? "gray"
                  : null,
            }}
            onClick={() => orderFailed(orderdetails)}
          >
            Failed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderdetails;

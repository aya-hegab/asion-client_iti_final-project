import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Order() {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/API/orders/`, { headers })
      .then((res) => {
        setOrdersList(res.data.orders);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewOrderItems = (orderItems) => {
    setSelectedOrderItems(orderItems);
  };
  const updateStatus = async (order) => {
    if (order.status === "R") {
      axiosInstance
        .put(`/API/shiporders/${order.id}`, null, { headers })
        .then((res) => {
          const updatedItemIndex = ordersList.findIndex(
            (item) => item.id === order.id
          );
          const updatedItem = { ...ordersList[updatedItemIndex] };

          updatedItem.status = "S";

          const updatedItems = [...ordersList];
          updatedItems[updatedItemIndex] = updatedItem;
          setOrdersList(updatedItems);
        })
        .catch((err) => console.log(err));
    } else if (order.status === "C" || order.status === "F") {
      axiosInstance
        .put(`/API/refundmoney/${order.id}`, null, { headers })
        .then((res) => {
          const updatedItemIndex = ordersList.findIndex(
            (item) => item.id === order.id
          );
          const updatedItem = { ...ordersList[updatedItemIndex] };

          updatedItem.status = "RF";

          const updatedItems = [...ordersList];
          updatedItems[updatedItemIndex] = updatedItem;
          setOrdersList(updatedItems);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <main>
      <div className="container px-4 mt-3">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Orders
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="datatablesSimple"
                className="table table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    {/* <th>Country</th> */}
                    <th>City</th>
                    <th>Street</th>
                    <th>Zip Code</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>More Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.first_name}</td>
                      <td>{order.last_name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone_number}</td>
                      {/* <td>{order.country}</td> */}
                      <td>{order.city}</td>
                      <td>{order.street}</td>
                      <td>{order.zip_code}</td>
                      <td>{order.placed_at}</td>
                      <td>
                        {order.status === "P"
                          ? "Pending"
                          : order.status === "S"
                          ? "Shipped"
                          : order.status === "D"
                          ? "Delivered"
                          : order.status === "C"
                          ? "Cancelled"
                          : order.status === "R"
                          ? "Ready"
                          : order.status === "F"
                          ? "Failed"
                          : "Refunded"}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewOrderItems(order.orderItems)}
                        >
                          details
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          style={{
                            backgroundColor:
                              order.status === "D" ||
                              order.status === "P" ||
                              order.status === "S" ||
                              order.status === "RF"
                                ? "gray"
                                : null,
                            border: "none",
                          }}
                          onClick={() => updateStatus(order)}
                        >
                          {order.status === "C" || order.status === "F"
                            ? "REFUND"
                            : order.status === "R"
                            ? "SHIP"
                            : "No Action"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-4 mt-3">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-table me-1"></i>
            Order Items
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Product_id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Order;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { clearAllListeners } from "@reduxjs/toolkit";

const Vendorpending = () => {
  const [orderslist, setOrderslist] = useState([]);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/API/orders/items`, { headers })
      .then((res) => {
        console.log(res.data.order_items);
        setOrderslist(res.data.order_items);
      })
      .catch((err) => console.log(err.data));
  }, []);

  const shipProduct = async (product) => {
    if (!product.isReady) {
      axiosInstance
        .put(`/API/orders/${product.id}`, null, { headers })
        .then((res) => {
          const updatedItemIndex = orderslist.findIndex(
            (item) => item.id === product.id
          );
          const updatedItem = { ...orderslist[updatedItemIndex] };

          updatedItem.isReady = true;

          const updatedItems = [...orderslist];
          updatedItems[updatedItemIndex] = updatedItem;
          setOrderslist(updatedItems);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <main>
      <div className="container px-4 mt-3">
        {/* <h1 className="mt-4">Orders</h1> */}
        {/* <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                        <li className="breadcrumb-item active">Tables</li>
                    </ol> */}
        {/* <div className="card mb-4">
                        <div className="card-body">
                            DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the
                            <Link target="_blank" to="https://datatables.net/">official DataTables documentation</Link>
                            .
                        </div>
                    </div> */}
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
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Size</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orderslist.map((order) => {
                    return (
                      <>
                        <tr>
                          <td>
                            {" "}
                            <a href={`/vendorpro/${order.product}`}>
                              {" "}
                              {order.name}
                            </a>
                          </td>
                          <td>{order.price}</td>
                          <td>{order.quantity}</td>
                          <td>{order.size}</td>
                          <td>
                            <button
                              type="button"
                              className="site-btn"
                              style={{
                                backgroundColor:
                                  order.isReady === true && "gray",
                              }}
                              onClick={() => shipProduct(order)}
                            >
                              {order.isReady === false ? "Ship" : "Done"}
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Vendorpending;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";

const VendorOrder = () => {
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
    };

    const [vendorproducts, setVendorProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost:8000/api/profile/', { headers })
            .then((res) => {
                setUser(res.data.message);
                setUserId(res.data.message.id);
            })
            .catch((error) => {
                console.error("Fetch user error:", error);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`http://127.0.0.1:8000/API/allpro/`)
            .then((res) => {
                const filteredProducts = res.data.products.filter(product => product.vendor === userId);
                setVendorProducts(filteredProducts);
            })
            .catch((err) => console.log(err));
    }, [userId]);

    useEffect(() => {
        axiosInstance
            .get(`http://127.0.0.1:8000/API/orders`, { headers })
            .then((res) => {
                // Assuming orderItems is an array in each order object
                const filteredOrders = res.data.orders.filter(order =>
                    vendorproducts.some(product => product.id === order.orderItems[0].product)
                );
                setOrders(filteredOrders);
            })
            .catch((err) => console.log(err));
    }, [vendorproducts]);
    

    console.log("Vendor Products:", vendorproducts);
    console.log("Orders:", orders);

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
                <table id="datatablesSimple" className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Product Id</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>quantity</th>
                      <th>size</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderItems[0].product}</td>
                        <td>{order.orderItems[0].name}</td>
                        <td>{order.orderItems[0].price}</td>
                        <td>{order.orderItems[0].quantity}</td>
                        <td>{order.orderItems[0].size}</td>
                        <td>{order.placed_at}</td>
                        <td>{order.status}</td>
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
};

export default VendorOrder;

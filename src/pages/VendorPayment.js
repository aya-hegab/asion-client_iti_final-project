import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../apis/configpaln';
import { Card, Button } from 'react-bootstrap';
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";

const VendorPayment = () => {
    const [alldata, setalldata] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axiosInstance.get("http://127.0.0.1:8000/api/payment-history/")
            .then(res => {
                setalldata(res.data)
                console.log(res.data.payment_status)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    console.log(alldata)
    return (
        <div style={{display:'flex',justifyContent:'center' ,marginTop:'15px'}}>
            <div className="card" style={{ width: "1450px" }}>
                <div className="card-header bg-dark text-white ">
                    <h3 className="mb-0 ">history payment for vendor</h3>
                </div>
                <div className="card-body">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Vendor ID </th>
                                    <th>Plan Id </th>
                                    <th>stock</th>
                            
                                </tr>
                            </thead>
                            <tbody>
                                {alldata.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.vendor}</td>
                                        <td>{data.plan}</td>
                                        <td>{data.stock}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorPayment;

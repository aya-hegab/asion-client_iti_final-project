import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
function ProductManagement() {
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
    };
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axiosInstance.get("/API/allpro/")
            .then(res => {
                setProducts(res.data.products)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };


    const handleDeleteProduct = (productId) => {
        console.log(productId)
        axiosInstance.delete(`http://127.0.0.1:8000/API/deleteProduct/${productId}/`, { headers })
            .then(() => {
                console.log("Product deleted successfully");
                setProducts(products.filter(product => product.id !== productId));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };


    return (
        <>


            <div className="card" >
                <div className="card-header bg-dark text-white " >
                    <h3 className="mb-0 " >All Products</h3>
                </div>
                <div className="card-body">
                    <Link to={`/AdminAddPro`} className="btn btn-info mb-3">Add New Product</Link>
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Ratings</th>
                                    <th>Price</th>
                                    <th>New Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((prod) => (
                                    <tr key={prod.id}>
                                        <td>{prod.id}</td>
                                        <td>{prod.name}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8000${prod.image}`} alt={prod.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                        </td>
                                        <td>{prod.description}</td>
                                        <td>{prod.brand}</td>
                                        <td>{prod.category}</td>
                                        <td>{prod.ratings}</td>
                                        <td>{prod.price}</td>
                                        <td>{prod.newprice}</td>
                                        <td>
                                            <button className="btn btn-danger pe-2" style={{ width: '100px' }} onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                                            <Link to={`/AdminUpdatePro/${prod.id}`} className="btn-success mt-1 btn" style={{ width: '100px' }}>Update</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProductManagement;

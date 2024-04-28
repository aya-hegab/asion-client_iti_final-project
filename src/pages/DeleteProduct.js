import { axiosInstance } from "../apis/config";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import warning from '../imags/warning.png'
import Cookies from "js-cookie";



const DeleteProduct = () => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);




    const params = useParams();
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };



    const handleconfirmDelete = async () => {
        try {
            await axiosInstance.delete(`/API/deleteProduct/${params.id}/`, { headers });
            setIsDeleted(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product.');
        }
    };


    return (
        <div>
            {isDeleted ? (
                <>
                    <p className="mt-5 mx-5 ">Product deleted successfully.</p>
                    <button className="homeBtn  mx-5 " >
                        <a href={`/vendorprofile`}>Back To Home</a>
                    </button></>
            ) : (
                <>



                    <div className="container    ">
                        <div className="col-lg-4 col-6">
                            <img
                                className="warn "
                                src={warning}
                                alt="warn"
                            />
                            <h5>This action cannot be undone. Deleting the Product will remove it permanently .</h5>
                        </div>

                        <div className="row">

                            <div className="confirmation-modal col-lg-4 col-12 mt-5">

                                <p>Are you sure you want to delete?</p>
                                <div className="confirmation-buttons">
                                    <button className="deleteButton" onClick={handleconfirmDelete} >Yes, Delete</button>
                                    <button className="cancelBtn" >
                                        <a href={`/vendorprofile`}>Cancel</a>
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>







                </>




            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteProduct;
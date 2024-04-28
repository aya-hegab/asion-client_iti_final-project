
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
import { faImage, faMoneyBillAlt, faTag, faBalanceScale, faPlus, faWarehouse, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";



const AdminAddPro = () => {


    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };

    const [selectedVendorId, setSelectedVendorId] = useState('');
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [addPro, setAddPro] = useState({
        vendor: '',
        name: '',
        description: '',
        price: '',
        brand: '',
        stock: "0",
        ratings: '',
        new: true,
        sale: true,
        newprice: '',
        category: '',
        subcategory: '',
        stock_S: '',
        stock_M: '',
        stock_L: '',
        stock_XL: '',
        sizeable: '',
        image: null,
        subImageOne: null,
        subImageTwo: null,
        subImageThree: null,
        subImageFour: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [vendors, setVendors] = useState([]);





    /////////////////////////////////////////////////////////
    const navigate = useNavigate();
    const [userId, setUser] = useState(null);
    const [user, setuser] = useState(null);
    useEffect(() => {
        const token = Cookies.get('token');
        const headers = {
            Authorization: `Token ${token}`
        };

        axiosInstance.get('http://localhost:8000/api/profile/', { headers })
            .then((res) => {
                setuser(res.data.message)
                setUser(res.data.message.id);
                console.log("ssss", res.data.message.id);

            })
            .catch((error) => {
                console.error("Fetch user error:", error);

            });
    }, []);




    useEffect(() => {
        // Fetch all users from the backend API
        axiosInstance.get('http://127.0.0.1:8000/api/allUser/', { headers })
            .then(res => {
                console.log('Raw data from API:', res.data); // Debugging statement
                // Filter users to get only vendors
                const vendors = res.data.Users.filter(user => user.usertype === 'vendor');
                console.log('Vendors:', vendors); // Debugging statement
                // Set the list of vendors in state
                setVendors(vendors);
            })
            .catch(error => {
                console.error('Error fetching vendors:', error);
            });
    }, []);



    useEffect(() => {
        if (user && user.usertype === 'customer') {
            navigate("/not-found");
        }
    }, [user, navigate]);



    useEffect(() => {
        axiosInstance.get('/API/categories/', { headers })
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);






    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setAddPro({
                ...addPro,
                [name]: checked
            });
        } else {
            setAddPro({
                ...addPro,
                [name]: value
            });



            switch (name) {
                case 'name':
                    if (errors.includes('Please fill name.')) {
                        const newErrors = errors.filter(error => error !== 'Please fill name.');
                        setErrors(newErrors);
                    }
                    break;
                case 'description':
                    if (errors.includes('Please fill description.')) {
                        const newErrors = errors.filter(error => error !== 'Please fill description.');
                        setErrors(newErrors);
                    }
                    break;
                case 'price':
                    if (errors.includes('Please fill price')) {
                        const newErrors = errors.filter(error => error !== 'Please fill price');
                        setErrors(newErrors);
                    }
                    break;
                case 'brand':
                    if (errors.includes('Please fill brand')) {
                        const newErrors = errors.filter(error => error !== 'Please fill brand');
                        setErrors(newErrors);
                    }
                    break;
                case 'cateegory':
                    if (errors.includes('Please fill category')) {
                        const newErrors = errors.filter(error => error !== 'Please fill category');
                        setErrors(newErrors);
                    }
                    break;

                default:
                    break;
            }





        }





    };


    const handleBlur = (fieldName, errorMessage) => {
        return () => {
            if (!addPro[fieldName]) {
                const newErrors = [...errors, errorMessage];
                setErrors(newErrors);
            }
        };
    };

    const handleImageChange = (e) => {
        if (e.target.name === "image") {
            setAddPro({
                ...addPro,
                image: e.target.files[0]
            });
        } else if (e.target.name === "subImageOne") {
            setAddPro({
                ...addPro,
                subImageOne: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageTwo") {
            setAddPro({
                ...addPro,
                subImageTwo: e.target.files[0]
            });
        }
        else if (e.target.name === "subImageThree") {
            setAddPro({
                ...addPro,
                subImageThree: e.target.files[0]
            });
        }

        else if (e.target.name === "subImageFour") {
            setAddPro({
                ...addPro,
                subImageFour: e.target.files[0]
            });
        }


    };

    /*const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
        setSubCategories(selectedCategory.subcategories);
        setAddPro({ ...addPro, category: selectedCategoryId, subcategory: '' });
    };*/


    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;

        // Check if the selected category is not "Select Category"
        if (selectedCategoryId !== "") {
            const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
            setSubCategories(selectedCategory.subcategories);
        } else {
            // If the selected category is "Select Category", set subcategories to an empty array
            setSubCategories([]);
        }

        setAddPro({ ...addPro, category: selectedCategoryId, subcategory: '' });
    };



    ////////////////////
    // deny to add new product 
    /*console.log("user Id", userId)
    const [expired, setExpired] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);*/
    /* useEffect(() => {
         // Reset expired state when component mounts
         axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${vendor}`, { headers })
             .then((res) => {
                 setSubscriptionInfo(res.data);
             })
             .catch((error) => {
                 console.error('Error fetching subscription info:', error);
               
             });
     }, [userId]); */// Add userId as a dependency to trigger useEffect when it changes


    useEffect(() => {
        // Reset expired state when component mounts
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${selectedVendorId}`, { headers })
            .then((res) => {
                /* setSubscriptionInfo(res.data);*/
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [selectedVendorId]);




    /*
        useEffect(() => {
            if (subscriptionInfo && subscriptionInfo.stock) {
                const remainingProducts = getRemainingProducts(subscriptionInfo);
                console.log("use eee", remainingProducts);
                const isExpired = remainingProducts == 0;
                setExpired(isExpired);
                console.log("isExpired", isExpired)
    
                console.log(expired) // Update the expired state
    
            }
        }, [subscriptionInfo]);
    
        const getRemainingProducts = (subscriptionInfo) => {
            let productLimit = 0;
            switch (subscriptionInfo.plan) {
                case 1:
                    productLimit = 500;
                    break;
                case 2:
                    productLimit = 1200;
                    break;
                case 3:
                    productLimit = 2500;
                    break;
                default:
                    productLimit = 0;
            }
            console.log("in eee", subscriptionInfo.stock);
            return productLimit - subscriptionInfo.stock;
    
        };
    
    */


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        if (!selectedVendorId) {
            newErrors.push('Please select a vendor.');
        }
        // Append selected vendor ID to form data
        formData.append('vendor', selectedVendorId)
        const newErrors = [];

        if (!addPro.name) {
            newErrors.push('Please fill name.');
        }
        if (addPro.price <= 0) {
            newErrors.push('the price must be greater than zero.');
        }
        if (addPro.newprice < 0) {
            newErrors.push('the new price must be greater than zero.');
        }
        if (!addPro.description) {
            newErrors.push('Please fill description.');
        }
        if (!addPro.price) {
            newErrors.push('Please fill price');
        }
        if (!addPro.brand) {
            newErrors.push('Please fill brand');
        }
        if (!addPro.sizeable && !addPro.stock) {
            newErrors.push('Please fill stock.');
        }
        if (addPro.sizeable && (!addPro.stock_S || !addPro.stock_L || !addPro.stock_M || !addPro.stock_XL)) {
            newErrors.push('Please fill stock.');
        }
        if (addPro.category === '') {
            newErrors.push('Please select category');
        }
        if (addPro.newprice && addPro.price && parseFloat(addPro.newprice) >= parseFloat(addPro.price)) {
            newErrors.push('New price should be less than the original price.');
        }
        setErrors(newErrors);

        if (newErrors.length > 0) {
            return;
        }

        if (newErrors.length === 0) {
            Object.keys(addPro).forEach(key => {
                formData.append(key, addPro[key]);
            });
        }

        formData.append('vendor', addPro.vendor)
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${addPro.vendor}`, { headers })
            .then(res => {
                let newStockData;
                if (addPro.sizeable) {
                    // If sizable, add current stock to individual stock values
                    const currentStock = res.data.stock; // Assuming the latest stock is at index 0
                    const newStock = parseInt(currentStock)
                        + parseInt(addPro.stock_S)
                        + parseInt(addPro.stock_M)
                        + parseInt(addPro.stock_L)
                        + parseInt(addPro.stock_XL);
                    newStockData = {
                        vendor: addPro.vendor,
                        stock: newStock
                    };
                } else {
                    // Otherwise, use the single stock value
                    const currentStock = res.data.stock; // Assuming the latest stock is at index 0
                    const newStock = parseInt(currentStock) + parseInt(addPro.stock); // Calculate new stock by adding current and new stock
                    newStockData = { vendor: addPro.vendor, stock: newStock };
                }
                // Update stock using the stockupdate API
                axiosInstance.post('http://127.0.0.1:8000/api/stockupdate/', newStockData, { headers })
                    .then(res => {
                        console.log('Stock updated successfully:', res.data);
                    })
                    .catch(error => {
                        console.error('Error updating stock:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching current stock:', error);
            });



        axiosInstance.post('/API/addProduct/', formData, { headers })
            .then(res => {
                setSuccessMessage('Product successfully added');
                console.log(res.data)
                event.target.reset();
                setAddPro({
                    vendor: '',
                    name: '',
                    description: '',
                    price: '',
                    brand: '',
                    stock: '',
                    new: true,
                    sale: true,
                    newprice: '',
                    category: '',
                    subcategory: '',
                    stock_S: '',
                    stock_M: '',
                    stock_L: '',
                    stock_XL: '',
                    sizeable: '',
                    image: null,
                    subImageOne: null,
                    subImageTwo: null,
                    subImageThree: null,
                    subImageFour: null

                });
                setErrors([]);
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };


    /*
        console.log("subscriptionInfo",subscriptionInfo)
        useEffect(() => {
            if(subscriptionInfo !=null){
                console.log("subscriptionInfo")
                console.log("subscriptionInfo.payment_status",subscriptionInfo.payment_status)
            if ((expired || !subscriptionInfo.payment_status)) {
                alert('Your subscription has expired. Please renew your subscription to add products.');
                navigate('/vendorprofile');
                console.log("subscriptionInfo")
                 // Redirect to homepage or another appropriate page
            }}
        }, [expired, subscriptionInfo, navigate]);
    */
    const handleVendorChange = (e) => {
        const selectedVendorId = e.target.value;
        setSelectedVendorId(selectedVendorId);
        setAddPro(prevState => ({
            ...prevState,
            vendor: selectedVendorId
        }));
    };

    return (
        <>
            <div className="card-header " style={{ color: '#FFFFFF' }}>
                <h3 className="mb-0 mt-3 ms-3 " style={{ color: 'black', }}>Add New Product</h3>
            </div>


            <div className="container mt-1">

                <div className="row justify-content-center">

                    <div className="col-md-6">
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">



                                <form onSubmit={handleSubmit} encType="multipart/form-data">

                                    <div className="mb-3">
                                        <label htmlFor="vendor" className="form-label">
                                            <FontAwesomeIcon icon={faTag} /> Vendor: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="vendor" name="vendor" value={selectedVendorId} onChange={handleVendorChange} className="form-control" required>
                                            <option value="">Select Vendor</option>
                                            {vendors.map(vendor => (
                                                <option key={vendor.id} value={vendor.id}>{vendor.email}</option>
                                            ))}

                                        </select>
                                        {selectedVendorId === "" && <div className="text-danger">Please select a specific vendor.</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faTag} /> Product Name: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text" id="name" name="name" value={addPro.name} onChange={handleChange} className="form-control"
                                            onBlur={handleBlur('name', 'Please fill name.')} required />
                                        {errors.includes('Please fill name.') && <div className="text-danger">Please fill name.</div>}
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            <FontAwesomeIcon icon={faWarehouse} /> Product Description: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <textarea id="description" name="description" value={addPro.description} onChange={handleChange} className="form-control" onBlur={handleBlur('description', 'Please fill description.')} required  ></textarea>
                                        {errors.includes('Please fill description.') && <div className="text-danger">Please fill description.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> Price: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text" id="price" name="price" value={addPro.price} onChange={handleChange} className="form-control" onBlur={handleBlur('price', 'Please fill price')} required />
                                        {errors.includes('Please fill price') && <div className="text-danger">Please fill price.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Brand: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text" id="brand" name="brand" value={addPro.brand} onChange={handleChange} className="form-control" onBlur={handleBlur('brand', 'Please fill brand')} required />
                                        {errors.includes('Please fill brand') && <div className="text-danger">Please fill brand.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">
                                            <FontAwesomeIcon icon={faBalanceScale} /> Stock: {!addPro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock" name="stock" value={addPro.stock} onChange={handleChange} className="form-control" required={!addPro?.sizeable === true} disabled={addPro.sizeable === true} />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="new" name="new" checked={addPro.new} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="new" className="form-check-label">New</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sale" name="sale" checked={addPro.sale} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sale" className="form-check-label">Sale</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sizeable" name="sizeable" checked={addPro.sizeable} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sizeable" className="form-check-label">sizeable</label>
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="newprice" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> New Price:
                                        </label>

                                        <input type="text" id="newprice" name="newprice" value={addPro.newprice} onChange={handleChange} className="form-control" />

                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Category:  <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="category" name="category" value={addPro.category} onChange={handleCategoryChange} className="form-control" >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (

                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>

                                        {errors.includes('Please select category') && <div className="text-danger">Please select category.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subcategory" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Subcategory: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="subcategory" name="subcategory" value={addPro.subcategory} onChange={handleChange} className="form-control" >

                                            {subcategories.map(subcategory => (
                                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                                            ))}
                                        </select>
                                        {errors.includes('Please select sub category') && <div className="text-danger">Please select sub category.</div>}
                                    </div>





                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">

                                    {addPro.sizeable && (!addPro.stock_S || !addPro.stock_M || !addPro.stock_L || !addPro.stock_XL) && (
                                        <div className="text-danger">Please fill all stock sizes.</div>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="stock_S" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (S): {addPro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_S" name="stock_S" value={addPro.stock_S} onChange={handleChange} className="form-control" required={addPro.sizeable === true} disabled={!addPro.sizeable === true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_M" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (M): {addPro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_M" name="stock_M" value={addPro.stock_M} onChange={handleChange} className="form-control" required={addPro.sizeable === true} disabled={!addPro.sizeable === true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_L" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (L): {addPro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_L" name="stock_L" value={addPro.stock_L} onChange={handleChange} className="form-control" required={addPro.sizeable === true} disabled={!addPro.sizeable === true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_XL" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (XL): {addPro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_XL" name="stock_XL" value={addPro.stock_XL} onChange={handleChange} className="form-control" required={addPro.sizeable === true} disabled={!addPro.sizeable === true} />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Main Image: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="file" id="image" name="image" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subImageOne" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image One: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="file" id="subImageOne" name="subImageOne" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageTwo" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Two: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="file" id="subImageTwo" name="subImageTwo" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subImageThree" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Three: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="file" id="subImageThree" name="subImageThree" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageFour" className="form-label">
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Four: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="file" id="subImageFour" name="subImageFour" onChange={handleImageChange} required className="form-control" multiple defaultValue="" />
                                    </div>




                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#8FBC8F', borderColor: '#8FBC8F' }} >Submit</button>
                                    {errors.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            Please fill all required fields.
                                        </div>
                                    )}
                                    {parseFloat(addPro.newprice) >= parseFloat(addPro.price) && (
                                        <div className="alert alert-danger" role="alert">
                                            New price should be less than the original price.
                                        </div>
                                    )}

                                    {successMessage && (
                                        <div className="alert alert-success" role="alert">
                                            {successMessage}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AdminAddPro;
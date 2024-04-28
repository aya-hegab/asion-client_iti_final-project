import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { axiosInstance } from "../apis/config";
import { faImage, faMoneyBillAlt, faTag, faBalanceScale, faPlus, faWarehouse, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UpdateProduct = () => {

    const params = useParams();
    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data'
    };


    const navigate = useNavigate();
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

        axiosInstance.get('http://localhost:8000/api/profile/', { headers })
            .then((res) => {
                setUser(res.data.message);
                setUserId(res.data.message.id);
                setUpdatedUser(res.data.message);

            })
            .catch((error) => {
                console.error("Fetch user error:", error);

            });
    }, []);
    const [imageFile, setImageFile] = useState(null); // State variable to store image file
    const [isNewImageSelected, setIsNewImageSelected] = useState(false); // State variable to track if new image is selected

    const [subcategories, setSubCategories] = useState([]);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [updatePro, setUpdatePro] = useState({
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
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axiosInstance.get('/API/categories/', { headers })
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const [checkstock, setCheckstock] = useState(0);
    useEffect(() => {
        axiosInstance.get(`/API/getProduct/${params.id}/`, { headers })
            .then(res => {
                setUpdatePro(res.data.product);
                setCheckstock(res.data.product.checkstock);
                console.log("ddd", checkstock);
                setErrors([]);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    navigate('/not-found'); // Redirect to not-found page if product is not found
                }
            });
    }, [params.id, setUpdatePro]);




    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setUpdatePro({
                ...updatePro,
                [name]: checked
            });
        } else if (type === 'file') {
            // If file input is changed, set isNewImageSelected accordingly
            setIsNewImageSelected(!!e.target.files[0]);
            setImageFile(e.target.files[0]);

        } else {
            setUpdatePro({
                ...updatePro,
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
            if (!updatePro[fieldName]) {
                const newErrors = [...errors, errorMessage];
                setErrors(newErrors);
            }
        };
    };

    const handleImageChange = (e) => {
        if ( e.target.name === "image") {
            const file = e.target.files[0];
            setUpdatePro({
                ...updatePro,
                image: file
            });
        } else if ( e.target.name === "subImageOne") {
            setUpdatePro({
                ...updatePro,
                subImageOne: e.target.files[0]
            });
        }
        else if ( e.target.name === "subImageTwo") {
            setUpdatePro({
                ...updatePro,
                subImageTwo: e.target.files[0]
            });
        }
        else if (  e.target.name === "subImageThree") {
            setUpdatePro({
                ...updatePro,
                subImageThree: e.target.files[0]
            });
        }

        else if (  e.target.name === "subImageFour") {
            setUpdatePro({
                ...updatePro,
                subImageFour: e.target.files[0]
            });
        }


    };

    /*const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
        setSubCategories(selectedCategory.subcategories);
        setUpdatePro({ ...updatePro, category: selectedCategoryId, subcategory: '' });
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

        setUpdatePro({ ...updatePro, category: selectedCategoryId, subcategory: '' });
    };

    const [expired, setExpired] = useState(false);
    const [subscriptionInfo, setSubscriptionInfo] = useState(null);
    useEffect(() => {
        // Reset expired state when component mounts
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`, { headers })
            .then((res) => {
                setSubscriptionInfo(res.data);
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, [userId]); // Add userId as a dependency to trigger useEffect when it changes
    const [Plan, setPlan] = useState(null);
    useEffect(() => {
        axiosInstance.get(`http://127.0.0.1:8000/api/plans/`)
            .then((res) => {
                setPlan(res.data); 
            })
            .catch((error) => {
                console.error('Error fetching subscription info:', error);
            });
    }, []); 
    useEffect(() => {
        if (subscriptionInfo && subscriptionInfo.stock) {
            const remainingProducts = getRemainingProducts(subscriptionInfo);
            console.log("use eee", remainingProducts);
            const isExpired = remainingProducts <= 0;
            setExpired(isExpired);
            console.log("isExpired", isExpired)

            console.log(expired) // Update the expired state

        }
    }, [subscriptionInfo]);
    useEffect(() => {
        // Check if subscription has expired
        if (expired) {
            alert('Your subscription has expired. Please renew your subscription to add products.');
            navigate('/vendorprofile'); // Redirect to homepage or another appropriate page
        }
    }, [expired]);

    const getRemainingProducts = (subscriptionInfo) => {
        let productLimit = 0;
        console.log('lllllllllll',Plan)
        if (subscriptionInfo) {
            const plan = Plan.find(plan => plan.id === subscriptionInfo.plan);
            console.log('kkkkkkkkkkkk',plan)
         
                productLimit = plan.count;
                console.log('ppppp',productLimit)

        }
        console.log("in eee", subscriptionInfo.stock);
        return productLimit - subscriptionInfo.stock;

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(updatePro).forEach(key => {
            formData.append(key, updatePro[key]);
        });

        // Append imageFile to formData only if a new image is selected
        if (isNewImageSelected && imageFile) {
            formData.append('image', imageFile);
        }


        // Check if the user has selected a new image
        if (updatePro.image) {
            formData.append('image', updatePro.image);
        }

        if (updatePro.subImageOne) {
            formData.append('subImageOne', updatePro.subImageOne);
        }

        
        if (updatePro.subImageTwo) {
            formData.append('subImageTwo', updatePro.subImageTwo);
        }

        if (updatePro.subImageThree) {
            formData.append('subImageThree', updatePro.subImageThree);
        }

        if (updatePro.subImageFour) {
            formData.append('subImageFour', updatePro.subImageFour);
        }


        const newErrors = [];

        if (!updatePro.name) {
            newErrors.push('Please fill name.');
        }
        if (updatePro.price <= 0) {
            newErrors.push('the price must be greater than zero.');
        }
        if (updatePro.newprice < 0) {
            newErrors.push('the new price must be greater than zero.');
        }
        if (!updatePro.description) {
            newErrors.push('Please fill description.');
        }
        if (!updatePro.price) {
            newErrors.push('Please fill price');
        }
        if (!updatePro.brand) {
            newErrors.push('Please fill brand');
        }
        if (!updatePro.sizeable && !updatePro.stock) {
            newErrors.push('Please fill stock.');
        }
        if (updatePro.sizeable && (!updatePro.stock_S || !updatePro.stock_L || !updatePro.stock_M || !updatePro.stock_XL)) {
            newErrors.push('Please fill stock.');
        }
        if (updatePro.category === '') {
            newErrors.push('Please select category');
        }
        if (updatePro.newprice && updatePro.price && parseFloat(updatePro.newprice) >= parseFloat(updatePro.price)) {
            newErrors.push('New price should be less than the original price.');
        }
        setErrors(newErrors);

        if (newErrors.length > 0) {
            return;
        }

        if (newErrors.length === 0) {
            Object.keys(updatePro).forEach(key => {
                formData.append(key, updatePro[key]);
            });
        }



        ///////////////////////////////////
        axiosInstance.get(`http://127.0.0.1:8000/api/last-vendor/?vendor=${userId}`, { headers })
            .then(res => {
                let newStockData;
                const currentStock = res.data.stock;

                if (updatePro.sizeable) {
                    const totalStock = parseInt(updatePro.stock_S || 0) + parseInt(updatePro.stock_M || 0) + parseInt(updatePro.stock_L || 0) + parseInt(updatePro.stock_XL || 0);
                    if (totalStock > checkstock) {
                        console.log("totalStock: " + totalStock);
                        console.log("checkstock: " + checkstock);
                        const sum = totalStock - checkstock;
                        console.log("sum: " + sum);
                        const newStock = parseInt(currentStock) + sum;
                        newStockData = {
                            vendor: userId,
                            stock: newStock
                        };
                        formData.append(checkstock,totalStock)
                        console.log("checkstock: " + checkstock);
                        
                    } else {
                        console.log("totalStock: " + totalStock);
                        console.log("checkstock: " + checkstock);
                        const sub = checkstock - totalStock;
                        console.log("sub: " + sub);
                        const newStock = parseInt(currentStock) - sub;
                        newStockData = {
                            vendor: userId,
                            stock: newStock
                        };
                        formData.append(checkstock,totalStock)
                        console.log("checkstock: " + checkstock);
                    }

                } else {
                    // If the product is not sizable, check if the updated stock is greater than the original stock
                    if (parseInt(updatePro.stock || 0) > checkstock) {
                        console.log("totalStock: " + updatePro.stock);
                        console.log("checkstock: " + checkstock);
                        const sum = updatePro.stock - checkstock;
                        console.log("sum: " + sum);
                        const newStock = parseInt(currentStock) + sum;
                        newStockData = {
                            vendor: userId,
                            stock: newStock
                        };
                        formData.append(checkstock,updatePro.stock)
                        console.log("checkstock: " + checkstock);
                    } else {
                        console.log("totalStock: " + updatePro.stock);
                        console.log("checkstock: " + checkstock);
                        const sub = checkstock - updatePro.stock;
                        console.log("sub: " + sub);
                        const newStock = parseInt(currentStock) - sub;
                        newStockData = {
                            vendor: userId,
                            stock: newStock
                        };
                        formData.append(checkstock,updatePro.stock)
                        console.log("checkstock: " + checkstock);
                    }
                }

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


        axiosInstance.put(`/API/updateProduct/${params.id}/`, formData, { headers })
            .then(res => {
                setUpdatePro(prevState => ({
                    ...prevState,
                    ...res.data.product
                }));
                setSuccessMessage('Product successfully updated');
                setErrors([]);

            })
            .catch(error => {
                console.error('Error updating product:', error);
                setErrors(['Error updating product']);
            });

    };

    console.log("checkstock: " + checkstock);




    return (
        <>
           {/* <div className="card-header" style={{ backgroundColor: '#ca1515', color: '#FFFFFF' }}>
                <h3 className="mb-0 " style={{ color: '#FFFFFF' }}>Update Product</h3>
            </div> */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            <FontAwesomeIcon icon={faTag} /> Product Name: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text" id="name" name="name" value={updatePro?.name || ''} onChange={handleChange} className="form-control" onBlur={handleBlur('name', 'Please fill name.')} required />
                                        {errors.includes('Please fill name.') && <div className="text-danger">Please fill name.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">
                                            <FontAwesomeIcon icon={faWarehouse} /> Product Description: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <textarea id="description" name="description" value={updatePro?.description || ''} onChange={handleChange} className="form-control" onBlur={handleBlur('description', 'Please fill description.')} required  ></textarea>
                                        {errors.includes('Please fill description.') && <div className="text-danger">Please fill description.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> Price: <span style={{ color: 'red' }}>*</span>
                                        </label>

                                        <input type="text" id="price" name="price" value={updatePro?.price || ''} onChange={handleChange} className="form-control" onBlur={handleBlur('price', 'Please fill price')} required />
                                        {errors.includes('Please fill price') && <div className="text-danger">Please fill price.</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="newprice" className="form-label">
                                            <FontAwesomeIcon icon={faDollarSign} /> New Price:
                                        </label>
                                        <input type="text" id="newprice" name="newprice" value={updatePro?.newprice || ''} onChange={handleChange} className="form-control" />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="brand" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Brand:  <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input type="text" id="brand" name="brand" value={updatePro?.brand || ''} onChange={handleChange} className="form-control" onBlur={handleBlur('brand', 'Please fill brand')} required />
                                        {errors.includes('Please fill brand') && <div className="text-danger">Please fill brand.</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">
                                            <FontAwesomeIcon icon={faBalanceScale} /> Stock: {!updatePro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock" name="stock" value={updatePro?.stock || ''} onChange={handleChange} className="form-control" required={!updatePro?.sizeable === true} disabled={updatePro?.sizeable === true} />

                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="new" name="new" checked={updatePro?.new || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="new" className="form-check-label">New</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sale" name="sale" checked={updatePro?.sale || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sale" className="form-check-label">Sale</label>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" id="sizeable" name="sizeable" checked={updatePro?.sizeable || ''} onChange={handleChange} className="form-check-input" />
                                        <label htmlFor="sizeable" className="form-check-label">sizeable</label>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_S" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (S): {updatePro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_S" name="stock_S" value={updatePro?.stock_S || ''} onChange={handleChange} className="form-control" required={updatePro?.sizeable === true} disabled={!updatePro?.sizeable === true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_M" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (M): {updatePro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_M" name="stock_M" value={updatePro?.stock_M || ''} onChange={handleChange} className="form-control" required={updatePro?.sizeable === true} disabled={!updatePro?.sizeable === true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="stock_L" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (L): {updatePro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_L" name="stock_L" value={updatePro?.stock_L || ''} onChange={handleChange} className="form-control" required={updatePro?.sizeable === true} disabled={!updatePro?.sizeable === true} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_XL" className="form-label">
                                            <FontAwesomeIcon icon={faPlus} /> Stock (XL): {updatePro.sizeable && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input type="number" id="stock_XL" name="stock_XL" value={updatePro?.stock_XL || ''} onChange={handleChange} className="form-control" required={updatePro.sizeable === true} disabled={!updatePro.sizeable === true} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Category:  <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="category" name="category" value={updatePro?.category || ''} onChange={handleCategoryChange} className="form-control" >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subcategory" className="form-label">
                                            <FontAwesomeIcon icon={faMoneyBillAlt} /> Subcategory:  <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <select id="subcategory" name="subcategory" value={updatePro?.subcategory || ''} onChange={handleChange} className="form-control" >

                                            {subcategories.map(subcategory => (
                                                <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                                            ))}
                                        </select>

                                        {errors.includes('Please select category') && <div className="text-danger">Please select category.</div>}
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-lg">
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">



                                    <div className="mb-3" >
                                    <label htmlFor="image" className="form-label" style={{display: 'block'}}>
                                    <FontAwesomeIcon icon={faImage} /> Product Main Image:
                                </label>
                                        {updatePro.image && (
                                            <img src={`http://127.0.0.1:8000${updatePro.image}`} alt="Product Main Image" style={{ maxWidth: '100px' }} />
                                        )}
                                        <input type="file" id="image" name="image" onChange={handleImageChange} className="form-control" />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="subImageOne" className="form-label "  style={{display: 'block'}}>
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image One: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        {updatePro.subImageOne && (
                                            <img src={`http://127.0.0.1:8000${updatePro.subImageOne}`} alt="Product Sub Image One" style={{ maxWidth: '100px' }} />
                                        )}
                                        <input type="file" id="subImageOne" name="subImageOne" onChange={handleImageChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageTwo" className="form-label"  style={{display: 'block'}}>
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Two: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        {updatePro.subImageTwo && (
                                            <img src={`http://127.0.0.1:8000${updatePro.subImageTwo}`} alt="Product Sub Image Two" style={{ maxWidth: '100px' }} />
                                        )}
                                        <input type="file" id="subImageTwo" name="subImageTwo" onChange={handleImageChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageThree" className="form-label"  style={{display: 'block'}}>
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Three: <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        {updatePro.subImageThree && (
                                            <img src={`http://127.0.0.1:8000${updatePro.subImageThree}`} alt="Product Sub Image Three" style={{ maxWidth: '100px' }} />
                                        )}
                                        <input type="file" id="subImageThree" name="subImageThree" onChange={handleImageChange} className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="subImageFour" className="form-label"  style={{display: 'block'}}>
                                            <FontAwesomeIcon icon={faImage} /> Product Sub Image Four:  <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        {updatePro.subImageFour && (
                                            <img src={`http://127.0.0.1:8000${updatePro.subImageFour}`} alt="Product Sub Image Four" style={{ maxWidth: '100px' }} />
                                        )}
                                        <input type="file" id="subImageFour" name="subImageFour" onChange={handleImageChange} className="form-control" />
                                    </div>



                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ca1515', borderColor: '#ca1515' }} >Submit</button>
                                    {errors.length > 0 && (
                                        <div className="alert alert-danger" role="alert">
                                            Please fill all required fields.
                                        </div>
                                    )}
                                    {parseFloat(updatePro.newprice) >= parseFloat(updatePro.price) && (
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

export default UpdateProduct;
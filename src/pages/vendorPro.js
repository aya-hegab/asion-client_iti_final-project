import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import rev from "../imags/rev.png";
import ProductRating from "../components/Shop/ProductRating";


const VendorProduct = () => {
    const dispatch = useDispatch();
    const userCookie = Cookies.get("token");
    console.log(userCookie);

    const userID = 2;
    const [loading, setLoading] = useState(true);
    const [proDetails, setProDetails] = useState({});

    const [productId, setProductId] = useState("");
    const [reviews, setReviews] = useState([]);

    const [selectedImage, setSelectedImage] = useState("");
    ;

    const token = Cookies.get("token");
    const headers = {
        Authorization: `Token ${token}`,
    };




    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const baseImageUrl = "http://127.0.0.1:8000";









    /*useEffect(() => {
         axiosInstance
             .get(`/API/getProduct/${params.id}/`, { headers })
             .then((res) => {
                 setProDetails(res.data.product);
                 setProductId(res.data.product.id);
 
 
             })
             .catch((err) => console.log(err));
     }, [params.id, userID]);*/







    /*useEffect(() => {
        // Set the selected image to the main image URL when component mounts
        setSelectedImage(proDetails.image);
    }, [proDetails]);*/


    useEffect(() => {
        axiosInstance
            .get(`/API/getProduct/${params.id}/`, { headers })
            .then((res) => {
                setProDetails(res.data.product);
                setSelectedImage(res.data.product.image);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    navigate('/not-found'); // Redirect to not-found page if product is not found
                } else {
                    console.log(err);
                }
            });
    }, [params.id, navigate]);





    useEffect(() => {
        axiosInstance
            .get(`/API/Review/listReviwes/`, { headers })
            .then((res) => {
                const productReviewss = res.data.data.filter(
                    (review) => review.product_id === proDetails.id
                );
                setReviews(productReviewss);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [proDetails.id]);












    return (
        <>


            <section className="product-details spad topheight ">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="product__big__img__container myimg" style={{ height: '570px' }}>
                                <img
                                    className="mypic"
                                    src={`${baseImageUrl}${selectedImage}`}
                                    alt="Product Image"
                                    style={{ height: '570px' }}
                                />
                            </div>

                            <div class="product__details__pic">
                                <div class="thumbnail-container">
                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageOne ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageOne)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageOne}`}
                                            alt="Thumbnail 1"
                                        />
                                    </Link>

                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageTwo ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageTwo)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageTwo}`}
                                            alt="Thumbnail 2"
                                        />
                                    </Link>

                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageThree ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageThree)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageThree}`}
                                            alt="Thumbnail 3"
                                        />
                                    </Link>
                                    <Link
                                        className={`pt ${selectedImage === proDetails.subImageFour ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(proDetails.subImageFour)}
                                    >
                                        <img
                                            src={`${baseImageUrl}${proDetails.subImageFour}`}
                                            alt="Thumbnail 4"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="product__details__text">
                                <div className="label-container">
                                    <h3>{proDetails.name}</h3>

                                    {proDetails.new && <div className="label new">New</div>}
                                    {proDetails.sale && <div className="label sale">Sale</div>}
                                    {proDetails.stock === 0 && (
                                        <div className="label stockout">Out of Stock</div>
                                    )}
                                </div>

                                <span className="product__details__price">
                                    {/* $ {proDetails.newprice} <span>$ {proDetails.price}</span>{" "} */}
                                    {proDetails.sale ? (
                                        <div
                                            className="product__price  "
                                            style={{ color: "#ca1515" }}
                                        >
                                            ${proDetails.newprice} <span>${proDetails.price}</span>
                                        </div>
                                    ) : (
                                        <div className="product__price">{proDetails.price}</div>
                                    )}
                                </span>


                                <p>
                                <ProductRating rating={proDetails.ratings} />

                                    {reviews.length === 1 ? "(1 Comment)" : `( ${reviews.length} Comments)`}



                                </p>

                                <hr></hr>

                                <div className="basic">{proDetails.description}</div>

                                <span>
                                    <span className="basic">Brand:</span> {proDetails.brand}
                                </span>

                                <p>
                                    <span className="basic">Category: </span>
                                    {proDetails.category}
                                </p>

                                <div className="product__details__widget">
                                    <ul>
                                        <li>
                                            <span>Availability:</span>
                                            <div className="stock__checkbox">
                                                <label htmlFor="stockin">
                                                    In Stock
                                                    <input
                                                        type="checkbox"
                                                        id="stockin"
                                                        checked={proDetails.stock > 0}
                                                        readOnly
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </li>




                                        {proDetails.sizeable ? (
                                            <>
                                                {proDetails.stock_S > 0 || proDetails.stock_M > 0 || proDetails.stock_L > 0 || proDetails.stock_XL > 0 ? (
                                                    <p className="product__details__widget">
                                                        <ul>
                                                            <li>
                                                                <span>Available size:</span>
                                                                <div className="size__btn">
                                                                    {proDetails.stock_S > 0 && (
                                                                        <label htmlFor="xs-btn">
                                                                            <input type="radio" id="xs-btn" />S
                                                                        </label>
                                                                    )}
                                                                    {proDetails.stock_M > 0 && (
                                                                        <label htmlFor="s-btn">
                                                                            <input type="radio" id="s-btn" />M
                                                                        </label>
                                                                    )}
                                                                    {proDetails.stock_L > 0 && (
                                                                        <label htmlFor="m-btn">
                                                                            <input type="radio" id="m-btn" />L
                                                                        </label>
                                                                    )}
                                                                    {proDetails.stock_XL > 0 && (
                                                                        <label htmlFor="l-btn">
                                                                            <input type="radio" id="l-btn" />
                                                                            XL
                                                                        </label>
                                                                    )}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </p>

                                                ) : (
                                                    <p>No available sizes</p>
                                                )}

                                                <span className="font-weight-bold">Remaining Items in Stock: </span> <p></p>
                                                <div style={{ display: 'flex' }}>


                                                    <div style={{ marginRight: '20px' }}>

                                                        <p>
                                                            <span className="font-weight-bold"> Size S - </span>
                                                            <span className={proDetails.stock_S > 0 ? "in-stock" : "out-of-stock"}>
                                                                {proDetails.stock_S > 0 ? proDetails.stock_S : "Out of stock"}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-weight-bold">Size M - </span>
                                                            <span className={proDetails.stock_M > 0 ? "in-stock" : "out-of-stock"}>
                                                                {proDetails.stock_M > 0 ? proDetails.stock_M : "Out of stock"}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p>
                                                            <span className="font-weight-bold">Size L - </span>
                                                            <span className={proDetails.stock_L > 0 ? "in-stock" : "out-of-stock"}>
                                                                {proDetails.stock_L > 0 ? proDetails.stock_L : "Out of stock"}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-weight-bold">Size XL - </span>
                                                            <span className={proDetails.stock_XL > 0 ? "in-stock" : "out-of-stock"}>
                                                                {proDetails.stock_XL > 0 ? proDetails.stock_XL : "Out of stock"}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>



                                            </>
                                        ) : <p>
                                            <span className="font-weight-bold">Remaining Items in Stock: </span>
                                            <span className={proDetails.stock ? "in-stock" : "out-of-stock"}>
                                                {proDetails.stock > 0 ? proDetails.stock : "Out of Stock"}
                                            </span>
                                        </p>}
                                        <li>


                                        </li>
                                    </ul>

                                    <p>




                                        <button style={{ backgroundColor: 'green' }} >
                                            <a style={{ color: 'white' }} href={`/updateProduct/${proDetails.id}`}>
                                                Edit Product
                                            </a>
                                        </button>



                                        <button className="mx-2" style={{ backgroundColor: 'red', color: 'white' }} >
                                            <a style={{ color: 'white' }} href={`/deleteProduct/${proDetails.id}`}>
                                                delete Product
                                            </a>
                                        </button>



                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>







                </div>


                <div className="col-lg-12 mx-auto">
                    <h3 className="reviews__title">Comments</h3>
                    {reviews.length > 0 ? (
                        <ul className="reviews__list">
                            {reviews.map((review, index) => (
                                <li key={index} className="review__item">
                                    <div className="review__header">
                                        <img
                                            className="review__avatar"
                                            src={rev}
                                            alt="User Avatar"
                                        />
                                        <div className="review__meta">
                                            <span className="review__author">{review.user}</span>
                                            <span className="review__date">{review.date}</span>
                                        </div>
                                    </div>
                                    <div className="review__content">
                                        <p className="review__comment">{review.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No Comments yet</p>
                    )}
                </div>

            </section>
        </>
    );
};

export default VendorProduct;
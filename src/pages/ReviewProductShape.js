import React, { useState } from "react";
import rev from "../imags/rev.png";
import pro1 from "../imags/product/details/product-1.jpg"
import pro2 from "../imags/product/details/product-1.jpg"
import pro3 from "../imags/product/details/product-4.jpg"
import pro4 from "../imags/product/details/product-2.jpg"
import pro5 from "../imags/product/details/product-3.jpg"
import { Link } from 'react-router-dom';

const ReviwProductShape = () => {
    const [mainImage, setMainImage] = useState(pro1);

    const proDetails = {
        id: 1,
        name: "Sample Product",
        new: false,
        sale: true,
        stock: 10,
        price: 50,
        newprice: 40,
        description: "This is a sample product description.",
        brand: "Sample Brand",
        category: "Sample Category",
        sizable: true,
        stock_S: 3,
        stock_M: 4,
        stock_L: 2,
        stock_XL: 1,
        subImageOne: "/sample_image_1.jpg",
        subImageTwo: "/sample_image_2.jpg",
        subImageThree: "/sample_image_3.jpg",
        subImageFour: "/sample_image_4.jpg",
    };

    const reviews = [
        { user: "Sample User 1", date: "2024-03-23", comment: "Sample comment 1" },
        { user: "Sample User 2", date: "2024-03-22", comment: "Sample comment 2" },
    ];
    const handleSubImageClick = (image) => {
        setMainImage(image);
    };
    return (
        <>
            <section className="product-details spad topheight ">
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="product__big__img__container myimg" style={{ height: '570px' }}>
                                <img
                                    className="mypic"
                                    src={mainImage} // Render main image dynamically
                                    alt="Product Main Image"
                                    style={{ height: '570px' }}
                                />
                            </div>
                            <div className="product__details__pic">
                                <div className="thumbnail-container">
                                    <Link className="pt" to="">
                                        <div onClick={() => handleSubImageClick(pro2)}>
                                            <img src={pro2} alt="sub Image One" />
                                        </div>
                                    </Link>
                                    <Link className="pt" to="">
                                        <div onClick={() => handleSubImageClick(pro3)}>
                                            <img src={pro3} alt="sub Image Two" />
                                        </div>
                                    </Link>
                                    <Link className="pt" to="">
                                        <div onClick={() => handleSubImageClick(pro4)}>
                                            <img src={pro4} alt="sub Image Three" />
                                        </div>
                                    </Link>
                                    <Link className="pt" to="">
                                        <div onClick={() => handleSubImageClick(pro5)}>
                                            <img src={pro5} alt="sub Image Four" />
                                        </div>
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
                                    {proDetails.stock === 0 && <div className="label stockout">Out of Stock</div>}
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
                                    <span>( {reviews.length} Reviews)</span>
                                </p>
                                <hr />
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
                                                    <input type="checkbox" id="stockin" checked readOnly />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </li>
                                        {proDetails.sizable ? (
                                            <p className="product__details__widget">
                                                <ul>
                                                    <li>
                                                        <span>Available size:</span>
                                                        <div className="size__btn">
                                                            <label htmlFor="xs-btn">
                                                                <input type="radio" id="xs-btn" />S
                                                            </label>
                                                            <label htmlFor="s-btn">
                                                                <input type="radio" id="s-btn" />M
                                                            </label>
                                                            <label htmlFor="m-btn">
                                                                <input type="radio" id="m-btn" />L
                                                            </label>
                                                            <label htmlFor="l-btn">
                                                                <input type="radio" id="l-btn" />
                                                                XL
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </p>
                                        ) : (
                                            <p>No available sizes</p>
                                        )}
                                        <li></li>
                                    </ul>
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








                                    <p>
                                        <button style={{ backgroundColor: 'green' }}>
                                            Edit Product
                                        </button>
                                        <button className="mx-2" style={{ backgroundColor: 'red', color: 'white' }}>
                                            Delete Product
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
                        <p>No reviews yet</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ReviwProductShape;
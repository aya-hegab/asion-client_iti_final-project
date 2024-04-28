import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setItemsid,
  increaseCounter,
  decreaseCounter,
  decreaseCounterByAmount,
} from "../store/slices/total";
import { Link, Navigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const userCookie = Cookies.get("user");
  const itemsid = useSelector((state) => state.total.itemsid);
  const dispatch = useDispatch();
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const [items, setItems] = useState([]);
  const baseImageUrl = "http://127.0.0.1:8000";
  const [total, setTotal] = useState();
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  useEffect(() => {
    axiosInstance
      .get(`/api/cart/list/`, { headers })
      .then((res) => {
        console.log(res.data);
        setItems(res.data.cart_items);
        setTotal(res.data.total_items_price);
        console.log(userID);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = function () {
    if (!token) {
      // If user is not logged in, show the modal
      setShowModal(true);
    } else {
      navigate("/checkoutPage");
    }
  };

  const handleAddMore = async (proID, proSize, cartID) => {
    try {
      console.log(`pro size = ${proSize}`);
      const response = await axiosInstance.post(
        `/api/cart/add/`,
        {
          item: proID,
          quantity: 1,
          size: proSize,
        },
        {
          headers,
        }
      );
      console.log(response.data);
      const updatedItemIndex = items.findIndex((item) => item.id === cartID);
      const updatedItem = { ...items[updatedItemIndex] };
      updatedItem.quantity += 1;
      updatedItem.subtotal_price =
        updatedItem.quantity * updatedItem.item_price;
      const updatedItems = [...items];
      updatedItems[updatedItemIndex] = updatedItem;
      setItems(updatedItems);
      let newTotal = 0;
      updatedItems.forEach((item) => {
        newTotal += item.subtotal_price;
      });
      setTotal(newTotal);
      dispatch(increaseCounter());
    } catch (error) {
      console.error("Error:", error.response.data);
      error.response.data.quantity !== 0 && dispatch(increaseCounter());
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const response = await axiosInstance.put(
        `/api/cart/remove/${itemId}`,
        null,
        {
          headers,
        }
      );
      console.log(response.data);
      const updatedItemIndex = items.findIndex((item) => item.id === itemId);
      const updatedItem = { ...items[updatedItemIndex] };
      updatedItem.quantity -= 1;
      updatedItem.subtotal_price =
        updatedItem.quantity * updatedItem.item_price;
      const updatedItems = [...items];
      updatedItems[updatedItemIndex] = updatedItem;
      setItems(updatedItems);
      let newTotal = 0;
      updatedItems.forEach((item) => {
        newTotal += item.subtotal_price;
      });
      setTotal(newTotal);
      dispatch(decreaseCounter());
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/cart/delete/${itemId}`,
        { headers }
      );
      console.log(response.data);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      const deletedItem = items.find((item) => item.id === itemId);
      if (deletedItem) {
        const deletedItemSubtotal = deletedItem.subtotal_price;
        setTotal((prevTotal) => prevTotal - deletedItemSubtotal);
        dispatch(decreaseCounterByAmount(deletedItem.quantity));
      }
      dispatch(
        setItemsid(
          items.filter((item) => item.id !== itemId).map((item) => item.item)
        )
      );
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home"></i> Home
                </Link>
                <span> Shopping cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      <section className="h-100">
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please log in first.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" href="/login">
              Login
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              {items.map((product) => {
                return (
                  <div key={product.id} className="card rounded-3 mb-4">
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-cente ">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img
                            // src={product.item_image}
                            src={`${baseImageUrl}${product.item_image}`}
                            className="img-fluid rounded-3"
                            alt="proImage"
                          />
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">
                            {product.item_name}
                          </p>
                          <p>
                            <span className="text-muted">price: </span>${" "}
                            {product.item_price}
                          </p>
                          <p>
                            <span className="text-muted">size: </span>
                            {product.size}
                          </p>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                          <div className="d-flex my-3 align-items-center">
                            <button
                              onClick={() => handleRemove(product.id)}
                              className="btn btn-danger"
                              style={{
                                backgroundColor:
                                  product.quantity === 1 && "gray",
                                border: "none",
                              }}
                            >
                              -
                            </button>
                            <p className="mb-0 mx-4"> {product.quantity} </p>
                            <button
                              onClick={() =>
                                handleAddMore(
                                  product.item,
                                  product.size,
                                  product.id
                                )
                              }
                              className="btn btn-success"
                              style={{
                                backgroundColor:
                                  product.size === "one_size"
                                    ? product.quantity === product.stock
                                      ? "gray"
                                      : null
                                    : product.size === "S"
                                    ? product.quantity === product.stock_S
                                      ? "gray"
                                      : null
                                    : product.size === "M"
                                    ? product.quantity === product.stock_M
                                      ? "gray"
                                      : null
                                    : product.size === "L"
                                    ? product.quantity === product.stock_L
                                      ? "gray"
                                      : null
                                    : product.size === "XL"
                                    ? product.quantity === product.stock_XL
                                      ? "gray"
                                      : null
                                    : null,
                                border: "none",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h5 className="mb-0">${product.subtotal_price}</h5>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <i
                            onClick={() => handleDelete(product.id)}
                            className="fas fa-trash fa-lg text-danger"
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* <div className="mb-3" style={{ fontSize: "2rem", display: "hidden" }}>
            Total: ${total}
          </div> */}
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn">
                <Link to="/">Continue Shopping</Link>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn update__btn">
                <Link to="#">
                  <span class="icon_loading"></span> Update cart
                </Link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="discount__content">
                {/* <h6>Discount codes</h6>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" class="site-btn">
                    Apply
                  </button>
                </form> */}
              </div>
            </div>
            <div class="col-lg-4 offset-lg-2">
              <div class="cart__total__procced">
                <h6>Cart total</h6>
                <ul>
                  {/* <li>
                    Subtotal <span>$49.00</span>
                  </li> */}
                  <li>
                    Total <span>${total}</span>
                  </li>
                </ul>
                <button onClick={handleCheckout} class="primary-btn p-3">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;

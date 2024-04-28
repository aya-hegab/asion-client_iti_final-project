import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../apis/config";
import { useState, useEffect } from "react";
import { API_URL } from "../../apis/configpaln";
import Cookies from "js-cookie";
import swal from "sweetalert";

const Checkout = () => {
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };

  const userCookie = Cookies.get("user");
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [order_id, setOrder_id] = useState([]);
  const [error, setError] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // const clearCart = () => {
  //   setItems([]);
  //   setTotal(0);
  //   setCheckoutInput({
  //     first_name: "",
  //     last_name: "",
  //     country: "",
  //     city: "",
  //     zip_code: "",
  //     state: "",
  //     street: "",
  //     phone_number: "",
  //     email: "",
  //     order_Items: [],
  //   });
  // };

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

    axiosInstance
      .get("/API/orders/Tmp", { headers })
      .then((res) => {
        console.log(res.data.orders[0].id);
        axiosInstance
          .delete(`/API/orders/${res.data.orders[0].id}/deleteTmp/`, {
            headers,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  /*if(!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning","Login to goto Cart Page","error");
    }*/

  //const [loading, setLoading] = useState(true);
  const [checoutInput, setCheckoutInput] = useState({
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    zip_code: "",
    state: "",
    street: "",
    phone_number: "",
    // email: "",
    order_Items: [],
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCheckoutInput({
      ...checoutInput,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (items.length === 0) {
      swal(
        "Warning",
        "Your cart is empty. Add items before placing an order.",
        "warning"
      );
      return;
    }
    if (!validateForm()) {
      return;
    }
    const orderItems = items.map((product) => ({
      product: product.item,
      quantity: product.quantity,
      price: product.item_price,
      size: product.size,
    }));

    const data = {
      first_name: checoutInput.first_name,
      last_name: checoutInput.last_name,
      country: checoutInput.country,
      city: checoutInput.city,
      zip_code: checoutInput.zip_code,
      state: checoutInput.state,
      street: checoutInput.street,
      phone_number: checoutInput.phone_number,
      // email: checoutInput.email,
      order_Items: orderItems,
    };

    axiosInstance.post("/API/orders/newTmp/", data, { headers }).then((res) => {
      setOrder_id(res.data.id);
      console.log("Response Status:", res.status);
      if (res.data.status === 200) {
        swal("Order Placed Successfully", res.data.message, "success");
        setIsOrderPlaced(true);
        console.log("Navigating to /thank-you");
        setError([]);
        // clearCart();
      } else if (res.data.status === 422) {
        swal.apply("All fields are mondetory", "", "error");
        setError(res.data.errors);
      }

      setIsOrderPlaced(true);
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    for (const key in checoutInput) {
      if (!checoutInput[key]) {
        errors[key] = "This field is required";
        isValid = false;
      }
    }
    setError(errors);
    return isValid;
  };

  //console.log("Order ID:", order_id);
  return (
    <>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home"></i> Home
                </Link>
                <span>Shopping cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/*Checkout Section Begin */}
      <section className="checkout spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h6 className="coupon__link">
                {/* <span className="icon_tag_alt"></span>{" "}
                <Link to="h">Have a coupon?</Link> Click here to enter your
                code. */}
                Dear customer enjoy your shopping experience!
              </h6>
            </div>
          </div>
          {/* console.log({`${API_URL}/API/create-checkout-session/${order_id}/`}) */}
          <form
            onSubmit={handleSubmit}
            className="checkout__form"
            method="POST"
          >
            <div className="row">
              <div className="col-lg-8">
                <h5>Billing detail</h5>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="checkout__form__input">
                      <p>
                        First Name <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="first_name"
                        onChange={handleInput}
                        value={checoutInput.first_name}
                      />
                      <small className="text-danger">{error.first_name}</small>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="checkout__form__input">
                      <p>
                        Last Name <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="last_name"
                        onChange={handleInput}
                        value={checoutInput.last_name}
                      />
                      <small className="text-danger">{error.last_name}</small>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="checkout__form__input">
                      <p>
                        Country <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="country"
                        onChange={handleInput}
                        value={checoutInput.country}
                      />
                      <small className="text-danger">{error.country}</small>
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Address <span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        name="street"
                        onChange={handleInput}
                        value={checoutInput.street}
                      />
                      <small className="text-danger">{error.street}</small>

                      <input
                        type="text"
                        placeholder="Apartment. suite, unite ect ( optinal )"
                      />
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Town/City <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="city"
                        onChange={handleInput}
                        value={checoutInput.city}
                      />
                      <small className="text-danger">{error.city}</small>
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Country/State <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="state"
                        onChange={handleInput}
                        value={checoutInput.state}
                      />
                      <small className="text-danger">{error.state}</small>
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Postcode/Zip <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="zip_code"
                        onChange={handleInput}
                        value={checoutInput.zip_code}
                      />
                      <small className="text-danger">{error.zip_code}</small>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="checkout__form__input">
                      <p>
                        Phone <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="phone_number"
                        onChange={handleInput}
                        value={checoutInput.phone_number}
                      />
                      <small className="text-danger">
                        {error.phone_number}
                      </small>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="email"
                        onChange={handleInput}
                        value={checoutInput.email}
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-12">
                    <div className="checkout__form__checkbox">
                      <label for="acc">
                        Create an acount?
                        <input type="checkbox" id="acc" />
                        <span className="checkmark"></span>
                      </label>
                      <p>
                        Create am acount by entering the information below. If
                        you are a returing customer login at the <br />
                        top of the page
                      </p>
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Account Password <span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__form__checkbox">
                      <label for="note">
                        Note about your checoutInput, e.g, special noe for
                        delivery
                        <input type="checkbox" id="note" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="checkout__form__input">
                      <p>
                        Oder notes <span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Note about your checoutInput, e.g, special noe for delivery"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="checkout__order">
                  <h5>Your checoutInput</h5>
                  <div className="checkout__order__product">
                    <ul>
                      <li>
                        <span className="top__text">Product</span>
                        <span className="top__text__right">Total</span>
                      </li>
                      {items.map((product) => {
                        return (
                          <>
                            <li>
                              {product.quantity} {product.item_name}{" "}
                              <span>
                                $ {product.item_price * product.quantity}
                              </span>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="checkout__order__total">
                    <ul>
                      <li>
                        Subtotal <span>$ {total}</span>
                      </li>
                      <li>
                        Total <span>$ {total}</span>
                      </li>
                    </ul>
                  </div>

                  {/* <div className="checkout__order__widget">
                    <label for="o-acc">
                      Create an acount?
                      <input type="checkbox" id="o-acc" />
                      <span className="checkmark"></span>
                    </label>
                    <p>
                      Create am acount by entering the information below. If you
                      are a returing customer login at the top of the page.
                    </p>
                    <label for="check-payment">
                      Cheque payment
                      <input type="checkbox" id="check-payment" />
                      <span className="checkmark"></span>
                    </label>
                    <label for="paypal">
                      PayPal
                      <input type="checkbox" id="paypal" />
                      <span className="checkmark"></span>
                    </label>
                  </div> */}
                  {isOrderPlaced ? (
                    <form
                      action={`${API_URL}/API/create-checkout-session/${order_id}/`}
                      method="POST"
                    >
                      <button type="submit" className="site-btn">
                        pay
                      </button>
                    </form>
                  ) : (
                    <button type="submit" className="site-btn">
                      Place Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/*Checkout Section End */}
    </>
  );
};

export default Checkout;

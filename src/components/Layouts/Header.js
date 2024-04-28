import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoImage from "../../imags/logo.png";
import { fetchTotalCount, setTotalCount } from "../../store/slices/total";
import {
  fetchWishList,
  resetWishTotalCount,
} from "../../store/slices/wishlist";
import "./Header.css";

const Header = () => {
  const total = useSelector((state) => state.total.count);
  const count = useSelector((state) => state.wishlist.count);
  const dispatch = useDispatch();
  const isAuthenticated = Cookies.get("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Token ${token}`,
    };

    axios
      .get("http://localhost:8000/api/profile/", { headers })
      .then((res) => {
        setUser(res.data.message);
        // setUpdatedUser(res.data.message);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch user error:", error);
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchTotalCount());
    dispatch(fetchWishList());
  }, []);

  const handleLogout = () => {
    const token = Cookies.get("token");
    Cookies.remove("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    axios
      .post("http://localhost:8000/api/logout/", null, { headers })
      .then(() => {
        console.log("Logout successful");
        dispatch(setTotalCount(0));
        dispatch(resetWishTotalCount(0));
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className={`offcanvas-menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`offcanvas-menu-wrapper ${isMenuOpen ? "active" : ""}`}>
        <div className="offcanvas__close" onClick={toggleMenu}>
          +
        </div>
        <ul className="offcanvas__widget">
          <li>
            {user && user.usertype === "customer" && (
              <Link to="/customerprofile">
                <span className="fa-regular fa-user"></span>
              </Link>
            )}
            {user && user.usertype === "vendor" && (
              <Link to="/vendorprofile">
                <span className="fa-regular fa-user"></span>
              </Link>
            )}
            {user && user.usertype === "DeliveryMan" && (
              <Link to="/deliverymanprofile">
                <span className="fa-regular fa-user"></span>
              </Link>
            )}
          </li>
          <li>
            <Link to="wishlist">
              <span className="icon_heart_alt"></span>
              <div className="tip">{count}</div>
            </Link>
          </li>
          <li>
            <Link to="Cart">
              <span className="icon_bag_alt"></span>
              <div className="tip">{total}</div>
            </Link>
          </li>
        </ul>
        <div className="offcanvas__logo">
          <Link to="/">
            <img src={logoImage} alt="" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <nav className="header_menu">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === "WomanPage" ? "active" : ""}>
              <Link to="WomanPage">Women’s</Link>
            </li>
            <li className={location.pathname === "MenPage" ? "active" : ""}>
              <Link to="/MenPage">Men’s</Link>
            </li>
            <li
              className={location.pathname === "/ProductList" ? "active" : ""}
            >
              <Link to="/ProductList">Shop</Link>
            </li>
            <li className={location.pathname === "/contact" ? "active" : ""}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="offcanvas__auth">
          {isAuthenticated ? (
            <Link
              className="header__right__auth__link"
              to="#"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link className="header__right__auth__link" to="/login">
                Login
              </Link>
              <Link className="header__right__auth__link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <Link to="/">
                  <img src={logoImage} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <nav className="header__menu">
                <ul>
                  <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/WomanPage" ? "active" : ""
                    }
                  >
                    <Link to="WomanPage">Women’s</Link>
                  </li>
                  <li
                    className={location.pathname === "/MenPage" ? "active" : ""}
                  >
                    <Link to="/MenPage">Men’s</Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/ProductList" ? "active" : ""
                    }
                  >
                    <Link to="/ProductList">Shop</Link>
                  </li>
                  <li
                    className={location.pathname === "/contact" ? "active" : ""}
                  >
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                  {isAuthenticated ? (
                    <Link
                      className="header__right__auth__link"
                      to="#"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  ) : (
                    <>
                      <Link className="header__right__auth__link" to="/login">
                        Login
                      </Link>
                      <Link
                        className="header__right__auth__link"
                        to="/register"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
                <ul className="header__right__widget">
                  <li>
                    {user && user.usertype === "customer" && (
                      <Link to="/customerprofile">
                        <span className="fa-regular fa-user"></span>
                      </Link>
                    )}
                    {user && user.usertype === "vendor" && (
                      <Link to="/vendorprofile">
                        <span className="fa-regular fa-user"></span>
                      </Link>
                    )}
                    {user && user.usertype === "DeliveryMan" && (
                      <Link to="/deliverymanprofile">
                        <span className="fa-regular fa-user"></span>
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link to="wishlist">
                      <span className="icon_heart_alt"></span>
                      <div className="tip">{count}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="Cart">
                      <span className="icon_bag_alt"></span>
                      <div className="tip">{total}</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="canvas__open" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

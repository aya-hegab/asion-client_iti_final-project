import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";
import hello from "../../imags/register/hello.jpg";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State variable to hold error message
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.get("http://localhost:8000/api/profile", { headers: { Authorization: `Token ${token}` } })
        .then((res) => {
          const user = res.data.message;
          const isSuperuser = user.is_superuser;
          console.log(res.data.message);
          console.log(res.message)
          console.log(res.data.message.isSuperuser)
          
  
          if (isSuperuser === true) {
            navigate("/admin");
          } else {
            const userType = user.message.usertype;
  
            if (userType === "customer") {
              navigate("/CustomerProfile");
            } else if (userType === "vendor") {
              navigate("/VendorProfile");
            } else if (userType === "deliveryman") {
              navigate("/DeliveryMan");
            } else {
              console.error("Unknown user type:", user.usertype);
              navigate("/login");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          navigate("/login");
        });
    }
  }, [navigate]);
  


  const handleFieldChange = (event) => {
    const field_name = event.target.name;
    const field_value = event.target.value;

    setLoginForm({
      ...loginForm,
      [field_name]: field_value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/login/", loginForm)
      .then((res) => {
        console.log(res);
        const { token, user } = res.data;
        console.log("token", token);
        Cookies.set("token", token); // Store user data in a cookie

        // Redirect based on the user type
        if (user.is_superuser === true) {
          navigate("/admin");
        } 
      else if (user.usertype === "customer") {
          navigate("/CustomerProfile", { state: { user, token } });
        } else if (user.usertype === "vendor") {
          navigate("/VendorProfile", { state: { user, token } });
        } else if (user.usertype === "DeliveryMan") {
          navigate("/DeliveryMan", { state: { user, token } });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setErrorMessage("Invalid email or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="all-login">
      <div className="containerr">
        <div className="row mt-3 " style={{ width: "100%" }}>
          <img src={hello} alt="Welcome" className="col-md-5 mt-3 imgss " />
          <div className="form col-md-7 mt-3 d-flex align-items-center w-100">
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  <b>Email address</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={handleFieldChange}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={handleFieldChange}
                  name="password"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
              <br />
              {errorMessage && (
                <span className="text-danger">{errorMessage}</span>
              )}{" "}
              {/* Display error message */}
            </form>
          </div>
        </div>
      </div>
      <div className="register_btn">
        <p className="paragraph">Don't Have an Account? </p>
        <Link to="/register" className="link">
          Register
        </Link>
      </div>
      <div className="register_btn">
        <p className="paragraph">Forget Your Password ?</p>
        <Link to="/ForgetPassword" className="link">
          Forget Password
        </Link>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect } from "react";
import styles from "../login/login.module.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/slices/userSlice";

export default function Login() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userType, setUserType] = useState("employee"); // New state for user type

  // State to handle form errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser: registeredUser } = useSelector(
    (state) => state.register || {}
  );
  // const { currentUser, isAuthenticated } = useSelector((state) => state.user || {});

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setFormData((prevState) => ({
        ...prevState,
        email: savedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);

    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const apiEndpoint =
       "http://52.7.177.12:8000/User_login"

      axios
        .post(apiEndpoint, formData)
        .then((res) => {
          console.log(`${userType} login success`, res.data);
          dispatch(loginSuccess(res.data));

          // Navigate based on user type
          if (res.data.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/employeedashboard");
          }
        })
        .catch((e) => {
          console.error("error login", e);
          dispatch(loginFailure(e.response?.data?.message || "Login Failed"));
        });
    }

    if (rememberMe) {
      localStorage.setItem("email", formData.email);
    } else {
      localStorage.removeItem("email");
    }
  };

  return (
    <div>
      <div className={styles.logincontainer}>
        <div className={styles.loginbox}>
          <h1 className={styles.logintitle}>Login</h1>
          <p className={styles.welcomemessage}>Welcome Back</p>
          <p className={styles.instruction}>
            Please enter your Attendance credentials.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.formgroup}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className={styles.formgroup}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.pass}
              />

              <span
                className={styles.togglepassword}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className={styles.formgroup}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember me</label>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.loginbutton}>
              LOGIN
            </button>
          </form>

          {/* Forgot Password and Register Links */}
          <div className={styles.loginfooter}>
            <a href="/forgot" className={styles.forgotpassword}>
              Forgot Password?
            </a>
            <p>
              Don't you have an account?{" "}
              <a href="/register" className={styles.registerlink}>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

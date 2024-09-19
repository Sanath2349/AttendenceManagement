import React from "react";
import logo from "../../assests/logo.png";
import styles from "../login/login.module.css"
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Login() {
  // State to handle form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
 

  // State to handle form errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);

    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (validateForm()) {
      const formData = {
        email,
        password,
        rememberMe,
      };
      console.log("Form Data:", formData); // Log form data to console
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <div className={styles.authlinks}>
          <a href="/register" className={styles.registerlink}>
            New user? Register
          </a>
          <button className={styles.loginbtn}>LOGIN</button>
        </div>
      </header>

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
                placeholder="Enter Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className={styles.formgroup}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.pass}
              />

                <span
                className={styles.togglepassword}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className={styles.error}>{errors.password}</p>}
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

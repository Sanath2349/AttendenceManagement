import React, { useState } from "react";
import styles from "../register/Register.module.css"; // Import your CSS module
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility icons
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  registerFailure,
  registerSuccess,
} from "../../redux/slices/registerSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile_number: "",
    domain: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.name) newErrors.name = "Full Name is required";

    // Date of Birth validation
    if (!formData.dob) newErrors.dob = "Date of Birth is required";

    // Gender validation
    if (!formData.gender) newErrors.gender = "Gender is required";

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    // const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordPattern.test(formData.password)) {
    //   newErrors.password =
    //     "Password must be at least 8 characters long and include a number";
    // }

    // Confirm Password validation
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    // Contact validation
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter a valid 10-digit phone number";
    }

    // Domain validation
    if (!formData.domain) newErrors.domain = "Please select a domain";

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Modify the dob format
      const updatedFormData = {
        ...formData,
        dob: formData.dob + "T00:00:00", // Add time component to the date
      };

      console.log("Form Data:", updatedFormData);
      axios
        .post(
          `http://52.7.177.12:8000/create_user?gender=${updatedFormData.gender}&domain=${updatedFormData.domain}`,
          updatedFormData
        )
        .then((res) => {
          console.log("register success", res.data);
          dispatch(
            registerSuccess({
              ...res.data,
              role: res.data.role, // Assuming the API returns the user role during registration
            })
          );
        })
        .catch((e) => {
          console.error("error register", e);
          dispatch(
            registerFailure(e.response?.data?.message || "Registration failed")
          );
        });
    }
  };

  return (
    <div>
      <div className={styles.registercontainer}>
        <form className={styles.registerform} onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p>
            Welcome to the Attendance Registration page! Please fill in the
            required information to create your account.
          </p>

          <input
            type="text"
            name="name"
            className={errors.fullName ? styles.error : ""}
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

          <div className={styles.flex}>
            <input
              type="date"
              name="dob"
              className={errors.dob ? styles.error : ""}
              placeholder="dd/mm/yyyy"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <p className={styles.errorMessage}>{errors.dob}</p>}

            <select
              name="gender"
              className={errors.gender ? styles.error : ""}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className={styles.errorMessage}>{errors.gender}</p>
            )}
          </div>

          <input
            type="email"
            name="email"
            className={errors.email ? styles.error : ""}
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}

          <div className={styles.passwordGroup}>
            <div className={styles.passwordcontainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className={errors.password ? styles.error : ""}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className={styles.togglepassword}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password}</p>
            )}

            <div className={styles.passwordcontainer}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirm_password"
                className={errors.confirm_password ? styles.error : ""}
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
              <span
                className={styles.togglepassword}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirm_password && (
              <p className={styles.errorMessage}>{errors.confirm_password}</p>
            )}
          </div>

          <input
            type="text"
            name="mobile_number"
            className={errors.contact ? styles.error : ""}
            placeholder="Contact No."
            value={formData.mobile_number}
            onChange={handleChange}
          />
          {errors.mobile_number && (
            <p className={styles.errorMessage}>{errors.mobile_number}</p>
          )}

          <select
            name="domain"
            className={errors.domain ? styles.error : ""}
            value={formData.domain}
            onChange={handleChange}
          >
            <option value="">Select Domain</option>
            <option value="web dev">Web Developer</option>
            <option value="python">Python</option>
            <option value="devops">DevOps</option>
            <option value="testing">Testing</option>
            <option value="java">Java</option>
          </select>
          {errors.domain && (
            <p className={styles.errorMessage}>{errors.domain}</p>
          )}

          <button type="submit">Register</button>

          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

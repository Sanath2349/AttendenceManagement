import React, { useState } from "react";
import styles from "../register/Register.module.css"; // Import your CSS module
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility icons

export default function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    domain: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName) newErrors.fullName = "Full Name is required";

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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Contact validation
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(formData.contact)) {
      newErrors.contact = "Enter a valid 10-digit phone number";
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
      console.log("Form Data:", formData);
      // Submit the form here, or you can add further actions.
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
            name="fullName"
            className={errors.fullName ? styles.error : ""}
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <p className={styles.errorMessage}>{errors.fullName}</p>
          )}

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
                name="confirmPassword"
                className={errors.confirmPassword ? styles.error : ""}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>{errors.confirmPassword}</p>
            )}
          </div>

          <input
            type="text"
            name="contact"
            className={errors.contact ? styles.error : ""}
            placeholder="Contact No."
            value={formData.contact}
            onChange={handleChange}
          />
          {errors.contact && (
            <p className={styles.errorMessage}>{errors.contact}</p>
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

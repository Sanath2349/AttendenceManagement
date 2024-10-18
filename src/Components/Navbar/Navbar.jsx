import React, { useEffect, useState } from "react";
import styles from "../Homepage/Homepage.module.css";
import logo from "../../assests/ECUITYEXOUSIAL LOGO LANDSCAPE black .png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    console.log(currentUser);
  }, []);

  useEffect(() => {
    console.log("Current User:", currentUser); // Add this to check the structure
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleclick = () => {
    navigate("/login");
  };
  return (
    <nav>
      <header className={styles.header}>
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt="Company Logo"
          className="logo"
        />
        <div className={styles.authlinks}>
          {/* Conditional rendering based on user authentication status */}
          {isAuthenticated ? (
            <>
              {/* Display username and log out button */}
              <span className={styles.username}>
                Hello, {currentUser.name || currentUser.email || "User"}
              </span>
              <button className={styles.logoutbtn} onClick={handleLogout}>
                LOG OUT
              </button>
            </>
          ) : (
            <>
              {/* Link to Register page */}
              <Link to="/register" className={styles.registerlink}>
                New user? Register
              </Link>

              {/* Button to Login page */}
              <button
                className={styles.loginbtn}
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            </>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

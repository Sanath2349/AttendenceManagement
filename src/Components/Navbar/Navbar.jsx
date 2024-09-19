import React from "react";
import styles from "../Homepage/Homepage.module.css";
import logo from "../../assests/ECUITYEXOUSIAL LOGO LANDSCAPE black .png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/login");
  };
  return (
    <nav>
      <header className={styles.header}>
        <img src={logo} onClick={()=>navigate("/")} alt="Company Logo" className="logo" />
        <div className={styles.authlinks}>
          <a href="/register" className={styles.registerlink}>
            New user? Register
          </a>
          <button className={styles.loginbtn} onClick={handleclick}>
            LOGIN
          </button>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

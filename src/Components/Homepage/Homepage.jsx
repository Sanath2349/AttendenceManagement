import React from "react";
import laptop from "../../assests/home.png";
import logo from "../../assests/logo.png";
import styles from '../Homepage/Homepage.module.css'
import { useNavigate } from "react-router";

export default function Homepage() {

  const navigate = useNavigate("")

  const handleclick = () =>{
    navigate("/login")
  }


  return (
    <div className={styles.container} >
      <header className={styles.header}>
        <img src={logo} alt="Company Logo" className="logo" />
        <div className={styles.authlinks}>
          <a href="/register" className={styles.registerlink}>
            New user? Register
          </a>
          <button className={styles.loginbtn} onClick={handleclick}>LOGIN</button>
        </div>
      </header>
      <div className={styles.maincontent}>
        <div className={styles.lap}>
            <img src={laptop} alt="" />
        </div>
        <div className={styles.info}>

        <h1>TURN YOUR DREAMS</h1>
        <h2>INTO REALITY</h2>
        </div>
       
      </div>
    </div>
  );
}

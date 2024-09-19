import React from "react";
import laptop from "../../assests/marius-masalar-UCETKvFMBC4-unsplash.jpg";
import styles from "../Homepage/Homepage.module.css";

export default function Homepage() {
  return (
    <div className={styles.container}>
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

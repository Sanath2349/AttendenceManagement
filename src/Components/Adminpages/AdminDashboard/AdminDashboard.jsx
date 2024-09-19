import React from "react";
import AdminSidebar from "../AdminSidebar";
import styles from "../styles/adminDashboard.module.css";
const AdminDashboard = () => {
  return (
    <div className={styles.AdminDashboard}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardBoxes}>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
        </div>
        <div className={styles.adminTable}>
            <h1>table</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

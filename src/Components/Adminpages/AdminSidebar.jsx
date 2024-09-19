import React from "react";
import styles from "./styles/AdminSidebar.module.css";

const AdminSidebar = () => {
  return (
    <div className={styles.adminSidebar}>
      <h2 className={styles.heading}>ADMIN</h2>
      <div className={styles.links}>
        <ul>
          <li>Dashboard</li>
          <li>Employees overview</li>
          <li>Attendence overview</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;

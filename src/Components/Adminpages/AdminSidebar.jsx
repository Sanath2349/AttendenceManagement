import React from "react";
import styles from "./styles/AdminSidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.adminSidebar}>
      <h2 className={styles.heading}>ADMIN</h2>
      <div className={styles.links}>
        <ul>
          <li 
            onClick={() => navigate("/admindashboard")}
            className={isActive("/admindashboard") ? styles.active : ""}
          >
            Dashboard
          </li>
          <li 
            onClick={() => navigate("/employeeoverview")}
            className={isActive("/employeeoverview") ? styles.active : ""}
          >
            Employees overview
          </li>
          <li 
            onClick={() => navigate("/attendanceoverview")}
            className={isActive("/attendanceoverview") ? styles.active : ""}
          >
            Attendance overview
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
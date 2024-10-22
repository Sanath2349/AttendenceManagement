import React from 'react';
import styles from '../employeepages/styles/Employeesidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Employeesidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.employeeSidebar}>
      <h2 className={styles.heading}>Employee</h2>
      <div className={styles.links}>
        <ul>
          <li 
            onClick={() => navigate("/employeedashboard")}
            className={isActive("/employeedashboard") ? styles.active : ""}
          >
            Dashboard
          </li>
          <li 
            onClick={() => navigate("/employeeoverview")}
            className={isActive("/employeeoverview") ? styles.active : ""}
          >
            Employee overview
          </li>
          
        </ul>
      </div>
    </div>
  );
}

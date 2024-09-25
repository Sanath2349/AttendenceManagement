import React from 'react';
import styles from '../employeepages/styles/Employeesidebar.module.css';

export default function Employeesidebar() {
  return (
    <div className={styles.employeeSidebar}>
      <h2 className={styles.heading}>Employee</h2>
      <div className={styles.links}>
        <ul>
          <li>Dashboard</li>
          <li>Employees overview</li>
         
        </ul>
      </div>
    </div>
  )
}

import React from "react";
import Employeesidebar from "./Employeesidebar";
import styles from "../employeepages/styles/Employeeoverview.module.css";
import frame from "../../assests/employee/Frame.png"

export default function Employeeoverview() {
  const attendanceData = [
    {
      date: "25-01-2023",
      timeIn: "09:46 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "10:06 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "09:46 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "09:46 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "10:06 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "09:46 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
    {
      date: "25-01-2023",
      timeIn: "11:00 AM",
      timeOut: "07:46 PM",
      breakHours: "0 Hr 40 Mins 56 Secs",
    },
  ];

  return (
    <div className={styles.attendanceReport}>
      <div className={styles.sidebar}>
        <Employeesidebar />
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Attendance Report</h2>
        <div className={styles.reportHeader}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
        
        </div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}> <div>Date <img src={frame} alt="" /></div></th>
              <th className={styles.th}> <div>time in <img src={frame} alt="" /></div></th>
              <th className={styles.th}> <div>time out <img src={frame} alt="" /></div></th>
              
              
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, index) => (
              <tr key={index}>
                <td className={styles.td}>{row.date}</td>
                <td className={styles.td}>
                  <span
                    className={`${styles.timeIndicator} ${
                      row.timeIn === "10:06 AM" || row.timeIn === "11:00 AM"
                        ? styles.late
                        : styles.onTime
                    }`}
                  ></span>
                  {row.timeIn}
                </td>
                <td className={styles.td}>{row.timeOut}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

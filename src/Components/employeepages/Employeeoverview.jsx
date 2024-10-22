import React, { useState, useEffect } from "react";
import Employeesidebar from "./Employeesidebar";
import axios from "axios";
import styles from "../employeepages/styles/Employeeoverview.module.css";
import frame from "../../assests/employee/Frame.png";
import { useSelector } from "react-redux";

export default function Employeeoverview() {
  const [attendanceData, setAttendanceData] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.user_id;

  useEffect(() => {
    // Fetch attendance data from API
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `http://52.7.177.12:8000/get_one_employee_punching_details?usedid=${userId}`
        );
        const { punch_in_time, punch_out_time, date_and_time } = response.data;

        // Format the data
        const formattedData = [
          {
            date: new Date(date_and_time).toLocaleDateString(),
            timeIn: new Date(punch_in_time).toLocaleTimeString(),
            timeOut: new Date(punch_out_time).toLocaleTimeString(),
          },
        ];

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

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
              <th className={styles.th}>
                <div>Date <img src={frame} alt="" /></div>
              </th>
              <th className={styles.th}>
                <div>Time In <img src={frame} alt="" /></div>
              </th>
              <th className={styles.th}>
                <div>Time Out <img src={frame} alt="" /></div>
              </th>
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

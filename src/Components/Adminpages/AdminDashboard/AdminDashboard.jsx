import React from "react";
import AdminSidebar from "../AdminSidebar";
import styles from "../styles/adminDashboard.module.css";
import group from "../../../assests/Admin/ic--baseline-people.svg";
import ontime from "../../../assests/Admin/material-symbols--avg-time (1).svg";
import late from "../../../assests/Admin/pajamas--time-out.svg";
import absent from "../../../assests/Admin/mdi--weather-time.svg";

const AdminDashboard = () => {
  const attendanceData = [
    {
      id: "2341421",
      employee: "Ahmed Rashdan",
      Domain: "web developer",
      date: "29 July 2023",
      status: "Work from office",
      checkIn: "09:00",
      checkOut: "18:00",
    },
    {
      id: "3411421",
      employee: "Ali Alhamdan",
      Domain: "DevOps",
      date: "29 July 2023",
      status: "Absent",
      checkIn: "00:00",
      checkOut: "00:00",
    },
    {
      id: "2341121",
      employee: "Mona Alghafar",
      Domain: "Python ",
      date: "29 July 2023",
      status: "Late arrival",
      checkIn: "10:30",
      checkOut: "18:00",
    },
    {
      id: "2341421",
      employee: "Moustafa Adel",
      Domain: "Testing",
      date: "29 July 2023",
      status: "Work from home",
      checkIn: "09:00",
      checkOut: "18:00",
    },
  ];

  return (
    <div className={styles.AdminDashboard}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardBoxes}>
          <div className={styles.box}>
            <div className={styles.empcount}>
              <span>80</span>
              <img src={group} alt="img" />
            </div>
            <h3>Total Employees</h3>
          </div>
          <div className={styles.box}>
            <div className={styles.empcount}>
              <span>65</span>
              <img src={ontime} alt="" />
            </div>
            <h3>On Time</h3>
          </div>
          <div className={styles.box}>
            <div className={styles.empcount}>
              <span>5</span>
              <img src={late} alt="img" />
            </div>
            <h3>Late Logins</h3>
          </div>
          <div className={styles.box}>
            <div className={styles.empcount}>
              <span>10</span>
              <img src={absent} alt="img" />
            </div>
            <h3>Absent</h3>
          </div>
        </div>
        <div className={styles.adminTable}>
          <div className={styles.tableHeader}>
            <h2>Attendance Overview</h2>
            <div className={styles.tableControls}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button className={styles.dateButton}>29 Jul 2023</button>
              <button className={styles.viewButton}>View Attendance</button>
            </div>
          </div>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Domain</th>
                <th>Date</th>
                <th>Status</th>
                <th>Check-in</th>
                <th>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.employee}</td>
                  <td>{row.Domain}</td>
                  <td>{row.date}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[row.status.replace(/\s+/g, "")]
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{row.checkIn}</td>
                  <td>{row.checkOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>Page 1 of 100</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

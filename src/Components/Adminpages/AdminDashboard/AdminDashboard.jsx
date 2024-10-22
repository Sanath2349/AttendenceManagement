import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import styles from "../styles/adminDashboard.module.css";
import group from "../../../assests/Admin/ic--baseline-people.svg";
import ontime from "../../../assests/Admin/material-symbols--avg-time (1).svg";
import late from "../../../assests/Admin/pajamas--time-out.svg";
import absent from "../../../assests/Admin/mdi--weather-time.svg";
import axios from "axios";

const AdminDashboard = () => {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://52.7.177.12:8000/get all users")
      .then((res) => {
        console.log("employee fetch success", res.data);
        setEmpData(res.data);
      })
      .catch((e) => {
        console.error("error fetch employees", e);
      });
  };

  const toggleStatus = async (employeeId, currentStatus) => {
    setLoading(true);
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      // Use newStatus in the API request
      await axios.patch(
        `http://52.7.177.12:8000/update_status?userid=${employeeId}&status=${newStatus}`
      );

      // Update local state after successful API call
      setEmpData((prevData) =>
        prevData.map((emp) =>
          emp.employee_id === employeeId ? { ...emp, status: newStatus } : emp
        )
      );
      console.log("success");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.AdminDashboard}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.dashboardContainer}>
        {/* <div className={styles.dashboardBoxes}>
          <div className={styles.box}>
            <div className={styles.empcount}>
              <span>{empData.length}</span>
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
        </div> */}
        <div className={styles.adminTable}>
          <div className={styles.tableHeader}>
            <h2>Employee Overview</h2>
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
                <th>Creation Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empData.map((emp) => {
                // Create a new Date object from the API's creation_date_time
                const creationDate = new Date(
                  emp.creation_date_time
                ).toLocaleDateString();

                return (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.Domain}</td>
                    <td>{creationDate}</td> {/* Only display the date */}
                    <td>{emp.status}</td>
                    <td>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={emp.status === "Active"}
                          onChange={() =>
                            toggleStatus(emp.employee_id, emp.status)
                          }
                          disabled={loading}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.pagination}>Page 1 of 100</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

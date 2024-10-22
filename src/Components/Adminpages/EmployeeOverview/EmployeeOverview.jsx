import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import styles from "../styles/EmpOverview.module.css";
// import styles from "../styles/adminDashboard.module.css";
import group from "../../../assests/Admin/ic--baseline-people.svg";
import ontime from "../../../assests/Admin/material-symbols--avg-time (1).svg";
import late from "../../../assests/Admin/pajamas--time-out.svg";
import absent from "../../../assests/Admin/mdi--weather-time.svg";
import axios from "axios";

const EmployeesOverview = () => {
  const [empData, setEmpData] = useState([]);

  const [employees, setEmployees] = useState([
    {
      id: "001",
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
      joiningDate: "2023-01-15",
      status: "Active",
    },
    {
      id: "002",
      name: "Jane Smith",
      phone: "0987654321",
      email: "jane@example.com",
      joiningDate: "2022-11-03",
      status: "Active",
    },
    {
      id: "003",
      name: "Bob Johnson",
      phone: "1122334455",
      email: "bob@example.com",
      joiningDate: "2023-03-22",
      status: "Deactive",
    },
    {
      id: "004",
      name: "Alice Brown",
      phone: "5566778899",
      email: "alice@example.com",
      joiningDate: "2022-09-01",
      status: "Active",
    },
  ]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://52.7.177.12:8000/all_employee_attendance")
      .then((res) => {
        console.log("employee fetch success", res.data);
        setEmpData(res.data);
      })
      .catch((e) => {
        console.error("error fetch employees", e);
      });
  };

  return (
    <div className={styles.EmployeeOverview}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.contentArea}>
        <div className={styles.dashboardBoxes}>
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
        </div>
        <h1 className={styles.title}>Attendence Overview</h1>
        <div className={styles.tableContainer}>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Full Days</th>
                <th>Half days(min 4hours)</th>
                <th>Leaves</th>
                {/* <th>Joining Date</th>
                <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {empData.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.full_days}</td>
                  <td>{employee.half_days}</td>
                  <td>{employee.leaves}</td>
                  {/* <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[employee.status.toLowerCase()]
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesOverview;

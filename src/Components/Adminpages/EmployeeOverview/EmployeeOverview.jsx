import React, { useState } from 'react';
import AdminSidebar from '../AdminSidebar';
import styles from "../styles/EmpOverview.module.css";

const EmployeesOverview = () => {
  const [employees, setEmployees] = useState([
    { id: '001', name: 'John Doe', phone: '1234567890', email: 'john@example.com', joiningDate: '2023-01-15', status: 'Active' },
    { id: '002', name: 'Jane Smith', phone: '0987654321', email: 'jane@example.com', joiningDate: '2022-11-03', status: 'Active' },
    { id: '003', name: 'Bob Johnson', phone: '1122334455', email: 'bob@example.com', joiningDate: '2023-03-22', status: 'Deactive' },
    { id: '004', name: 'Alice Brown', phone: '5566778899', email: 'alice@example.com', joiningDate: '2022-09-01', status: 'Active' },
  ]);

  

  return (
    <div className={styles.EmployeeOverview}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.contentArea}>
        <h1 className={styles.title}>Attendence Overview</h1>
        <div className={styles.tableContainer}>
          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Joining Date</th>
                <th>Status</th>
               
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>{new Date(employee.joiningDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.status} ${styles[employee.status.toLowerCase()]}`}>
                      {employee.status}
                    </span>
                  </td>
               
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
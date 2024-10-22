import React, { useState, useEffect } from 'react';
import styles from '../styles/PunchingDetails.module.css';
import AdminSidebar from '../AdminSidebar';
import axios from 'axios';

const PunchingDetails = () => {
  const [punchingDetails, setPunchingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Default to current date

  // Fetch punching details
  const fetchPunchingDetails = async (date) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://52.7.177.12:8000/get_all_employee_punching_details?date=${date}`
      );
      setPunchingDetails(response.data);
      console.log("punch details",response.data)
    } catch (err) {
      setError('Failed to fetch punching details');
    }
    setLoading(false);
  };

  // Fetch data for the current date on component mount
  useEffect(() => {
    fetchPunchingDetails(selectedDate);
  }, [selectedDate]);

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className={styles.punchingDetails}>
      <div className={styles.sidebar}>
        <AdminSidebar />
      </div>
      <div className={styles.content}>
        <h2>Punching Details</h2>
        
        {/* Date Selector */}
        <div className={styles.dateSelector}>
          <label>Select Date: </label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
          />
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <table className={styles.punchingTable}>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Domain</th>
                <th>Punch In</th>
                <th>Punch Out</th>
              </tr>
            </thead>
            <tbody>
              {punchingDetails.length > 0 ? (
                punchingDetails.map((detail) => (
                  <tr key={detail._id}>
                    <td>{detail.employee_id}</td>
                    <td>{detail.name}</td>
                    <td>{detail.Domain}</td>
                    <td>{new Date(detail.punch_in_time).toLocaleTimeString()}</td>
                    <td>{detail.punch_out_time ? new Date(detail.punch_out_time).toLocaleTimeString() : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No punching details available for the selected date.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PunchingDetails;


// src/components/employeepages/Employeepunchout.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../employeepages/styles/Employeepunhout.module.css";
import Employeesidebar from "./Employeesidebar";
import present from "../../assests/employee/present.svg";
import absent from "../../assests/employee/absent.svg";
import late from "../../assests/employee/late.svg";
import { Clock } from "lucide-react";
import punchout from "../../assests/employee/punchout.svg";
import { punchOut } from "../../redux/slices/employeeSlice";

export default function Employeepunchout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.user_id;
  const { punchStatus } = useSelector((state) => state.employees);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState(null);

  // Redirect to dashboard if not punched in
  useEffect(() => {
    if (userId && punchStatus !== "punchedIn") {
      navigate("/employeedashboard");
    }
  }, [punchStatus, navigate, userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ... existing helper functions ...

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className={`${styles.calendarDay} ${styles.calendarDayEmpty}`}
        ></div>
      );
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === currentDate.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();
      days.push(
        <div
          key={`day-${i}`}
          className={`${styles.calendarDay} ${isToday ? styles.current : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handlePunchOut = () => {
    const currentDateTime = new Date().toISOString();

    axios
      .post(`http://52.7.177.12:8000/PunchOut?userid=${userId}`, {
        date_and_time: currentDateTime,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(punchOut({ userId }));
          setError(null);
          navigate("/employeedashboard"); // Navigate back to dashboard after successful punch out
        } else {
          throw new Error("Punch-out failed");
        }
      })
      .catch((err) => {
        console.error("Error during punch-out:", err);
        setError("Failed to punch out. Please try again.");
      });
  };

  // If not punched in, return null while redirecting
  if (punchStatus !== "punchedIn") {
    return null;
  }

  return (
    <div className={styles.employeeDashboard}>
      <div className={styles.sidebar}>
        <Employeesidebar />
      </div>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardBoxes}>
          <div className={styles.box}>
            <div className={styles.presentday}>
              <h1>20</h1>
              <img src={present} alt="" />
            </div>
            <h3>No. of days present</h3>
          </div>
          <div className={styles.box}>
            <div className={styles.presentday}>
              <h1>10</h1>
              <img src={absent} alt="" />
            </div>
            <h3>No. of days absent</h3>
          </div>
          <div className={styles.box}>
            <div className={styles.presentday}>
              <h1>20</h1>
              <img src={late} alt="" />
            </div>
            <h3>Late Logins</h3>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.calendarSection}>
            <h2>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className={styles.calendarGrid}>
              <div className={styles.calendarDayHeader}>Mo</div>
              <div className={styles.calendarDayHeader}>Tu</div>
              <div className={styles.calendarDayHeader}>We</div>
              <div className={styles.calendarDayHeader}>Th</div>
              <div className={styles.calendarDayHeader}>Fr</div>
              <div className={styles.calendarDayHeader}>Sa</div>
              <div className={styles.calendarDayHeader}>Su</div>
              {generateCalendar()}
            </div>
          </div>
          <div className={styles.clockSection}>
            <div className={styles.clock}>
              <Clock size={150} />
              <div
                className={styles.clockHand}
                style={{
                  transform: `rotate(${currentTime.getSeconds() * 6}deg)`,
                }}
              ></div>
            </div>
            <div className={styles.time}>{formatTime(currentTime)}</div>
            <div className={styles.timeTrackingSection}>
              <div className={styles.punchinsec}>
                <img src={punchout} alt="" />
                <button
                  className={styles.punchButton}
                  onClick={handlePunchOut}
                  disabled={punchStatus === "punchedOut"}
                >
                  {punchStatus === "punchedOut" ? "Punched Out" : "Punch Out"}
                </button>
              </div>
              {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

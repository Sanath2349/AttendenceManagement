import React, { useEffect, useState } from "react";
import styles from "../employeepages/styles/Employeedashboard.module.css";
import Employeesidebar from "./Employeesidebar";
import present from "../../assests/employee/present.svg";
import absent from "../../assests/employee/absent.svg";
import late from "../../assests/employee/late.svg";
import { Calendar, Clock } from "lucide-react";
import punch from "../../assests/employee/punchin.svg"

export default function Employeedashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            {" "}
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
            <img src={punch} alt="" />
            <button className={styles.punchButton}>Punch In</button>
            </div>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

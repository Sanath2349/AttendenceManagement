import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Register from "./Components/register/Register";
import Login from "./Components/login/login";
import Navbar from "./Components/Navbar/Navbar";
import AdminDashboard from "./Components/Adminpages/AdminDashboard/AdminDashboard";
import Employeedashboard from "./Components/employeepages/Employeedashboard";

import Employeepunchout from "./Components/employeepages/Employeepunchout";
import Employeeoverview from "./Components/employeepages/Employeeoverview";
import EmployeesOverview from "./Components/Adminpages/EmployeeOverview/EmployeeOverview";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/employeesdashboard" element={<Employeedashboard/>}/>
        <Route path="/employeepunchout" element={<Employeepunchout/>}/>
        <Route path="/employeeoverview" element={<Employeeoverview/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

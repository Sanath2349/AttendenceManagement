import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Register from "./Components/register/Register";
import Login from "./Components/login/login";
import Navbar from "./Components/Navbar/Navbar";
import AdminDashboard from "./Components/Adminpages/AdminDashboard/AdminDashboard";
import EmployeesOverview from "./Components/Adminpages/EmployeeOverview/EmployeeOverview";
import Employeedashboard from "./Components/employeepages/Employeedashboard";
import Employeepunchout from "./Components/employeepages/Employeepunchout";
import Employeeoverview from "./Components/employeepages/Employeeoverview";
import ProtectedEmployeeRoute from "./Routes/ProtectedEmployeeRoute ";
import ProtectedAdminRoute from "./Routes/ProtectedAdminRoute";
import { useDispatch, useSelector } from "react-redux";
import { loadPunchStatus } from "./redux/slices/employeeSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      dispatch(loadPunchStatus({ userId: currentUser.user_id }));
    }
  }, [dispatch, currentUser]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* admin routes */}
        <Route
          path="/admindashboard"
          element={<ProtectedAdminRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/attendanceoverview"
          element={<ProtectedAdminRoute element={<EmployeesOverview />} />}
        />

        {/* Employee routes - protected */}
        <Route
          path="/employeedashboard"
          element={<ProtectedEmployeeRoute element={<Employeedashboard />} />}
        />
        <Route
          path="/employeepunchout"
          element={<ProtectedEmployeeRoute element={<Employeepunchout />} />}
        />
        <Route
          path="/employeeoverview"
          element={<ProtectedEmployeeRoute element={<Employeeoverview />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;













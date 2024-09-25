import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Register from "./Components/register/Register";
import Login from "./Components/login/login";
import Navbar from "./Components/Navbar/Navbar";
import AdminDashboard from "./Components/Adminpages/AdminDashboard/AdminDashboard";
import Employeedashboard from "./Components/employeepages/Employeedashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/employeedashboard" element={<Employeedashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Register from "./Components/register/Register";
import Login from "./Components/login/login";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

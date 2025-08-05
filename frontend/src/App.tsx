import "./i18n";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clients from "./pages/Clients";
import Booking from "./pages/Booking/Booking";
import MyBooking from "./pages/MyBooking/MyBooking";
import MySchedual from "./pages/MySchedual/MySchedual";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my_booking" element={<MyBooking />} />
        <Route path="/my_schedual" element={<MySchedual />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

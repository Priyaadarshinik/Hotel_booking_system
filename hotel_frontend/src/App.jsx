import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserHotels from "./pages/user/UserHotels";
import AdminHotels from "./pages/admin/AdminHotels";
import UserRooms from "./pages/user/UserRooms";
import AdminRooms from "./pages/admin/AdminRooms";
import UserBookings from "./pages/user/UserBookings";
import AdminBookings from "./pages/admin/AdminBookings";
import UserReviews from "./pages/user/UserReviews";
import AdminReviews from "./pages/admin/AdminReviews";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user/dashboard" element={<MainLayout><UserDashboard /></MainLayout>} />
        <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
        <Route path="/user/hotels" element={<MainLayout><UserHotels /></MainLayout>} />
        <Route path="/admin/hotels" element={<MainLayout><AdminHotels /></MainLayout>} />
        <Route path="/admin/hotels/:hotelId/rooms" element={<MainLayout><AdminRooms /></MainLayout>} />
        <Route path="/user/hotels/:hotelId/rooms" element={<MainLayout><UserRooms /></MainLayout>} />
        <Route path="/admin/rooms" element={<MainLayout><AdminRooms /></MainLayout>} />
        <Route path="/user/bookings" element={<MainLayout><UserBookings /></MainLayout>} />
        <Route path="/admin/bookings" element={<MainLayout><AdminBookings /></MainLayout>} />
        <Route path="/user/reviews" element={<MainLayout><UserReviews /></MainLayout>} />
        <Route path="/admin/reviews" element={<MainLayout><AdminReviews /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
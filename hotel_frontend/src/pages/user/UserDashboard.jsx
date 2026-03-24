import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalBookings: 0, upcomingStays: 0, reviewsWritten: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Same logic as UserBookings.jsx — decode token to get email, find user, filter bookings
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userEmail = payload.sub;

        const usersRes = await api.get("/users");
        const currentUser = usersRes.data.find(u => u.email === userEmail);
        if (!currentUser) return;

        const bookingsRes = await api.get("/bookings");
        const myBookings = bookingsRes.data.filter(
          b => b.user && b.user.userId === currentUser.userId
        );

        const today = new Date();
        const upcomingStays = myBookings.filter(
          b => b.bookingStatus !== "CANCELLED" && new Date(b.checkIn) >= today
        ).length;

        // Fetch reviews and filter by userId
        const reviewsRes = await api.get("/reviews");
        const myReviews = reviewsRes.data.filter(
          r => r.user && r.user.userId === currentUser.userId
        );

        setStats({
          totalBookings: myBookings.length,
          upcomingStays,
          reviewsWritten: myReviews.length,
        });
      } catch (err) {
        console.error("Failed to fetch user stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-10">

      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <CalendarCheck />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h2 className="text-xl font-bold">{stats.totalBookings}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Clock />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Upcoming Stays</p>
            <h2 className="text-xl font-bold">{stats.upcomingStays}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Star />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Reviews Written</p>
            <h2 className="text-xl font-bold">{stats.reviewsWritten}</h2>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/user/hotels")}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <h3 className="font-semibold">View Hotels</h3>
          </div>

          <div
            onClick={() => navigate("/user/bookings")}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <h3 className="font-semibold">My Bookings</h3>
          </div>

          <div
            onClick={() => navigate("/user/reviews")}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <h3 className="font-semibold">My Reviews</h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;
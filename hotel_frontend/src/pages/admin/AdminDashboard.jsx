import { Building2, BedDouble, CalendarCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ hotels: 0, rooms: 0, bookings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [hotelsRes, roomsRes, bookingsRes] = await Promise.all([
          api.get("/hotels"),
          api.get("/rooms"),
          api.get("/bookings"),
        ]);
        setStats({
          hotels: hotelsRes.data.length,
          rooms: roomsRes.data.length,
          bookings: bookingsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Building2 />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Hotels</p>
            <h2 className="text-xl font-bold">{stats.hotels}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <BedDouble />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Rooms</p>
            <h2 className="text-xl font-bold">{stats.rooms}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <CalendarCheck />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Bookings</p>
            <h2 className="text-xl font-bold">{stats.bookings}</h2>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10 grid grid-cols-3 gap-6 max-w-4xl">

        <div
          onClick={() => navigate("/admin/hotels")}
          className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md cursor-pointer transition-shadow"
        >
          <h3 className="font-semibold text-lg text-gray-800">Manage Hotels</h3>
        </div>

        <div
          onClick={() => navigate("/admin/bookings")}
          className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md cursor-pointer transition-shadow"
        >
          <h3 className="font-semibold text-lg text-gray-800">View Bookings</h3>
        </div>

        <div
          onClick={() => navigate("/admin/reviews")}
          className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md cursor-pointer transition-shadow"
        >
          <h3 className="font-semibold text-lg text-gray-800">Manage Reviews</h3>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
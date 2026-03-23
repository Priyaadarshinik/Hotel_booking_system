import { useNavigate } from "react-router-dom";

import { CalendarCheck, Clock, Star, Hotel, BookOpen, MessageSquare, User } from "lucide-react";

const UserDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen p-10">
      
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">

        {/* Total Bookings */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <CalendarCheck />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>
        </div>

        {/* Upcoming Stays */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Clock />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Upcoming Stays</p>
            <h2 className="text-xl font-bold">2</h2>
          </div>
        </div>

        {/* Reviews Written */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Star />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Reviews Written</p>
            <h2 className="text-xl font-bold">5</h2>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-3 gap-6">
          {/* View Hotels */}
          <div 
            onClick={() => navigate("/user/hotels")}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md cursor-pointer"
            >
            <h3 className="font-semibold">View Hotels</h3>
            </div>
          
          {/* My Bookings */}
          <div 
            onClick={() => navigate("/user/bookings")}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-md cursor-pointer"
            >
            <h3 className="font-semibold">My Bookings</h3>
            </div>

          {/* My Reviews */}
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
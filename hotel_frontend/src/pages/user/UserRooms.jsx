import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { ArrowLeft } from "lucide-react";

const UserRooms = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const endpoint = hotelId ? `/rooms/${hotelId}` : "/rooms";
      const response = await api.get(endpoint);
      setRooms(response.data);
    } catch (err) {
      setError("Failed to fetch rooms.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = async (room) => {
    if (!checkIn || !checkOut) {
      alert("Please select both Check-In and Check-Out dates first.");
      return;
    }

    try {
      setBookingLoading(true);

      // 1. Get Logged In User Email
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first.");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userEmail = payload.sub;

      // 2. Fetch User ID
      const usersRes = await api.get("/users");
      const currentUser = usersRes.data.find(u => u.email === userEmail);
      if (!currentUser) throw new Error("Could not map local user to database.");

      // 3. Create Booking Payload
      const bookingData = {
        checkIn: checkIn,
        checkOut: checkOut,
        bookingStatus: "PENDING",
        user: { userId: currentUser.userId },
        hotel: { hotelId: Number(hotelId) },
        room: { roomId: room.roomId }
      };

      await api.post("/bookings", bookingData);
      
      alert("Booking successfully submitted! You can view it in your bookings panel.");
      navigate("/user/bookings");
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Failed to create booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/user/hotels")} 
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-semibold">Select a Room</h1>
      </div>

      {loading && <p>Loading available rooms...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && rooms.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100 flex gap-6 items-center flex-wrap">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-In Date</label>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-Out Date</label>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      )}

      {!loading && !error && rooms.length === 0 && (
        <div className="bg-white p-10 rounded-xl text-center shadow-sm">
          <p className="text-gray-500">No rooms are currently available for this property.</p>
        </div>
      )}

      {/* Rooms Grid */}
      <div className="grid grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room.roomId} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold capitalize">{room.roomType?.toLowerCase()} Room</h2>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                Up to {room.maxGuest} guests
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4 h-10">
              {room.quantity > 0
                ? `${room.quantity} rooms currently available`
                : "Sold Out"}
            </p>

            <div className="mb-6">
              <p className="text-2xl font-bold">₹{room.price}</p>
              <p className="text-sm text-gray-400">per night</p>
            </div>

            <button
              onClick={() => handleBookRoom(room)}
              disabled={room.quantity === 0 || bookingLoading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                room.quantity === 0 || bookingLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {bookingLoading ? "Processing..." : room.quantity === 0 ? "Unavailable" : "Book Now"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRooms;
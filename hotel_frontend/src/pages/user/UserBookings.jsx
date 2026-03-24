import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const UserBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userEmail = payload.sub;

      const usersRes = await api.get("/users");
      const currentUser = usersRes.data.find(u => u.email === userEmail);

      if (!currentUser) throw new Error("Could not map local user to database.");

      const bookingsRes = await api.get("/bookings");
      let myBookings = bookingsRes.data.filter(b => b.user && b.user.userId === currentUser.userId);

      myBookings.sort((a,b) => b.bookingId - a.bookingId);
      setBookings(myBookings);
    } catch (err) {
      console.error(err);
      setError("Failed to load your personal bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if(window.confirm("Cancel this booking?")) {
      try {
        await api.patch(`/bookings/${bookingId}`, { bookingStatus: "CANCELLED" });
        setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, bookingStatus: "CANCELLED" } : b));
      } catch (err) {
        alert("Failed to cancel.")
      }
    }
  };

  const handleWriteReview = (hotelId) => {
    console.log('Navigating with hotelId:', hotelId);  // DEBUG
    navigate(`/user/reviews?hotelId=${hotelId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-semibold">My Bookings</h1>
        <Link to="/user/hotels" className="text-sm text-blue-600 underline">Book another stay</Link>
      </div>

      {loading && <p>Loading your reservations...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white p-10 rounded-xl text-center shadow-sm">
          <p className="text-gray-500 mb-4">You have no upcoming stays booked.</p>
          <Link to="/user/hotels" className="text-blue-500 font-medium">Browse Hotels</Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 font-medium">Hotel</th>
                <th className="p-4 font-medium">Room</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{b.hotel?.name || "N/A"}</td>
                  <td className="p-4 text-gray-600 capitalize">{b.room?.roomType?.toLowerCase() || "N/A"}</td>
                  <td className="p-4 text-gray-600 whitespace-nowrap">{b.checkIn} to {b.checkOut}</td>

                  <td className="p-4">
                    {b.bookingStatus === "CONFIRMED" && <span className="text-green-600 font-medium">Confirmed</span>}
                    {b.bookingStatus === "PENDING" && <span className="text-yellow-600 font-medium">Pending Review</span>}
                    {b.bookingStatus === "CANCELLED" && <span className="text-red-500 font-medium">Cancelled</span>}
                  </td>

                  <td className="p-4 space-x-2">
                    {b.bookingStatus !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancel(b.bookingId)}
                        className="text-red-500 text-sm hover:underline font-medium border border-red-500 rounded px-2 py-1 hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    {/* Write Review for ALL bookings */}
                    <button
                      onClick={() => handleWriteReview(b.hotel?.hotelId || b.hotelId)}
                      className="bg-black text-white text-sm font-medium rounded px-3 py-1 hover:bg-black-800 transition-colors"
                    >
                      Write Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserBookings;

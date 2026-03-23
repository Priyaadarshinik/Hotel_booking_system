import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings");
      // Load newest bookings first based on ID
      setBookings(response.data.sort((a,b) => b.bookingId - a.bookingId));
    } catch (err) {
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { bookingStatus: newStatus });
      setBookings(bookings.map(b => 
        b.bookingId === bookingId ? { ...b, bookingStatus: newStatus } : b
      ));
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "CONFIRMED": return "text-green-600 bg-green-50";
      case "PENDING": return "text-yellow-600 bg-yellow-50";
      case "CANCELLED": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">All Bookings</h1>
      
      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">No bookings have been made yet.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && bookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 font-medium text-gray-600">ID</th>
                <th className="p-4 font-medium text-gray-600">User</th>
                <th className="p-4 font-medium text-gray-600">Hotel</th>
                <th className="p-4 font-medium text-gray-600">Room</th>
                <th className="p-4 font-medium text-gray-600">Dates</th>
                <th className="p-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">#{b.bookingId}</td>
                  <td className="p-4 font-medium">{b.user?.username || b.user?.email || "N/A"}</td>
                  <td className="p-4 text-gray-800">{b.hotel?.name || "N/A"}</td>
                  <td className="p-4 capitalize text-gray-800">{b.room?.roomType?.toLowerCase() || "N/A"}</td>
                  <td className="p-4 text-sm whitespace-nowrap">
                    {b.checkIn} to {b.checkOut}
                  </td>

                  <td className="p-4">
                    <select
                      value={b.bookingStatus}
                      onChange={(e) => updateStatus(b.bookingId, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-0 cursor-pointer outline-none appearance-none \${getStatusColor(b.bookingStatus)}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
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

export default AdminBookings;
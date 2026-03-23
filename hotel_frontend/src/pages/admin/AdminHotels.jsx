import { useState, useEffect } from "react";
import { Plus, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const AdminHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotels");
        setHotels(response.data);
      } catch (err) {
        setError("Failed to fetch hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        await api.delete(`/hotels/${hotelId}`);
        setHotels(hotels.filter(h => h.hotelId !== hotelId));
      } catch (err) {
        alert("Failed to delete hotel.");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Manage Hotels</h1>
        <button
          onClick={() => navigate("/admin/hotels/add")}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Hotel
        </button>
      </div>

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && hotels.length === 0 && (
        <p>No hotels found. Add one to get started.</p>
      )}

      {/* Table */}
      {!loading && !error && hotels.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">City</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((h) => (
                <tr key={h.hotelId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">{h.name}</td>
                  <td className="p-4">{h.city}</td>
                  <td className="p-4">
                    {h.hotelRating
                      ? `${parseFloat(h.hotelRating).toFixed(1)} stars`
                      : "N/A"}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/hotels/${h.hotelId}/rooms`)}
                      className="text-emerald-600 font-medium text-sm border border-emerald-600 px-2 py-1 rounded hover:bg-emerald-50"
                    >
                      Manage Rooms
                    </button>
                    <button
                      onClick={() => navigate(`/admin/hotels/edit/${h.hotelId}`)}
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h.hotelId)}
                      className="text-red-500 text-sm"
                    >
                      Delete
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

export default AdminHotels;
import { useState, useEffect } from "react";
import { Plus, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const AdminHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHotel, setNewHotel] = useState({
    name: "", description: "", address: "", city: "", hotelRating: "",
  });

  useEffect(() => { fetchHotels(); }, []);

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

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newHotel,
        hotelRating: newHotel.hotelRating ? parseFloat(newHotel.hotelRating) : null,
      };
      const response = await api.post("/hotels", payload);
      setHotels([...hotels, response.data]);
      setShowAddModal(false);
      setNewHotel({ name: "", description: "", address: "", city: "", hotelRating: "" });
    } catch (err) {
      alert("Failed to add hotel.");
    }
  };

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
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Hotel
        </button>
      </div>

      {/* Inline Add Hotel Form */}
      {showAddModal && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Hotel</h2>
          <form onSubmit={handleAddHotel} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
              <input type="text" required placeholder="e.g. Grand Hyatt"
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                value={newHotel.name}
                onChange={e => setNewHotel({ ...newHotel, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" required placeholder="e.g. Mumbai"
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                value={newHotel.city}
                onChange={e => setNewHotel({ ...newHotel, city: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" placeholder="e.g. 123 Marine Drive"
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                value={newHotel.address}
                onChange={e => setNewHotel({ ...newHotel, address: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" step="0.1" placeholder="e.g. 4.5"
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black"
                value={newHotel.hotelRating}
                onChange={e => setNewHotel({ ...newHotel, hotelRating: e.target.value })} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={2} placeholder="Brief description of the hotel..."
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black resize-none"
                value={newHotel.description}
                onChange={e => setNewHotel({ ...newHotel, description: e.target.value })} />
            </div>
            <div className="col-span-2 flex justify-end gap-3 mt-2">
              <button type="button" onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Save Hotel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && hotels.length === 0 && <p>No hotels found. Add one to get started.</p>}

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
                  <td className="p-4">{h.hotelRating ? `${parseFloat(h.hotelRating).toFixed(1)} stars` : "N/A"}</td>
                  <td className="p-4 flex gap-3">
                    <button onClick={() => navigate(`/admin/hotels/${h.hotelId}/rooms`)}
                      className="text-emerald-600 font-medium text-sm border border-emerald-600 px-2 py-1 rounded hover:bg-emerald-50">
                      Manage Rooms
                    </button>
                    <button onClick={() => navigate(`/admin/hotels/edit/${h.hotelId}`)}
                      className="text-blue-500 text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(h.hotelId)} className="text-red-500 text-sm">
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
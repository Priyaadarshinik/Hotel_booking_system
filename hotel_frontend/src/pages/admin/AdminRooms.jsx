import { useState, useEffect } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const AdminRooms = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomType: "SINGLE",
    maxGuest: 1,
    price: 1500,
    quantity: 5,
  });

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

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!hotelId) {
      alert("Hotel ID is required to add a room.");
      return;
    }
    try {
      const payload = {
        ...newRoom,
        hotel: { hotelId: Number(hotelId) }
      };
      const response = await api.post("/rooms", payload);
      setRooms([...rooms, response.data]);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add room.");
    }
  };

  const handleDelete = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await api.delete(`/rooms/${roomId}`);
        setRooms(rooms.filter(r => r.roomId !== roomId));
      } catch (err) {
        alert("Failed to delete room.");
      }
    }
  };

  const handleUpdateQuantity = async (roomId) => {
    try {
      await api.patch(`/rooms/${roomId}`, { quantity: parseInt(editQuantity) });
      setRooms(rooms.map(r => r.roomId === roomId ? { ...r, quantity: parseInt(editQuantity) } : r));
      setEditingId(null);
    } catch (err) {
      alert("Failed to update quantity.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {hotelId && (
            <button 
              onClick={() => navigate("/admin/hotels")} 
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-3xl font-semibold">Manage Rooms</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Room
        </button>
      </div>

      {/* Add Room Modal/Form */}
      {showAddModal && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Room</h2>
          <form onSubmit={handleAddRoom} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select 
                value={newRoom.roomType}
                onChange={e => setNewRoom({...newRoom, roomType: e.target.value})}
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black"
              >
                <option value="SINGLE">Single</option>
                <option value="DOUBLE">Double</option>
                <option value="DELUXE">Deluxe</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
              <input 
                type="number" min="1" required 
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black" 
                value={newRoom.maxGuest} 
                onChange={e => setNewRoom({...newRoom, maxGuest: Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night (₹)</label>
              <input 
                type="number" min="0" required 
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black" 
                value={newRoom.price} 
                onChange={e => setNewRoom({...newRoom, price: Number(e.target.value)})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
              <input 
                type="number" min="1" required 
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-black" 
                value={newRoom.quantity} 
                onChange={e => setNewRoom({...newRoom, quantity: Number(e.target.value)})} 
              />
            </div>
            <div className="col-span-2 flex justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)} 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Save Room
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Loading rooms...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && rooms.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No rooms are configured for this property yet.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && rooms.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left bg-white">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 font-medium text-gray-600">Hotel</th>
                <th className="p-4 font-medium text-gray-600">Room Type</th>
                <th className="p-4 font-medium text-gray-600">Capacity</th>
                <th className="p-4 font-medium text-gray-600">Price</th>
                <th className="p-4 font-medium text-gray-600">Availability</th>
                <th className="p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.roomId} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{room.hotel?.name || "Unknown"}</td>
                  <td className="p-4 capitalize">{room.roomType?.toLowerCase()}</td>
                  <td className="p-4">{room.maxGuest} Guests</td>
                  <td className="p-4 font-semibold">₹{room.price}</td>

                  {/* Availability Column */}
                  <td className="p-4">
                    {editingId === room.roomId ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          className="w-20 p-1 border rounded text-sm outline-none"
                        />
                        <button 
                          onClick={() => handleUpdateQuantity(room.roomId)}
                          className="bg-black text-white px-2 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="text-gray-500 text-xs hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        {room.quantity > 0 ? (
                          <span className="font-semibold text-green-600">{room.quantity} Available</span>
                        ) : (
                          <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded text-sm">Sold Out</span>
                        )}
                        <button 
                          onClick={() => {
                            setEditQuantity(room.quantity || 0);
                            setEditingId(room.roomId);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline"
                        >
                          Update
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="p-4 flex gap-4 items-center mt-1">
                    <button 
                      onClick={() => handleDelete(room.roomId)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
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

export default AdminRooms;
import { useState, useEffect } from "react";
import { Search, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const UserHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");  // ✅ search state

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

  // ✅ Filter hotels by name or city
  const filteredHotels = hotels.filter((hotel) => {
    const query = search.toLowerCase();
    return (
      hotel.name?.toLowerCase().includes(query) ||
      hotel.city?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">Explore Hotels</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white p-3 rounded-xl shadow-sm mb-8 w-full max-w-xl">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // ✅ wired up
          placeholder="Search by city or hotel..."
          className="outline-none w-full"
        />
      </div>

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredHotels.length === 0 && (
        <p className="text-gray-500">No hotels found{search ? ` for "${search}"` : ""}.</p>
      )}

      {/* Hotel Cards */}
      <div className="grid grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.hotelId} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md">
            <div className="p-4">
              <h2 className="font-semibold text-lg">{hotel.name}</h2>
              <div className="flex items-center mt-1">
                <MapPin className="text-gray-500 text-sm" />
                <span className="text-gray-500 text-sm ml-1">
                  {hotel.city}, {hotel.address || "Location unavailable"}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 fill-current" />
                <span className="text-gray-500 text-sm ml-1">
                  {hotel.hotelRating
                    ? `${parseFloat(hotel.hotelRating).toFixed(1)} stars`  // ✅ clean decimal
                    : "No rating"}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-700">{hotel.description}</p>
              <p className="mt-4 font-semibold text-green-700">Explore more info on the properties!</p>

              <button
                onClick={() => navigate(`/user/hotels/${hotel.hotelId}/rooms`)}
                className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                View Rooms
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHotels;
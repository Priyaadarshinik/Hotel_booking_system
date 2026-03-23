import { useState, useEffect } from "react";
import { Trash2, Star } from "lucide-react";
import api from "../../api/axiosConfig";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get("/reviews");
      // Set reviews descending by ID so newest is typically on top
      setReviews(response.data.sort((a,b) => b.reviewId - a.reviewId));
    } catch (err) {
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter(r => r.reviewId !== reviewId));
      } catch (err) {
        alert("Failed to delete review.");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">All Reviews</h1>

      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p>No reviews have been submitted yet.</p>
      )}

      {/* Review List */}
      {!loading && !error && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.reviewId} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start hover:shadow-md transition-shadow">
              
              <div>
                <h3 className="font-semibold text-lg text-gray-900 border-b pb-1 mb-2">Hotel: {r.hotel?.name || "Unknown"}</h3>
                <h4 className="text-gray-700 font-medium">User: {r.user?.username || r.user?.email || "Anonymous"}</h4>

                {/* Stars */}
                <div className="flex gap-1 text-yellow-500 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < r.ratings ? "currentColor" : "none"} 
                      className={i < r.ratings ? "text-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2 font-medium">({r.ratings}/5)</span>
                </div>

                <p className="text-gray-800 italic mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100 min-w-[300px]">
                  "{r.review}"
                </p>
              </div>

              {/* Delete */}
              <button 
                onClick={() => handleDelete(r.reviewId)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors ml-4"
                title="Delete Review"
              >
                <Trash2 size={20} />
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
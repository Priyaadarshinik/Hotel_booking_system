import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import api from "../../api/axiosConfig";

const UserReviews = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Set from URL on navigation (immediate)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hotelId = params.get('hotelId');
    if (hotelId) {
      console.log('URL hotelId:', hotelId);
      setSelectedHotelId(hotelId.toString());
    }
  }, [location.search]);

  // Confirm selection after hotels load (fallback)
  useEffect(() => {
    if (selectedHotelId && hotels.length > 0) {
      const matchingHotel = hotels.find(h => h.hotelId?.toString() === selectedHotelId);
      if (matchingHotel) {
        console.log('Hotel match:', matchingHotel.name);
      } else {
        console.log('No hotel match for:', selectedHotelId);
      }
    }
  }, [hotels, selectedHotelId]);

  // Auto-select from user's bookings after they load
  useEffect(() => {
    if (bookings.length > 0) {
      const params = new URLSearchParams(location.search);
      const navHotelId = params.get('hotelId');
      if (navHotelId) {
        const targetBooking = bookings.find(b =>
          b.hotel?.hotelId?.toString() === navHotelId ||
          b.hotelId?.toString() === navHotelId
        );
        if (targetBooking) {
          console.log('Selected booking:', targetBooking.hotel?.name);
        } else {
          console.log('Bookings available:', bookings.map(b => ({id: b.hotel?.hotelId || b.hotelId, name: b.hotel?.name})));
        }
      }
    }
  }, [bookings, location.search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userEmail = payload.sub;

      const [usersRes, reviewsRes, hotelsRes, bookingsRes] = await Promise.all([
        api.get("/users"),
        api.get("/reviews"),
        api.get("/hotels"),
        api.get("/bookings"),
      ]);

      console.log('API hotels:', hotelsRes.data);  // DEBUG
      console.log('Bookings hotels:', bookingsRes.data.map(b => b.hotel?.name || b.hotel));  // DEBUG

      const me = usersRes.data.find((u) => u.email === userEmail);
      if (!me) return;

      setCurrentUser(me);
      setHotels(hotelsRes.data);
      setBookings(bookingsRes.data.filter(b => b.user && b.user.userId === me.userId));

      const myReviews = reviewsRes.data.filter(
        (r) => r.user && r.user.userId === me.userId
      );
      setReviews(myReviews);
      console.log("Your reviews:", myReviews);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setFromLatestBooking = () => {
    if (bookings.length === 0) {
      alert("No bookings found!");
      return;
    }
    const latestBooking = bookings
      .filter(b => b.bookingStatus !== 'CANCELLED')
      .sort((a, b) => new Date(b.checkOut) - new Date(a.checkOut))[0];

    if (latestBooking) {
      setSelectedHotelId(latestBooking.hotel?.hotelId?.toString() || latestBooking.hotelId?.toString() || "");
      alert(`Selected: ${latestBooking.hotel?.name || 'Booking hotel'}`);
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return alert("Please write a comment.");
    if (rating === 0) return alert("Please select a star rating.");
    if (!selectedHotelId) return alert("Please select a hotel.");

    setSubmitting(true);
    try {
      await api.post("/reviews", {
        review: comment,
        ratings: rating,
        hotel: { hotelId: parseInt(selectedHotelId) },
        user: { userId: currentUser.userId },
      });

      setComment("");
      setRating(0);
      setSelectedHotelId("");
      await fetchData();
    } catch (err) {
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(reviews.filter((r) => r.reviewId !== reviewId));
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h1 className="text-3xl font-semibold mb-6">My Reviews</h1>

      {/* Write Review Box */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="font-semibold mb-4">Write a Review</h2>

        {/* Bookings first (reliable), fallback to hotels */}
        <select
          value={selectedHotelId || ''}
          onChange={e => setSelectedHotelId(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 bg-white text-gray-700"
        >
          <option value="">Select a hotel...</option>

          {/* Priority: User's eligible bookings */}
          {bookings
            .filter(b => b.bookingStatus !== 'CANCELLED')
            .map((b) => {
              const hotelId = b.hotel?.hotelId?.toString() || b.hotelId?.toString();
              const hotelName = b.hotel?.name || 'Your Stay';
              return (
                <option key={hotelId} value={hotelId}>
                  {hotelName} ({b.checkIn} to {b.checkOut})
                </option>
              );
            })}

          {/* Fallback: Global hotels */}
          {hotels.map(h => (
            <option key={h.hotelId?.toString()} value={h.hotelId?.toString()}>
              {h.name}
            </option>
          ))}
        </select>

        {/* Star Rating */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={28}
              className="cursor-pointer transition-colors"
              fill={(hoveredRating || rating) >= s ? "#f59e0b" : "none"}
              stroke={(hoveredRating || rating) >= s ? "#f59e0b" : "#d1d5db"}
              onMouseEnter={() => setHoveredRating(s)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(s)}
            />
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-gray-500 self-center">{rating} / 5</span>
          )}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="w-full p-3 border rounded-lg mb-4 resize-none outline-none focus:ring-1 focus:ring-gray-300"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* Reviews List */}
      {loading && <p className="text-gray-500">Loading your reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && reviews.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
          You haven't written any reviews yet.
        </div>
      )}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.reviewId} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{r.hotel?.name || "Unknown Hotel"}</h3>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    fill={(r.ratings || r.rating || 0) >= s ? "#f59e0b" : "none"}
                    stroke={(r.ratings || r.rating || 0) >= s ? "#f59e0b" : "#d1d5db"}
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-2">{r.review || r.comment || "No comment"}</p>
            </div>
{/*                 <button */}
{/*                   onClick={() => handleDelete(r.reviewId)} */}
{/*                   className="text-red-500 hover:text-red-700" */}
{/*                 > */}
{/*                   <Trash2 size={18} /> */}
{/*                 </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;

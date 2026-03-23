import { Star, Trash2 } from "lucide-react";

const UserReviews = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-10">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">My Reviews</h1>

      {/* Add Review Box */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="font-semibold mb-4">Write a Review</h2>

        <textarea
          placeholder="Share your experience..."
          className="w-full p-3 border rounded-lg mb-4"
        ></textarea>

        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Submit Review
        </button>
      </div>

      {/* Review List */}
      <div className="space-y-4">

        {[1,2].map((r) => (
          <div key={r} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start">
            
            <div>
              <h3 className="font-semibold">StayBook Hotel</h3>

              {/* Stars */}
              <div className="flex gap-1 text-yellow-500 mt-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Amazing stay, very comfortable rooms!
              </p>
            </div>

            {/* Delete */}
            <button className="text-red-500">
              <Trash2 size={18} />
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default UserReviews;
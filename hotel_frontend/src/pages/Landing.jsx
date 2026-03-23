import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Building2, Calendar, MapPin } from "lucide-react";

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-32 px-4">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Perfect Stay
        </h1>

        <p className="text-gray-600 max-w-xl mb-8">
          Book hotels across India with ease. Discover comfort, luxury, and unforgettable experiences.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border px-6 py-3 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-3 gap-12 mt-24 px-20 text-center">
        
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <Building2 />
          </div>
          <h3 className="font-semibold text-lg">Wide Selection</h3>
          <p className="text-gray-500 text-sm mt-2">
            Choose from thousands of hotels across India
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <Calendar />
          </div>
          <h3 className="font-semibold text-lg">Easy Booking</h3>
          <p className="text-gray-500 text-sm mt-2">
            Simple and fast reservation process
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <MapPin />
          </div>
          <h3 className="font-semibold text-lg">Any Location</h3>
          <p className="text-gray-500 text-sm mt-2">
            Find accommodations anywhere in India
          </p>
        </div>

      </div>
    </div>
  );
};

export default Landing;
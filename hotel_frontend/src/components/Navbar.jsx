import { Link, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();
    };
    const handleLogoClick = () => {
            if (!isLoggedIn) navigate("/");
            else if (role === "ADMIN") navigate("/admin/dashboard");
            else navigate("/user/dashboard");
    };
    return (
    <div className="flex justify-between items-center px-10 py-4 bg-white border-b">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
           <Building2 size={22} />
           <h1 className="text-xl font-semibold">StayBook</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {isLoggedIn && role === "USER" && (
            <>
            <Link to="/user/hotels" className="hover:text-blue-600 transition-colors">Hotels</Link>
            <Link to="/user/bookings" className="hover:text-blue-600 transition-colors">Bookings</Link>
            <Link to="/user/reviews" className="hover:text-blue-600 transition-colors">Reviews</Link>
            </>
        )}

        {isLoggedIn && role === "ADMIN" && (
            <>
            <Link to="/admin/hotels" className="hover:text-blue-600 transition-colors">Hotels</Link>
            <Link to="/admin/bookings" className="hover:text-blue-600 transition-colors">Bookings</Link>
            <Link to="/admin/reviews" className="hover:text-blue-600 transition-colors">Reviews</Link>
            </>
        )}

        {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
            Logout
            </button>
        ) : (
            <>
            <Link to="/login" className="font-medium hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/register" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Sign Up
            </Link>
            </>
        )}

        </div>
    </div>
  );
};

export default Navbar;
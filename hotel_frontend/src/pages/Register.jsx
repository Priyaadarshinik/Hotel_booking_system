import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import api from "../api/axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        phoneNumber,
        role: email === "admin@example.com" ? "ADMIN" : "USER"
      });
      
      if (response.data === "Email already exists!") {
        setError(response.data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-10 py-4 bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <Building2 size={22} />
          <span className="text-xl font-semibold">StayBook</span>
        </Link>
      </div>

      <div className="flex justify-center items-center mt-16 pb-16">
        <div className="bg-white w-[400px] p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-gray-500 mb-6">Sign up to start booking your stays</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleRegister}>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full mt-1 mb-4 p-3 rounded-lg bg-gray-100 outline-none"
            />

            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full mt-1 mb-4 p-3 rounded-lg bg-gray-100 outline-none"
            />

            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full mt-1 mb-4 p-3 rounded-lg bg-gray-100 outline-none"
            />

            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 9876543210"
              required
              className="w-full mt-1 mb-6 p-3 rounded-lg bg-gray-100 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg flex justify-center items-center"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
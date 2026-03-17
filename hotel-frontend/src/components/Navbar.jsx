import { Link } from "react-router-dom";

export default function Navbar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <nav>

      <Link to="/dashboard">Dashboard</Link> |
      <Link to="/hotels">Hotels</Link> |
      <Link to="/bookings">Bookings</Link> |
      <Link to="/payments">Payments</Link> |
      <Link to="/reviews">Reviews</Link>

      <button onClick={logout}>Logout</button>

    </nav>

  );

}
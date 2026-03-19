import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";

export default function Navbar() {
  const navigate = useNavigate();

  // dummy user (later replace with context)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
      {/* Logo */}
      <h1
        className="text-lg font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Store Rating App
      </h1>

      {/* Links */}
      <div className="flex items-center gap-4">
        {user?.role === "ADMIN" && (
          <Link to="/admin">Dashboard</Link>
        )}

        {user?.role === "USER" && (
          <Link to="/stores">Stores</Link>
        )}

        {user?.role === "STORE_OWNER" && (
          <Link to="/owner">Dashboard</Link>
        )}

        {/* Logout */}
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
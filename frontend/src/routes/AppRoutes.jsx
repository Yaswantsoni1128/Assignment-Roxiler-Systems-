import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";

// // Admin
// import AdminDashboard from "../pages/admin/AdminDashboard.jsx";

// // User
// import StoreList from "../pages/user/StoreList.jsx";

// // Owner
// import OwnerDashboard from "../pages/owner/OwnerDashboard.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}

        {/* User */}
        {/* <Route path="/stores" element={<StoreList />} /> */}

        {/* Store Owner */}
        {/* <Route path="/owner" element={<OwnerDashboard />} /> */}

        {/* Fallback */}
        {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
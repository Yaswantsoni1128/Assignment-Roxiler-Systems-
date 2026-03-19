import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import StoreList from './pages/StoreList';
import AdminUsers from './pages/AdminUsers';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
      
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboards diverge based on role but we can handle it in a single Dashboard component or distinct routes. */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Normal Users / All */}
        <Route path="/stores" element={<StoreList />} />

        {/* Admin only */}
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['SYSTEM_ADMINISTRATOR']}><AdminUsers /></ProtectedRoute>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
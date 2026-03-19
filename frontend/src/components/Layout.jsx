import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-xl font-bold tracking-tight text-white hover:text-indigo-200 transition">Store Rating App</Link>
              {user?.role === 'SYSTEM_ADMINISTRATOR' && (
                <>
                  <Link to="/stores" className="text-sm font-medium hover:bg-indigo-500 px-3 py-2 rounded-md transition">Manage Stores</Link>
                  <Link to="/admin/users" className="text-sm font-medium hover:bg-indigo-500 px-3 py-2 rounded-md transition">Manage Users</Link>
                </>
              )}
              {user?.role === 'NORMAL_USER' && (
                <Link to="/stores" className="text-sm font-medium hover:bg-indigo-500 px-3 py-2 rounded-md transition">View Stores</Link>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-indigo-100 italic">Welcome, {user?.name} ({user?.role.replace('_', ' ')})</span>
              <button 
                onClick={handleLogout}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        &copy; 2026 Store Rating Assignment
      </footer>
    </div>
  );
};

export default Layout;

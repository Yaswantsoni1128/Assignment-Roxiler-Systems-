import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStoreOwnerStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stores/dashboard');
        setStoreData(res.data);
      } catch (err) {
        console.error('Failed to fetch store dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    if (user.role === 'SYSTEM_ADMINISTRATOR') {
      fetchAdminStats();
    } else if (user.role === 'STORE_OWNER') {
      fetchStoreOwnerStats();
    } else {
      setLoading(false);
    }
  }, [user.role]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600 font-medium">Welcome back, {user.name}!</p>
      </div>

      {user.role === 'SYSTEM_ADMINISTRATOR' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg transform transition hover:-translate-y-1">
            <h3 className="text-lg font-medium opacity-90">Total Users</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform transition hover:-translate-y-1">
            <h3 className="text-lg font-medium opacity-90">Total Stores</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalStores}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg transform transition hover:-translate-y-1">
            <h3 className="text-lg font-medium opacity-90">Total Ratings</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalRatings}</p>
          </div>
        </div>
      )}

      {user.role === 'STORE_OWNER' && storeData && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Rating</h3>
                <p className="text-5xl font-extrabold text-indigo-600 mt-2">{storeData.averageRating.toFixed(1)} <span className="text-2xl text-gray-400">/ 5</span></p>
             </div>
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Ratings</h3>
                <p className="text-5xl font-extrabold text-purple-600 mt-2">{storeData.totalRatings}</p>
             </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Recent Ratings</h3>
            </div>
            {storeData.ratings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No ratings yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {storeData.ratings.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{r.userName}</div>
                          <div className="text-sm text-gray-500">{r.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {r.rating} / 5
                          </span>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {user.role === 'NORMAL_USER' && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Explore Stores</h2>
          <p className="text-gray-500 max-w-md mx-auto">Discover and rate stores in your area. Your feedback helps others make better choices.</p>
          <div className="pt-4">
            <Link to="/stores" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">
              View All Stores
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

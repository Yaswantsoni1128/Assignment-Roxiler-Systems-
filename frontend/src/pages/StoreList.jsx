import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StoreList = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [ratingInput, setRatingInput] = useState({});

  const fetchStores = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stores`, {
        params: { search, sortBy, sortOrder }
      });
      setStores(res.data);
    } catch (err) {
      console.error('Failed to fetch stores', err);
    }
  };

  useEffect(() => {
    // debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchStores();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, sortBy, sortOrder]);

  const handleRatingSubmit = async (storeId) => {
    const rating = parseInt(ratingInput[storeId]);
    if (!rating || rating < 1 || rating > 5) return alert('Rating must be between 1 and 5');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ratings`, { storeId, rating });
      fetchStores(); // refresh list to show updated ratings
      alert('Rating submitted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Registered Stores</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search stores or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 min-w-xs shadow-sm"
          />
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer shadow-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="address">Sort by Address</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors font-medium shadow-sm"
            >
              {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1" title={store.name}>{store.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  ★ {store.averageRating?.toFixed(1) || 'No'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2 truncate" title={store.email}>{store.email}</p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2" title={store.address}>{store.address}</p>
              
              <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-1 pt-4 border-t border-gray-50">Stats</div>
              <div className="flex gap-4 text-sm text-gray-600 mb-6 font-medium">
                <div>Total Ratings: <span className="text-gray-900">{store.totalRatings}</span></div>
                {user?.role === 'NORMAL_USER' && store.userRating && (
                  <div>Your Rating: <span className="text-indigo-600">{store.userRating}</span></div>
                )}
              </div>
            </div>

            {user?.role === 'NORMAL_USER' && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="flex-grow">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={ratingInput[store.id] || ''}
                    onChange={(e) => setRatingInput({ ...ratingInput, [store.id]: e.target.value })}
                  >
                    <option value="" disabled>{store.userRating ? 'Change Rating' : 'Rate Store'}</option>
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleRatingSubmit(store.id)}
                  disabled={!ratingInput[store.id]}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  {store.userRating ? 'Update' : 'Submit'}
                </button>
              </div>
            )}
          </div>
        ))}
        {stores.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            No stores found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreList;

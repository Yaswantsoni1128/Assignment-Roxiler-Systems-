import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [roleFilter, setRoleFilter] = useState('');
  const [tab, setTab] = useState('users'); // users or stores

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'NORMAL_USER' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', ownerId: '' });

  const fetchData = async () => {
    try {
      if (tab === 'users') {
        const params = { search, sortBy, sortOrder };
        if (roleFilter) params.role = roleFilter;
        const res = await axios.get('http://localhost:5000/api/admin/users', { params });
        setUsers(res.data);
      } else {
        const res = await axios.get('http://localhost:5000/api/admin/stores', {
          params: { search, sortBy, sortOrder }
        });
        setStores(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, sortBy, sortOrder, roleFilter, tab]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/users', newUser);
      alert('User created successfully');
      setNewUser({ name: '', email: '', password: '', address: '', role: 'NORMAL_USER' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/stores', newStore);
      alert('Store created successfully');
      setNewStore({ name: '', email: '', address: '', ownerId: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create store');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${tab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}
          onClick={() => setTab('users')}
        >
          Manage Users
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${tab === 'stores' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}
          onClick={() => setTab('stores')}
        >
          Manage Stores
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search name, email, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <div className="flex gap-2 w-full md:w-auto">
          {tab === 'users' && (
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">All Roles</option>
              <option value="SYSTEM_ADMINISTRATOR">Admin</option>
              <option value="NORMAL_USER">User</option>
              <option value="STORE_OWNER">Owner</option>
            </select>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-800">{tab === 'users' ? 'Users List' : 'Stores List'}</h3>
          </div>
          <div className="overflow-x-auto p-0">
            {tab === 'users' ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {u.address}
                        {u.storeRatingInfo && (
                           <div className="mt-1 text-indigo-600 text-xs">
                             {u.storeRatingInfo.storeName} - ⭐ {u.storeRatingInfo.averageRating.toFixed(1)}
                           </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stores.map(s => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{s.name}</div>
                        <div className="text-sm text-gray-500">{s.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{s.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          ★ {s.averageRating.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{tab === 'users' ? 'Add New User' : 'Add New Store'}</h3>
          {tab === 'users' ? (
            <form onSubmit={handleCreateUser} className="space-y-4">
              <input type="text" placeholder="Name (min 20 max 60)" maxLength={60} minLength={20} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              <input type="password" placeholder="Password (8-16, 1 upper, 1 special)" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
              <textarea placeholder="Address (Max 400)" required maxLength={400} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" value={newUser.address} onChange={e => setNewUser({...newUser, address: e.target.value})} />
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                <option value="NORMAL_USER">Normal User</option>
                <option value="STORE_OWNER">Store Owner</option>
                <option value="SYSTEM_ADMINISTRATOR">System Admin</option>
              </select>
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Create User</button>
            </form>
          ) : (
            <form onSubmit={handleCreateStore} className="space-y-4">
              <input type="text" placeholder="Store Name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})} />
              <input type="email" placeholder="Store Email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newStore.email} onChange={e => setNewStore({...newStore, email: e.target.value})} />
              <textarea placeholder="Address" required maxLength={400} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" value={newStore.address} onChange={e => setNewStore({...newStore, address: e.target.value})} />
              <input type="number" placeholder="Owner ID" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={newStore.ownerId} onChange={e => setNewStore({...newStore, ownerId: e.target.value})} />
              <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Create Store</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;

import Navbar from "../../components/layout/Navbar.jsx";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded">Total Users: 0</div>
          <div className="p-4 border rounded">Total Stores: 0</div>
          <div className="p-4 border rounded">Total Ratings: 0</div>
        </div>

        {/* Store List */}
        <h3 className="text-xl mb-2">Stores</h3>
        <input
          placeholder="Search by name, email, address"
          className="border p-2 mb-3 w-full"
        />

        <table className="w-full border">
          <thead>
            <tr className="border">
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-center">
              <td>Store 1</td>
              <td>store@mail.com</td>
              <td>Delhi</td>
              <td>4.2</td>
            </tr>
          </tbody>
        </table>

        {/* Users List */}
        <h3 className="text-xl mt-6 mb-2">Users</h3>

        <table className="w-full border">
          <thead>
            <tr className="border">
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-center">
              <td>User 1</td>
              <td>user@mail.com</td>
              <td>Karnal</td>
              <td>USER</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
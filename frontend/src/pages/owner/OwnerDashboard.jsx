import Navbar from "../../components/layout/Navbar";

export default function OwnerDashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-4">Store Owner Dashboard</h2>

        {/* Average Rating */}
        <div className="p-4 border rounded mb-4">
          <h3 className="text-lg">Average Rating</h3>
          <p className="text-xl font-bold">4.3 ⭐</p>
        </div>

        {/* Users who rated */}
        <h3 className="text-xl mb-2">Users who rated your store</h3>

        <table className="w-full border">
          <thead>
            <tr className="border">
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-center">
              <td>Rahul</td>
              <td>rahul@mail.com</td>
              <td>5 ⭐</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
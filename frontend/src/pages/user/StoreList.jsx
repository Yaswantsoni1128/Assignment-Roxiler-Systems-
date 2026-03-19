import Navbar from "../../components/layout/Navbar";
import StoreCard from "../../components/store/StoreCard";

export default function StoreList() {
  const stores = [
    {
      id: 1,
      name: "ABC Store",
      address: "Delhi",
      rating: 4.5,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl mb-4">All Stores</h2>

        {/* Search */}
        <input
          placeholder="Search by name or address"
          className="border p-2 mb-4 w-full"
        />

        {/* Store List */}
        <div className="grid grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
}
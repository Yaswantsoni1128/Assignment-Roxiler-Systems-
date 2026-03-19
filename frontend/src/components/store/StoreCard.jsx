export default function StoreCard({ store }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{store.name}</h3>
      <p>{store.address}</p>
      <p className="mt-2">⭐ {store.rating}</p>

      <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
        Rate Store
      </button>
    </div>
  );
}
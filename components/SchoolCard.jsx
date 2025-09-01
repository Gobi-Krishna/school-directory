export default function SchoolCard({ id, name, address, city, image, onDelete }) {
    return (
        <div className="w-full border rounded-md shadow p-4 bg-white text-left space-y-2">
            <div className="w-full h-40 bg-gray-100 overflow-hidden rounded">
                {image ? (
                    <img src={image} alt={name} className="w-full h-40 object-cover" />
                ) : (
                    <div className="w-full h-40 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">{address}</p>
            <p className="text-gray-600">{city}</p>

            {onDelete && (
                <button
                    onClick={() => onDelete(id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            )}
        </div>
    );
}

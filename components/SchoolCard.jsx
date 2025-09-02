"use client";

export default function SchoolCard({ school, onDelete }) {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${school.name}"?`)) {
            onDelete(school.id);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={school.image || "/schoolImages/default.png"}
                    alt={school.name || "School"}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/schoolImages/default.png";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {school.name || "Unnamed School"}
                    </h2>
                    <button
                        onClick={handleDelete}
                        title="Delete school"
                        className="p-1.5 rounded-full bg-red-900/20 hover:bg-red-900/30 text-red-400 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <p className="text-gray-300 mb-1 line-clamp-2">{school.address || "No address provided"}</p>
                <p className="text-gray-300 mb-3">
                    {school.city}{school.city && school.state ? ', ' : ''}{school.state || "Location not specified"}
                </p>

                <div className="space-y-2">
                    {school.contact && (
                        <p className="flex items-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.801.129H5a2 2 0 00-2 2v10a2 2 0 002 2h9a2 2 0 002-2V8a2 2 0 00-2-2h-1.068a1 1 0 01-.948-.684L4.222 2.68A1 1 0 003 3.68V5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11h2m0 4h2m-2-8h2m0-4h2" />
                            </svg>
                            {school.contact}
                        </p>
                    )}

                    {school.email_id && (
                        <p className="flex items-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {school.email_id}
                        </p>
                    )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-700 text-xs text-gray-500">
                    Added: {school.created_at
                        ? new Date(school.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                        : 'Unknown date'}
                </div>
            </div>
        </div>
    );
}
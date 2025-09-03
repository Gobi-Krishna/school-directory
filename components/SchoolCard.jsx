// components/SchoolCard.jsx
"use client";

export default function SchoolCard({ school }) {

    // Function to truncate text with ellipsis
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col h-full border border-gray-700">

            {/* Image Container */}
            <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
                <img
                    src={school.image || "/schoolImages/default-school.png"}
                    alt={`${school.name || "School"} Logo`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    // Improve loading experience
                    onLoad={(e) => { e.target.previousElementSibling?.classList.add('opacity-0'); }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/schoolImages/default-school.png";
                        e.target.previousElementSibling?.classList.add('opacity-0'); // Hide placeholder on error too
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                {/* School Name */}
                <h3
                    className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2"
                    title={school.name || "Unnamed School"}
                >
                    {truncateText(school.name || "Unnamed School", 60)}
                </h3>

                {/* Address */}
                <div className="flex-grow">
                    <p
                        className="text-gray-300 text-sm mb-3 line-clamp-2 leading-snug" // line-clamp-2 for longer addresses
                        title={school.address || "Address not provided."} // Tooltip on hover for full address
                    >
                        {truncateText(school.address || "Address not provided.", 100)} {/* Fallback truncation */}
                    </p>
                </div>

                {/* City & State */}
                <div className="mt-auto pt-2 border-t border-gray-700">
                    <p className="text-gray-400 text-sm truncate"> {/* Truncate long city/state names */}
                        <span className="font-medium text-gray-200">{school.city || "City"}</span>
                        {school.city && school.state ? (
                            <span>, {school.state}</span>
                        ) : school.state ? (
                            <span>{school.state}</span>
                        ) : null}
                    </p>
                </div>
            </div>
        </div>
    );
}
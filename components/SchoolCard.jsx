// components/SchoolCard.jsx
"use client";

export default function SchoolCard({ school, onClick }) {

    return (
        <div
            className="school-card bg-gray-800 rounded-lg overflow-hidden flex flex-col h-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-[1.02]"
            onClick={onClick}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gray-700">
                <img
                    src={school.image || "/schoolImages/default-school.png"}
                    alt={`${school.name || "School"} Logo`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onLoad={(e) => { e.target.previousElementSibling?.classList.add('opacity-0'); }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/schoolImages/default-school.png";
                        e.target.previousElementSibling?.classList.add('opacity-0');
                    }}
                />
                {/* Make the overlay less opaque */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div> {/* Changed from /80 to /50 */}
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3
                    className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight line-clamp-2"
                    title={school.name || "Unnamed School"}
                >
                    {school.name || "Unnamed School"}
                </h3>

                <div className="flex-grow">
                    <p
                        className="text-gray-300 text-sm mb-3 line-clamp-2 leading-snug"
                        title={school.address || "Address not provided."}
                    >
                        {school.address || "Address not provided."}
                    </p>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-700">
                    <p className="text-gray-400 text-sm truncate">
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

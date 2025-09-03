// app/showSchools/page.jsx
"use client";
import { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";
import SchoolDetailsModal from "@/components/SchoolDetailsModal";

export default function ShowSchoolsPage() {
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [selectedSchool, setSelectedSchool] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchSchools = async () => {
        setIsLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/getSchools");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setSchools(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching schools:", error);
            setMessage("Failed to load schools. Please try again later.");
            setStatus("error");
            setSchools([]);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (school) => {
        setSelectedSchool(school);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSchool(null);
    };

    // --- New Function to Handle Delete Callback ---
    const handleSchoolDeleted = (deletedSchoolId) => {
        // Remove the deleted school from the local state
        setSchools(prevSchools => prevSchools.filter(school => school.id !== deletedSchoolId));
        setMessage("School deleted successfully.");
        setStatus("success");
        // Optionally, clear the success message after a few seconds
        // setTimeout(() => setMessage(""), 3000);
    };
    // --- End New Function ---

    useEffect(() => {
        fetchSchools();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-400">Searching for schools...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Explore Schools</h1>
                <p className="mt-2 text-gray-400">Discover educational institutions in your area.</p>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`mb-6 status-message ${status === 'success' ? 'status-success' : 'status-error'}`}>
                    {message}
                </div>
            )}

            {/* School Grid */}
            {schools.length === 0 ? (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    {/* ... (empty state content) ... */}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schools.map((school) => (
                            <SchoolCard key={school.id} school={school} onClick={() => openModal(school)} />
                        ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Showing {schools.length} school{schools.length !== 1 ? 's' : ''}
                    </div>
                </>
            )}

            {/* --- Render the Modal with onDelete handler --- */}
            <SchoolDetailsModal
                school={selectedSchool}
                isOpen={isModalOpen}
                onClose={closeModal}
                onDelete={handleSchoolDeleted}
            />
            {/* --- End Modal --- */}
        </div>
    );
}

// app/showSchools/page.jsx
"use client";
import { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";

export default function ShowSchoolsPage() {
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchSchools = async () => {
        setIsLoading(true);
        setMessage(""); // Clear previous messages
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
            setSchools([]); // Ensure schools is an empty array on error
        } finally {
            setIsLoading(false);
        }
    };

    // Example of handling delete (you can adapt your existing logic)
    // const handleDelete = async (id) => { ... }

    useEffect(() => {
        fetchSchools();
        // Listen for school additions from other tabs/actions if needed
        // window.addEventListener('schoolAdded', fetchSchools);
        // return () => window.removeEventListener('schoolAdded', fetchSchools);
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-200">No schools found</h3>
                    <p className="mt-1 text-gray-500">It looks like there are no schools listed yet.</p>
                    <div className="mt-6">
                        <a
                            href="/addSchool"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add the First School
                        </a>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schools.map((school) => (
                        <SchoolCard key={school.id} school={school} /* onDelete={handleDelete} */ />
                    ))}
                </div>
            )}

            {/* School Count */}
            {schools.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-500">
                    Showing {schools.length} school{schools.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
}

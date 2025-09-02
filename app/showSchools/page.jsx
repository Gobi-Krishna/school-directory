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
        try {
            const res = await fetch("/api/getSchools");
            const data = await res.json();
            setSchools(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching schools:", error);
            setMessage("❌ Failed to load schools. Please refresh.");
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch("/api/deleteSchool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setMessage("✅ School deleted successfully!");
                setStatus("success");
                fetchSchools();
            } else {
                setMessage(`❌ ${data.error || "Failed to delete school."}`);
                setStatus("error");
            }
        } catch (error) {
            console.error("Delete error:", error);
            setMessage("❌ Server error while deleting.");
            setStatus("error");
        }
    };

    useEffect(() => {
        fetchSchools();

        // Listen for school additions from other tabs
        window.addEventListener('schoolAdded', fetchSchools);
        return () => window.removeEventListener('schoolAdded', fetchSchools);
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-400">Loading schools...</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-purple-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                All Schools
            </h1>

            {message && (
                <div className={`mb-4 p-3 rounded ${status === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                    }`}>
                    {message}
                </div>
            )}

            {schools.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-xl text-gray-400">No schools found</p>
                    <p className="text-gray-500 mb-6">Add your first school to get started</p>
                    <a
                        href="/addSchool"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Add First School
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schools.map((school) => (
                        <SchoolCard key={school.id} school={school} onDelete={handleDelete} />
                    ))}
                </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
                {schools.length} school{schools.length !== 1 ? 's' : ''} found
            </div>
        </div>
    );
}
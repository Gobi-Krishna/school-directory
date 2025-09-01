"use client";
import { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    const [filter, setFilter] = useState("");

    const fetchSchools = async () => {
        const res = await fetch("/api/getSchools");
        const data = await res.json();
        setSchools(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this school?")) return;

        try {
            const res = await fetch(`/api/deleteSchool?id=${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete");
            await fetchSchools(); // refresh list
        } catch (err) {
            alert(err.message);
        }
    };

    const filtered = schools.filter(
        (s) =>
            s.name?.toLowerCase().includes(filter.toLowerCase()) ||
            s.city?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-6 min-h-screen py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-600">Schools</h1>
            <input
                type="text"
                placeholder="Search by name or city"
                className="p-3 rounded border border-gray-300 w-80 shadow-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            {filtered.length === 0 ? (
                <p>No schools found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                    {filtered.map((s) => (
                        <SchoolCard key={s.id} {...s} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}

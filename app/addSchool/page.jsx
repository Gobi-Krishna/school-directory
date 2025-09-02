"use client";
import { useState } from "react";

export default function AddSchoolPage() {
    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        image: "",
        email_id: "",
    });
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/addSchool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage("✅ School added successfully!");
                setStatus("success");
                setForm({
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    contact: "",
                    image: "",
                    email_id: "",
                });
                // Refresh schools list if needed
                window.dispatchEvent(new Event('schoolAdded'));
            } else {
                setMessage(`❌ ${data.error || "Failed to add school."}`);
                setStatus("error");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("❌ Server error. Please try again.");
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
                ➕ Add a New School
            </h1>

            <form
                onSubmit={handleSubmit}
                className="p-6 bg-gray-800 rounded-xl shadow-lg space-y-3"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="School Name *"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="tel"
                        name="contact"
                        placeholder="Phone"
                        value={form.contact}
                        onChange={handleChange}
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="email"
                        name="email_id"
                        placeholder="Email"
                        value={form.email_id}
                        onChange={handleChange}
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <textarea
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Adding...
                        </span>
                    ) : '✅ Add School'}
                </button>
            </form>

            {message && (
                <p
                    className={`mt-4 text-center font-semibold p-3 rounded ${status === "success"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-red-900/30 text-red-400"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
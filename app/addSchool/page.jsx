// app/addSchool/page.jsx
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

        // Basic client-side validation
        if (!form.name.trim() || !form.city.trim()) {
            setMessage("School Name and City are required.");
            setStatus("error");
            setIsLoading(false);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (form.email_id && !emailRegex.test(form.email_id)) {
            setMessage("Please enter a valid email address.");
            setStatus("error");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/addSchool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage("School information submitted successfully!");
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
                // Optionally, trigger a global event or redirect
                // window.dispatchEvent(new Event('schoolAdded'));
                // router.push('/showSchools'); // Requires useRouter from 'next/navigation'
            } else {
                setMessage(data.error || "Failed to submit school information. Please try again.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setMessage("A network error occurred. Please check your connection and try again.");
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-bold leading-7 text-white sm:truncate">
                        Add Your School
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-400">
                        Provide accurate details to help parents find your institution.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
                        {/* Name */}
                        <div className="sm:col-span-6">
                            <label htmlFor="name" className="form-label block text-sm font-medium mb-1">
                                School Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., Greenwood Elementary"
                            />
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-6">
                            <label htmlFor="address" className="form-label block text-sm font-medium mb-1">
                                Full Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={3}
                                value={form.address}
                                onChange={handleChange}
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., 123 Education St, Boston, MA 02101"
                            />
                        </div>

                        {/* City & State */}
                        <div className="sm:col-span-3">
                            <label htmlFor="city" className="form-label block text-sm font-medium mb-1">
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., Boston"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="state" className="form-label block text-sm font-medium mb-1">
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., MA"
                            />
                        </div>

                        {/* Contact & Email */}
                        <div className="sm:col-span-3">
                            <label htmlFor="contact" className="form-label block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., +1 (555) 123-4567"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="email_id" className="form-label block text-sm font-medium mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email_id"
                                name="email_id"
                                value={form.email_id}
                                onChange={handleChange}
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., info@greenwood.edu"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="sm:col-span-6">
                            <label htmlFor="image" className="form-label block text-sm font-medium mb-1">
                                School Logo/Image URL
                            </label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                className="form-input w-full px-3 py-2 rounded-md"
                                placeholder="e.g., https://example.com/logo.png"
                            />
                            <p className="mt-1 text-xs text-gray-500">Provide a public URL to your school's logo or image.</p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`btn-primary w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : 'Submit School Information'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`mt-4 status-message ${status === 'success' ? 'status-success' : 'status-error'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}

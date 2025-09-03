// components/SchoolDetailsModal.jsx
"use client";

import { useEffect, useRef, useState } from 'react'; // Import useState for confirmation

export default function SchoolDetailsModal({ school, isOpen, onClose, onDelete }) { // Accept onDelete prop
    const modalRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false); // State for deletion process
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for confirmation

    // Close modal on Escape key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    // --- New Functions for Delete ---
    const handleDeleteClick = () => {
        setShowDeleteConfirm(true); // Show confirmation UI
    };

    const confirmDelete = async () => {
        if (!school || !school.id) return;

        setIsDeleting(true);
        try {
            const response = await fetch('/api/deleteSchool', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: school.id }),
            });

            if (!response.ok) {
                throw new Error(`Failed to delete school: ${response.statusText}`);
            }

            // Close modal and trigger parent callback to refresh list
            onClose();
            if (onDelete) onDelete(school.id); // Call parent's delete handler

        } catch (err) {
            console.error("Error deleting school:", err);
            alert("Failed to delete school. Please try again."); // Simple alert, consider a toast notification
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false); // Hide confirmation regardless of success/failure
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
    };
    // --- End New Functions ---

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700">

                {/* Header with Title, Close, and Delete Buttons */}
                <div className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 p-4 flex justify-between items-center">
                    <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-white truncate">
                        {school.name || "School Details"}
                    </h2>
                    <div className="flex items-center space-x-2">
                        {/* --- Delete Button (Conditional) --- */}
                        {showDeleteConfirm ? (
                            <div className="flex items-center space-x-1">
                                <span className="text-xs text-red-400 hidden sm:inline">Sure?</span>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className={`px-2 py-1 text-xs rounded ${isDeleting
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : 'bg-red-700 hover:bg-red-600 text-white'
                                        }`}
                                >
                                    {isDeleting ? 'Deleting...' : 'Yes'}
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    disabled={isDeleting}
                                    className="px-2 py-1 text-xs rounded bg-gray-600 hover:bg-gray-500 text-white disabled:opacity-50"
                                >
                                    No
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleDeleteClick}
                                className="p-2 rounded-full text-gray-400 hover:bg-red-900/30 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label="Delete school"
                                title="Delete school"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        {/* --- End Delete Button --- */}

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Close details"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-5 sm:p-8">
                    {/* Header Image */}
                    <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6 bg-gray-700">
                        <img
                            src={school.image || "/schoolImages/default-school.png"}
                            alt={`${school.name} Banner`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/schoolImages/default-school.png";
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none"></div>
                        {/* Name is now in the sticky header */}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Address & Location */}
                        <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Location
                            </h3>
                            <p className="text-gray-200">{school.address || "Address not provided."}</p>
                            <p className="mt-2 text-gray-300">
                                <span className="font-medium">{school.city || "City"}</span>
                                {(school.city || school.state) && ", "}
                                <span>{school.state || "State"}</span>
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                            <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Contact
                            </h3>
                            <div className="space-y-2">
                                {school.contact ? (
                                    <p className="text-gray-200 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.801.129H5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-3.5" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11h2m0 4h2m-2-8h2m0-4h2" />
                                        </svg>
                                        {school.contact}
                                    </p>
                                ) : (
                                    <p className="text-gray-500 text-sm">Phone not provided.</p>
                                )}
                                {school.email_id ? (
                                    <p className="text-gray-200 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${school.email_id}`} className="hover:text-blue-400 transition-colors">
                                            {school.email_id}
                                        </a>
                                    </p>
                                ) : (
                                    <p className="text-gray-500 text-sm">Email not provided.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer with Date */}
                    <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500 text-center">
                        Added to SchoolFinder: {school.created_at
                            ? new Date(school.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                            : 'Unknown date'}
                    </div>
                </div>
            </div>
        </div>
    );
}

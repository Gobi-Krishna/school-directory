"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-gray-100 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo / Title */}
                <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
                    School Directory
                </Link>

                {/* Nav Links */}
                <div className="space-x-6">
                    <Link
                        href="/"
                        className="hover:text-blue-400 transition font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/addSchool"
                        className="hover:text-green-400 transition font-medium"
                    >
                        Add School
                    </Link>
                    <Link
                        href="/showSchools"
                        className="hover:text-purple-400 transition font-medium"
                    >
                        Show Schools
                    </Link>
                </div>
            </div>
        </nav>
    );
}

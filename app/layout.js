// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { Toaster } from "react-hot-toast"; // Commented out

export const metadata = {
  title: "SchoolFinder | Find the Best Schools",
  description: "Discover and manage school information with SchoolFinder, built with Next.js and PostgreSQL.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
        </div>

        {/* Professional Footer */}
        <footer className="footer-bg border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SchoolFinder. All rights reserved.</p>
            <p className="mt-1">Empowering parents to find the perfect school.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

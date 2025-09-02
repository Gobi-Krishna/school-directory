import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "School Directory | Manage and View Schools",
  description: "A modern school directory application built with Next.js and PostgreSQL",
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
        <div className="flex-1">
          <Navbar />
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </div>

        <footer className="py-6 border-t border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} School Directory. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ using Next.js 14 and Neon PostgreSQL</p>
          </div>
        </footer>

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'bg-gray-800 border border-gray-700',
            style: {
              background: '#1f2937',
              color: '#f3f4f6',
            },
          }}
        />
      </body>
    </html>
  );
}
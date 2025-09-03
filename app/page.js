
export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="hero-gradient text-white py-12 sm:py-16 rounded-xl mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Find the Perfect School for Your Child
          </h1>
          {/* Line 12: Escape the apostrophe */}
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-blue-100">
            Explore our comprehensive directory of schools. Search, compare, and connect with educational institutions that match your family&#39;s needs.
          </p>
          {/* --- End of fix --- */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/showSchools"
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Browse Schools
            </a>
            <a
              href="/addSchool"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-md hover:bg-white/10 transition duration-300 ease-in-out"
            >
              Add Your School
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-200">Why Choose SchoolFinder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm">
            <div className="text-blue-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Listings</h3>
            <p className="text-gray-400">Access detailed information on a wide range of schools in your area.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm">
            <div className="text-green-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Verified Information</h3>
            <p className="text-gray-400">We strive to provide accurate and up-to-date school details.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm">
            <div className="text-purple-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
            <p className="text-gray-400">Our intuitive interface makes finding schools simple and fast.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/30 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          School Directory
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Easily manage and view school information in one centralized location.
          Add new schools, view details, and keep your directory up to date.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <a
          href="/addSchool"
          className="group p-6 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-500/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Add School</h2>
            <p className="text-gray-400 text-center">Add a new school to the directory</p>
          </div>
        </a>

        <a
          href="/showSchools"
          className="group p-6 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14m-4 0c.001-.049 0-.098 0-.147V5c0-1.105 1.343-2 3-2s3 .895 3 2v14c0 1.105-1.343 2-3 2s-3-.895-3-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">View Schools</h2>
            <p className="text-gray-400 text-center">Browse all schools in the directory</p>
          </div>
        </a>
      </div>

      <div className="mt-12 p-4 bg-gray-800/50 rounded-xl border border-gray-700 max-w-2xl mx-auto">
        <div className="flex items-start space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-sm">
            This application uses a secure PostgreSQL database hosted on Neon.
            No data is stored locally on your device.
          </p>
        </div>
      </div>
    </div>
  );
}
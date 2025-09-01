import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-6 py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-600">School Directory</h1>
      <div className="flex gap-4">
        <Link
          href="/addSchool"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add School
        </Link>
        <Link
          href="/showSchools"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Show Schools
        </Link>
      </div>
    </div>
  );
}

// app/api/getSchools/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // <-- Correct import

export async function GET() {
    let client;
    console.log("🚀 /api/getSchools GET called");

    try {
        client = await connectDB(); // <-- Connect here

        const query = "SELECT * FROM schools ORDER BY id DESC";
        console.log("📤 Executing query:", query);
        const result = await client.query(query);
        console.log(`📤 Query executed, found ${result.rows.length} schools`);

        return NextResponse.json(result.rows || []);

    } catch (err) {
        console.error("❌ Get Schools Error:", err);
        return NextResponse.json([], { status: 500 });
    } finally {
        // Close connection
        if (client) {
            try {
                console.log("🔒 Closing database connection...");
                await client.end();
                console.log("🔒 Database connection closed");
            } catch (closeErr) {
                console.error('⚠️ Error closing database client:', closeErr);
            }
        }
    }
}

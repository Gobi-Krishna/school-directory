// app/api/deleteSchool/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; // <-- Correct import

export async function POST(req) {
    let client;
    console.log("🚀 /api/deleteSchool POST called");

    try {
        const { id } = await req.json();
        console.log("📥 Request Body ID:", id);

        if (!id) {
            console.warn("❌ Validation failed: ID missing");
            return NextResponse.json(
                { error: "School ID is required" },
                { status: 400 }
            );
        }

        client = await connectDB(); // <-- Connect here

        const query = "DELETE FROM schools WHERE id = $1";
        console.log("📤 Executing query:", query, "with ID:", id);
        await client.query(query, [id]);
        console.log("📤 Query executed successfully");

        return NextResponse.json({
            success: true,
            message: "School deleted successfully"
        });

    } catch (err) {
        console.error("❌ Delete School Error:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to delete school",
                details: err.message
            },
            { status: 500 }
        );
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

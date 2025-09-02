// app/api/addSchool/route.js
import { NextResponse } from "next/server";
// Import the named function, not a default
import { connectDB } from "@/lib/db"; // <-- Correct import

export async function POST(req) {
    let client; // Declare client here
    console.log("🚀 /api/addSchool POST called"); // Add log for debugging

    try {
        const body = await req.json();
        console.log("📥 Request Body:", body); // Log incoming data
        const { name, address, city, state, contact, image, email_id } = body;

        // Validate required fields
        if (!name || !city) {
            console.warn("❌ Validation failed: Name or City missing");
            return NextResponse.json(
                { error: "Name and city are required" },
                { status: 400 }
            );
        }

        // --- KEY CHANGE: Connect to database HERE, inside the request handler ---
        console.log("🔗 Connecting to database...");
        client = await connectDB(); // Get a new connection for this request
        console.log("🔗 Database connected successfully");

        const query = `
      INSERT INTO schools
      (name, address, city, state, contact, image, email_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

        const values = [name, address, city, state, contact, image, email_id];
        console.log("📤 Executing query with values:", values);
        const result = await client.query(query, values);
        console.log("📤 Query executed, inserted ID:", result.rows[0].id);

        return NextResponse.json({
            success: true,
            message: "School added successfully",
            schoolId: result.rows[0].id
        });

    } catch (err) {
        console.error("❌ Add School Error:", err); // Detailed error log
        return NextResponse.json(
            {
                success: false,
                error: "Failed to add school",
                details: err.message // Include error details for debugging (remove in production if sensitive)
            },
            { status: 500 }
        );
    } finally {
        // --- KEY CHANGE: Always close the connection in the 'finally' block ---
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

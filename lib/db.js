// lib/db.js
import { Client } from 'pg';

// Export the function to create a new connection, don't create a persistent pool
export async function connectDB() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for Neon
        }
    });

    await client.connect();
    console.log("✅ Connected to PostgreSQL"); // Add log for debugging
    return client;
}

// If you had a default export before, remove it or ensure it's correctly pointing to connectDB
// For now, we'll use named imports: import { connectDB } from "@/lib/db";
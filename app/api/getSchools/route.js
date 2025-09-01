import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [rows] = await getPool().query("SELECT * FROM schools ORDER BY id DESC");
        return Response.json(rows, { status: 200 });
    } catch (err) {
        console.error("Get Schools Error:", err);
        return Response.json({ message: "Error fetching schools" }, { status: 500 });
    }
}

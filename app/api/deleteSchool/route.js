import { getPool } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({ message: "Missing id" }, { status: 400 });
        }

        const pool = getPool();

        // Get image path before delete
        const [rows] = await pool.query("SELECT image FROM schools WHERE id = ?", [id]);
        if (rows.length > 0 && rows[0].image) {
            const imagePath = path.join(process.cwd(), "public", rows[0].image);
            try {
                await fs.unlink(imagePath); // delete the file if exists
            } catch (e) {
                console.warn("Image file not found:", imagePath);
            }
        }

        // Delete from DB
        await pool.query("DELETE FROM schools WHERE id = ?", [id]);

        return Response.json({ message: "School deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error("Delete School Error:", err);
        return Response.json({ message: "Error deleting school" }, { status: 500 });
    }
}

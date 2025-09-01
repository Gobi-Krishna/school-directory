import { getPool } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name")?.toString();
        const address = formData.get("address")?.toString();
        const city = formData.get("city")?.toString();
        const state = formData.get("state")?.toString();
        const contact = formData.get("contact")?.toString();
        const email_id = formData.get("email_id")?.toString();
        const imageFile = formData.get("image");

        let imageRelPath = "";

        if (imageFile && typeof imageFile === "object" && imageFile.name) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadDir = path.join(process.cwd(), "public", "schoolImages");
            await fs.mkdir(uploadDir, { recursive: true });

            const filename = `${Date.now()}_${imageFile.name.replace(/\s+/g, "_")}`;
            const filePath = path.join(uploadDir, filename);

            await fs.writeFile(filePath, buffer);
            imageRelPath = `/schoolImages/${filename}`;
        }

        const sql = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        await getPool().execute(sql, [
            name,
            address,
            city,
            state,
            contact,
            imageRelPath,
            email_id,
        ]);

        return Response.json({ message: "School added successfully" }, { status: 200 });
    } catch (err) {
        console.error("Add School Error:", err);
        return Response.json({ message: "Error saving school" }, { status: 500 });
    }
}

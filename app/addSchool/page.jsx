"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const formData = new FormData();
            Object.entries(data).forEach(([k, v]) => {
                if (k !== "image") formData.append(k, v);
            });
            if (data.image?.[0]) formData.append("image", data.image[0]);

            const res = await fetch("/api/addSchool", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Failed to save");

            reset();
            alert("School added successfully!");
        } catch (e) {
            alert(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center gap-6 py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-600">Add School</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-80 bg-white p-4 rounded shadow space-y-3">
                <input {...register("name", { required: "Name required" })} placeholder="Name" className="w-full p-2 border rounded" />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                <textarea {...register("address", { required: "Address required" })} placeholder="Address" className="w-full p-2 border rounded" />

                <input {...register("city", { required: "City required" })} placeholder="City" className="w-full p-2 border rounded" />
                <input {...register("state", { required: "State required" })} placeholder="State" className="w-full p-2 border rounded" />

                <input {...register("contact")} placeholder="Contact" className="w-full p-2 border rounded" />
                <input {...register("email_id")} placeholder="Email" type="email" className="w-full p-2 border rounded" />

                <input {...register("image")} type="file" accept="image/*" className="w-full p-2 border rounded bg-white" />

                <button disabled={submitting} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    {submitting ? "Saving..." : "Add School"}
                </button>
            </form>
        </div>
    );
}

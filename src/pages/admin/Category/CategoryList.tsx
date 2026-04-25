
import { useEffect, useState } from "react";
import api from "../../../api/api";

type Category = {
    id: number;
    name: string;
};

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState<Category | null>(null);

    const [form, setForm] = useState({
        name: "",
    });

    // LOAD DATA
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/Category"); // 👉 backend API
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // OPEN ADD
    const openAdd = () => {
        setEditing(null);
        setForm({ name: "" });
        setIsOpen(true);
    };

    // OPEN EDIT
    const openEdit = (cat: Category) => {
        setEditing(cat);
        setForm({ name: cat.name });
        setIsOpen(true);
    };

    // SAVE
    const handleSave = async () => {
        try {
            if (editing) {
                await api.put(`/Category/${editing.id}`, {
                    id: editing.id,
                    name: form.name,
                });
            } else {
                await api.post("/Category", {
                    name: form.name,
                });
            }

            setIsOpen(false);
            fetchCategories();
        } catch (err) {
            console.log(err);
            alert("Lỗi lưu category!");
        }
    };

    // DELETE
    const handleDelete = async (id: number) => {
        if (!confirm("Xoá category này?")) return;

        try {
            await api.delete(`/Category/${id}`);
            setCategories(categories.filter((c) => c.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // FILTER
    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📂 Quản lý Category</h1>

                <button
                    onClick={openAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Thêm Category
                </button>
            </div>

            {/* SEARCH */}
            <input
                className="w-full p-2 border rounded mb-4"
                placeholder="Tìm category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((c) => (
                            <tr key={c.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{c.id}</td>
                                <td className="p-3">{c.name}</td>

                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => openEdit(c)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[400px]">

                        <h2 className="text-xl font-bold mb-4">
                            {editing ? "✏️ Edit Category" : "➕ Add Category"}
                        </h2>

                        <input
                            className="w-full border p-2 mb-4 rounded"
                            placeholder="Category name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
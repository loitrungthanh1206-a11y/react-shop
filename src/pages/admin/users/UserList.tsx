import { useEffect, useState } from "react";
import api from "../../../api/api";

type User = {
    id: number;
    username: string;
    email: string;
    role: string;
    password?: string;
};

export default function UserAdmin() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Customer",
    });

    // LOAD USERS
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/User"); // FIX ROUTE
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // OPEN ADD
    const openAdd = () => {
        setEditingUser(null);
        setForm({
            username: "",
            email: "",
            password: "",
            role: "Customer",
        });
        setIsOpen(true);
    };

    // OPEN EDIT
    const openEdit = (user: User) => {
        setEditingUser(user);
        setForm({
            username: user.username,
            email: user.email,
            password: "",
            role: user.role,
        });
        setIsOpen(true);
    };

    // SAVE (ADD / UPDATE)
    const handleSave = async () => {
        try {
            if (editingUser) {
                await api.put(`/User/${editingUser.id}`, {
                    id: editingUser.id,
                    username: form.username,
                    email: form.email,
                    role: form.role,
                    password: form.password || ""
                });
            } else {
                await api.post("/User", form);
            }

            setIsOpen(false);
            fetchUsers();
        } catch (err) {
            console.log(err);
            alert("Lỗi lưu user!");
        }
    };

    // DELETE
    const handleDelete = async (id: number) => {
        if (!confirm("Xoá user này?")) return;

        try {
            await api.delete(`/User/${id}`); // FIX ROUTE
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            console.log(err);
            alert("Lỗi xoá user!");
        }
    };

    // FILTER
    const filtered = users.filter(
        (u) =>
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">👤 Quản lý User</h1>

                <button
                    onClick={openAdd}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Thêm User
                </button>
            </div>

            {/* SEARCH */}
            <input
                className="w-full p-2 border rounded mb-4"
                placeholder="Tìm user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{u.id}</td>
                                <td className="p-3">{u.username}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 text-white rounded text-sm ${
                                            u.role === "Admin"
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        }`}
                                    >
                                        {u.role}
                                    </span>
                                </td>

                                <td className="p-3 space-x-2">
                                    <button
                                        onClick={() => openEdit(u)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(u.id)}
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
                            {editingUser ? "✏️ Edit User" : "➕ Add User"}
                        </h2>

                        <input
                            className="w-full border p-2 mb-2 rounded"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />

                        <input
                            className="w-full border p-2 mb-2 rounded"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />

                        {!editingUser && (
                            <input
                                className="w-full border p-2 mb-2 rounded"
                                placeholder="Password"
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                            />
                        )}

                        <select
                            className="w-full border p-2 mb-4 rounded"
                            value={form.role}
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                        >
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </select>

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
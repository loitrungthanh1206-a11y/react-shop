import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

export default function AddUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Customer",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/User", form); // ✅ đúng API backend

            alert("Thêm user thành công!");
            navigate("/admin/users"); // quay lại danh sách
        } catch (err) {
            console.log(err);
            alert("Thêm user thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

                <h1 className="text-2xl font-bold mb-4 text-center">
                    ➕ Thêm User
                </h1>

                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />

                    {/* Role */}
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Đang xử lý..." : "Thêm User"}
                    </button>

                </form>

            </div>

        </div>
    );
}
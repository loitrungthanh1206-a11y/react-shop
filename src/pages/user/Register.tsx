import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", {
                username: name,
                email,
                password,
            });

            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Đăng ký thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded-xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Đăng ký
                </h2>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Tên"
                    className="w-full border p-2 mb-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full border p-2 mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>

                {/* Link login */}
                <p className="text-sm mt-3 text-center">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-blue-500">
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
}
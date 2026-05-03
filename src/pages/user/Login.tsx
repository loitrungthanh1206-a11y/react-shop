import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });


            localStorage.setItem("token", res.data.token);


            localStorage.setItem("userId", res.data.customerId || res.data.id);


            localStorage.setItem("user", JSON.stringify({
                username: res.data.username,
                role: res.data.role
            }));

            alert("Đăng nhập thành công!");

            navigate("/");
            window.location.reload();
        } catch (err: any) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-xl shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Đăng nhập
                </h2>

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
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

                {/* Link */}
                <p className="text-sm mt-3 text-center">
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-blue-500">
                        Đăng ký
                    </a>
                </p>
            </form>
        </div>
    );
}
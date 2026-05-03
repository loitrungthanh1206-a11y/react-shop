import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Dùng Link thay cho <a> để chuyển trang mượt hơn
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

            alert("Đăng nhập thành công! 🎉");

            navigate("/");
            window.location.reload();
        } catch (err: any) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            alert("Sai email hoặc mật khẩu. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Nền Gradient tràn màn hình
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

            {/* Card đăng nhập (Hiệu ứng kính mờ - Glassmorphism) */}
            <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-[2rem] shadow-2xl w-full max-w-md transform transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                        <span className="text-3xl">👋</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Chào mừng trở lại!
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Vui lòng đăng nhập để tiếp tục
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email của bạn</label>
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Options: Ghi nhớ & Quên mật khẩu */}
                    <div className="flex items-center justify-between text-sm px-1">
                        <label className="flex items-center text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
                            Ghi nhớ tôi
                        </label>
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                            Quên mật khẩu?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/50 transform hover:-translate-y-1"
                            }`}
                    >
                        {loading ? "⏳ Đang xử lý..." : "Đăng nhập ngay"}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-gray-600 mt-8 text-base">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="text-indigo-600 font-extrabold hover:text-purple-600 transition-colors">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
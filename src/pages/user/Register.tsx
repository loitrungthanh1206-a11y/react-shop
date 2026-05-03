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

            alert("Đăng ký thành công! 🎉 Vui lòng đăng nhập.");
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!");
        } finally {
            setLoading(false);
        }
    };

    return (
        // Nền Gradient tràn màn hình (Giống hệt trang Login để đồng bộ)
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

            {/* Card đăng ký (Hiệu ứng kính mờ - Glassmorphism) */}
            <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-[2rem] shadow-2xl w-full max-w-md transform transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Tạo tài khoản mới
                    </h2>
                    <p className="text-gray-500 font-medium">
                        Tham gia cùng chúng tôi ngay hôm nay!
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Họ và tên</label>
                        <input
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email của bạn</label>
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all shadow-sm"
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
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Điều khoản sử dụng */}
                    <div className="flex items-start text-sm px-1 mt-2">
                        <input type="checkbox" required className="mt-1 mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                        <span className="text-gray-600">
                            Tôi đồng ý với <a href="#" className="text-purple-600 font-bold hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-purple-600 font-bold hover:underline">Chính sách bảo mật</a>
                        </span>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 hover:shadow-purple-500/50 transform hover:-translate-y-1"
                            }`}
                    >
                        {loading ? "⏳ Đang xử lý..." : "Đăng ký ngay"}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-gray-600 mt-8 text-base">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="text-purple-600 font-extrabold hover:text-indigo-600 transition-colors">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
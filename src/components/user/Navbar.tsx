import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* LOGO */}
                <Link to="/" className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                    💻 LaptopStore
                </Link>

                {/* MENU */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link to="/" className="hover:text-indigo-600">
                        Trang chủ
                    </Link>

                    <Link to="/shop" className="hover:text-indigo-600">
                        Sản phẩm
                    </Link>

                    <Link to="/cart" className="hover:text-indigo-600">
                        🛒 Giỏ hàng
                    </Link>

                    <Link to="/orders" className="hover:text-indigo-600">
                        📦 Đơn hàng
                    </Link>
                </div>

                {/* AUTH */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                                    Đăng nhập
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                                    Đăng ký
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative group">
                            {/* USER */}
                            <div className="cursor-pointer font-semibold flex items-center gap-2">
                                👤 {user.username}
                            </div>

                            {/* DROPDOWN */}
                            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg 
                                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                            transition-all duration-200">

                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    👤 Thông tin
                                </Link>

                                <Link
                                    to="/orders"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    📦 Đơn hàng
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                                >
                                    🚪 Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
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
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-blue-600">
                    🍔 FoodShop
                </Link>

                {/* Menu */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-blue-500">
                        Trang chủ
                    </Link>
                    <Link to="/cart" className="hover:text-blue-500">
                        Giỏ hàng
                    </Link>
                    <Link to="/orders" className="hover:text-blue-500">
                        Đơn hàng
                    </Link>
                </div>

                {/* Auth */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <button className="px-3 py-1 border rounded">
                                    Đăng nhập
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                                    Đăng ký
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="relative group">
                            {/* Username */}
                            <div className="cursor-pointer font-semibold">
                                👤 {user.username}
                            </div>

                            {/* Dropdown */}
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md 
                                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                            transition-all duration-200">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Thông tin
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
}
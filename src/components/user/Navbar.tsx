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
                        <>
                            <span className="font-semibold">
                                👤 {user.username}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Đăng xuất
                            </button>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}
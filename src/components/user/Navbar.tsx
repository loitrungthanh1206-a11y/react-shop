import { Link } from "react-router-dom";

export default function Navbar() {
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
                    <Link to="/login">
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">
                            Đăng nhập
                        </button>
                    </Link>

                    <Link to="/register">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Đăng ký
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
}
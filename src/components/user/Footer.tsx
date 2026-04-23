export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo + mô tả */}
                <div>
                    <h2 className="text-xl font-bold mb-3">🍔 FoodShop</h2>
                    <p className="text-gray-400 text-sm">
                        Nền tảng đặt đồ ăn online nhanh chóng, tiện lợi và chất lượng.
                    </p>
                </div>

                {/* Menu */}
                <div>
                    <h3 className="font-semibold mb-3">Liên kết</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-white">Trang chủ</a></li>
                        <li><a href="/cart" className="hover:text-white">Giỏ hàng</a></li>
                        <li><a href="/orders" className="hover:text-white">Đơn hàng</a></li>
                    </ul>
                </div>

                {/* Liên hệ */}
                <div>
                    <h3 className="font-semibold mb-3">Liên hệ</h3>
                    <p className="text-gray-400 text-sm">📍 TP. Hồ Chí Minh</p>
                    <p className="text-gray-400 text-sm">📞 0123 456 789</p>
                    <p className="text-gray-400 text-sm">✉️ support@foodshop.com</p>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} FoodShop. All rights reserved.
            </div>
        </footer>
    );
}
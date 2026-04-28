export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* LOGO + MÔ TẢ */}
                <div>
                    <h2 className="text-xl font-bold mb-3 text-indigo-400">
                        💻 LaptopStore
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Chuyên cung cấp laptop chính hãng, giá tốt, bảo hành uy tín.
                        Mang đến trải nghiệm công nghệ tốt nhất cho bạn.
                    </p>
                </div>

                {/* MENU */}
                <div>
                    <h3 className="font-semibold mb-3">Liên kết</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="/" className="hover:text-white">Trang chủ</a></li>
                        <li><a href="/shop" className="hover:text-white">Sản phẩm</a></li>
                        <li><a href="/cart" className="hover:text-white">Giỏ hàng</a></li>
                        <li><a href="/orders" className="hover:text-white">Đơn hàng</a></li>
                    </ul>
                </div>

                {/* DANH MỤC */}
                <div>
                    <h3 className="font-semibold mb-3">Danh mục</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Laptop Gaming</li>
                        <li>Ultrabook</li>
                        <li>Laptop Văn phòng</li>
                        <li>Laptop Đồ họa</li>
                    </ul>
                </div>

                {/* LIÊN HỆ */}
                <div>
                    <h3 className="font-semibold mb-3">Liên hệ</h3>
                    <p className="text-gray-400 text-sm">📍 TP. Hồ Chí Minh</p>
                    <p className="text-gray-400 text-sm">📞 0123 456 789</p>
                    <p className="text-gray-400 text-sm">✉️ support@laptopstore.com</p>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} LaptopStore. All rights reserved.
            </div>
        </footer>
    );
}
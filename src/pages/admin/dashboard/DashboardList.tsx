import { useEffect, useState } from "react";
import api from "../../../api/api"; // Đảm bảo đường dẫn đúng

export default function DashboardList() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0,
        categories: 0,
        carts: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ SỬA 1: Thêm biến "cartRes" để hứng kết quả thứ 5
                const [p, u, o, c, cartRes] = await Promise.all([
                    api.get("/Product"),  // Chú ý viết hoa tên endpoint cho khớp với Backend C#
                    api.get("/Users"),    // Nhớ kiểm tra lại tên API thực tế của bạn
                    api.get("/Order"),
                    api.get("/Category"),
                    api.get("/Cart/all"), // Dùng API lấy toàn bộ giỏ hàng của Admin vừa tạo lúc nãy
                ]);

                // ✅ SỬA 2: Bổ sung carts vào setStats
                setStats({
                    products: p.data.length,
                    users: u.data.length,
                    orders: o.data.length,
                    categories: c.data.length,
                    carts: cartRes.data.length, // Lấy số lượng giỏ hàng
                });
            } catch (err) {
                console.error("Dashboard error:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">📊 Tổng quan hệ thống (Dashboard)</h1>

            {/* ✅ SỬA 3: Chỉnh thành grid-cols-5 để hiển thị đủ 5 cột (Có hỗ trợ responsive trên đt) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Card title="Sản phẩm" value={stats.products} color="bg-gradient-to-r from-blue-500 to-blue-600" />
                <Card title="Người dùng" value={stats.users} color="bg-gradient-to-r from-green-500 to-green-600" />
                <Card title="Đơn hàng" value={stats.orders} color="bg-gradient-to-r from-yellow-400 to-yellow-500" />
                <Card title="Danh mục" value={stats.categories} color="bg-gradient-to-r from-purple-500 to-purple-600" />

                {/* ✅ SỬA 4: Thêm thẻ Card hiển thị Giỏ hàng */}
                <Card title="Giỏ hàng (Đang mua)" value={stats.carts} color="bg-gradient-to-r from-red-500 to-pink-500" />
            </div>
        </div>
    );
}

// ================= CARD COMPONENT =================
function Card({ title, value, color }: any) {
    return (
        <div className={`p-6 rounded-2xl text-white shadow-lg ${color} transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
            <h2 className="text-sm font-semibold opacity-90 uppercase tracking-wider">{title}</h2>
            <p className="text-4xl font-extrabold mt-3">{value}</p>
        </div>
    );
}
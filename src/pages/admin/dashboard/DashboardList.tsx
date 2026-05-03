import { useEffect, useState } from "react";
import api from "../../../api/api";

export default function DashboardList() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0,
        categories: 0,
        carts: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [p, u, o, c, cartRes] = await Promise.all([
                    api.get("/Product"),
                    api.get("/User"),
                    api.get("/Order"),
                    api.get("/Category"),
                    api.get("/Cart/all"),
                ]);

                setStats({
                    products: p.data.length,
                    users: u.data.length,
                    orders: o.data.length,
                    categories: c.data.length,
                    carts: cartRes.data.length,
                });
            } catch (err) {
                console.error("Dashboard error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-2 sm:p-6 bg-gray-50/50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">📊 Tổng quan hệ thống</h1>
                <p className="text-gray-500 mt-2 font-medium">
                    Theo dõi các chỉ số quan trọng của cửa hàng hôm nay.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-20 font-bold text-gray-500 animate-pulse">
                    Đang tải dữ liệu hệ thống...
                </div>
            ) : (
                /* Grid Layout: Tự động xuống dòng, thiết kế chuẩn Responsive */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">

                    <Card
                        title="Sản phẩm"
                        value={stats.products}
                        iconPath="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        color="text-blue-600"
                        bgColor="bg-blue-100"
                    />

                    <Card
                        title="Người dùng"
                        value={stats.users}
                        iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        color="text-green-600"
                        bgColor="bg-green-100"
                    />

                    <Card
                        title="Đơn hàng"
                        value={stats.orders}
                        iconPath="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        color="text-yellow-600"
                        bgColor="bg-yellow-100"
                    />

                    <Card
                        title="Danh mục"
                        value={stats.categories}
                        iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        color="text-purple-600"
                        bgColor="bg-purple-100"
                    />

                    <Card
                        title="Giỏ hàng"
                        value={stats.carts}
                        iconPath="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        color="text-rose-600"
                        bgColor="bg-rose-100"
                    />

                </div>
            )}
        </div>
    );
}

// ================= COMPONENT CARD CHUYÊN NGHIỆP =================
function Card({ title, value, iconPath, color, bgColor }: any) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

            {/* Box chứa Icon */}
            <div className={`p-4 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}>
                <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
                </svg>
            </div>

            {/* Box chứa Text */}
            <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {title}
                </p>
                <h3 className="text-3xl font-extrabold text-gray-800">
                    {value}
                </h3>
            </div>

        </div>
    );
}
import { useEffect, useState } from "react";
import api from "../../../api/api";
import { Link } from "react-router-dom";

// Khai báo kiểu dữ liệu cho Đơn hàng
interface Order {
    id: number;
    fullName: string;
    phone: string;
    orderDate: string;
    totalAmount: number;
    status: string;
}

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Lấy danh sách TẤT CẢ đơn hàng
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        api.get("/Order") // Gọi API lấy toàn bộ Order
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi tải đơn hàng:", err);
                setLoading(false);
            });
    };

    // Hàm cập nhật trạng thái đơn hàng
    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            await api.put(`/Order/${id}/status`, { status: newStatus });

            // Cập nhật lại state giao diện ngay lập tức
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
            alert("Cập nhật trạng thái thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật trạng thái!");
        }
    };

    // Hàm xóa đơn hàng
    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng này? Thao tác này không thể hoàn tác.")) return;

        try {
            await api.delete(`/Order/${id}`);
            setOrders(orders.filter((o) => o.id !== id)); // xóa khỏi list hiện tại
            alert("Xóa đơn hàng thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xóa đơn hàng!");
        }
    };

    if (loading) return <div className="text-center py-10 font-bold text-gray-500">Đang tải danh sách đơn hàng...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
                <p className="text-gray-500">Tổng số: {orders.length} đơn hàng</p>
            </div>

            <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Mã ĐH</th>
                        <th className="p-3 border">Khách hàng</th>
                        <th className="p-3 border">SĐT</th>
                        <th className="p-3 border">Ngày đặt</th>
                        <th className="p-3 border">Tổng tiền</th>
                        <th className="p-3 border">Trạng thái</th>
                        <th className="p-3 border text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center p-5 text-gray-500">Chưa có đơn hàng nào</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border font-semibold">#{order.id}</td>
                                <td className="p-3 border">{order.fullName}</td>
                                <td className="p-3 border">{order.phone}</td>
                                <td className="p-3 border">{new Date(order.orderDate).toLocaleString("vi-VN")}</td>
                                <td className="p-3 border font-bold text-red-500">
                                    {order.totalAmount.toLocaleString("vi-VN")}đ
                                </td>

                                {/* Select Đổi trạng thái trực tiếp trên bảng */}
                                <td className="p-3 border">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        className={`p-1 border rounded font-semibold outline-none ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
                                                order.status === "Shipping" ? "bg-blue-100 text-blue-700 border-blue-300" :
                                                    order.status === "Completed" ? "bg-green-100 text-green-700 border-green-300" :
                                                        "bg-red-100 text-red-700 border-red-300"
                                            }`}
                                    >
                                        <option value="Pending">Chờ xử lý (Pending)</option>
                                        <option value="Shipping">Đang giao (Shipping)</option>
                                        <option value="Completed">Hoàn thành (Completed)</option>
                                        <option value="Cancelled">Đã hủy (Cancelled)</option>
                                    </select>
                                </td>

                                <td className="p-3 border text-center">
                                    {/* Nút Xem chi tiết (Tùy chọn nếu bạn làm trang chi tiết) */}
                                    <Link to={`/admin/orders/${order.id}`}>
                                        <button className="bg-indigo-500 text-white px-3 py-1 rounded mr-2 hover:bg-indigo-600">
                                            Xem
                                        </button>
                                    </Link>

                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
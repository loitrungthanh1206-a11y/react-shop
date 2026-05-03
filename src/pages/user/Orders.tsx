import { useEffect, useState } from "react";
import api from "../../api/api";

type OrderDetail = {
    productName: string;
    quantity: number;
    unitPrice: number;
    imageUrl: string;
};

type Order = {
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    details: OrderDetail[];
};

export default function MyOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem("userId");
            try {
                const res = await api.get(`/Order/customer/${userId}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Lỗi lấy đơn hàng:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-10">Đang tải đơn hàng...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">📦 Đơn hàng của tôi</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white shadow-md rounded-xl p-6 border">
                            <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Mã đơn hàng: #{order.id}</p>
                                    <p className="text-sm text-gray-500">Ngày đặt: {new Date(order.orderDate).toLocaleString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {order.details.map((detail, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <img src={detail.imageUrl} className="w-12 h-12 object-contain border rounded" />
                                        <div className="flex-1">
                                            <p className="font-medium">{detail.productName}</p>
                                            <p className="text-sm text-gray-500">x{detail.quantity}</p>
                                        </div>
                                        <p className="font-semibold">{detail.unitPrice.toLocaleString()} đ</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                <p className="font-bold text-lg">Tổng cộng:</p>
                                <p className="text-xl font-bold text-red-600">{order.totalAmount.toLocaleString()} đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
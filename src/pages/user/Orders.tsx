import { useEffect, useState } from "react";
import api from "../../api/api";

type OrderItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Order = {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    items: OrderItem[];
};

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.get("/order-service/api/orders/my")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;

    if (orders.length === 0)
        return <p className="text-center mt-10">Chưa có đơn hàng</p>;

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h1>

            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white p-4 rounded-xl shadow mb-4"
                >
                    {/* Header */}
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                            Đơn #{order.id}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                        </span>
                    </div>

                    {/* Items */}
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between text-sm"
                        >
                            <span>
                                {item.name} x {item.quantity}
                            </span>
                            <span>
                                {(item.price * item.quantity).toLocaleString()} đ
                            </span>
                        </div>
                    ))}

                    {/* Footer */}
                    <div className="flex justify-between mt-3 font-bold">
                        <span>Tổng</span>
                        <span>{order.total.toLocaleString()} đ</span>
                    </div>

                    <div className="text-right text-sm mt-1">
                        Trạng thái:{" "}
                        <span className="text-blue-500">
                            {order.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
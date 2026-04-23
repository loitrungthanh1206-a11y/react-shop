import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity?: number;
};

export default function Checkout() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        try {
            await api.post("/order-service/api/orders", {
                name,
                address,
                phone,
                items: cart,
                total,
            });

            alert("Đặt hàng thành công!");

            // xoá giỏ hàng
            localStorage.removeItem("cart");

            navigate("/orders");
        } catch (err) {
            console.log(err);
            alert("Đặt hàng thất bại!");
        }
    };

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Thông tin giao hàng */}
            <form
                onSubmit={handleCheckout}
                className="bg-white p-6 rounded-xl shadow"
            >
                <h2 className="text-xl font-bold mb-4">Thông tin giao hàng</h2>

                <input
                    type="text"
                    placeholder="Tên người nhận"
                    className="w-full border p-2 mb-3 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="w-full border p-2 mb-3 rounded"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="w-full border p-2 mb-3 rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <button className="w-full bg-green-500 text-white py-2 rounded">
                    Đặt hàng
                </button>
            </form>

            {/* Giỏ hàng */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">Đơn hàng</h2>

                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span>
                            {item.name} x {item.quantity || 1}
                        </span>
                        <span>
                            {(item.price * (item.quantity || 1)).toLocaleString()} đ
                        </span>
                    </div>
                ))}

                <hr className="my-3" />

                <div className="flex justify-between font-bold">
                    <span>Tổng</span>
                    <span>{total.toLocaleString()} đ</span>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";

type CartItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(stored);
    }, []);

    const updateCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const increaseQty = (id: number) => {
        const newCart = cart.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        updateCart(newCart);
    };

    const decreaseQty = (id: number) => {
        const newCart = cart.map((item) =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateCart(newCart);
    };

    const removeItem = (id: number) => {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <h1 className="text-2xl font-bold mb-6">🛒 Giỏ hàng</h1>

            {cart.length === 0 ? (
                <div className="text-center text-gray-500">
                    Chưa có sản phẩm nào
                </div>
            ) : (
                <div className="bg-white shadow rounded-xl p-4">

                    {/* LIST */}
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 border-b py-4"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.imageUrl}
                                className="w-20 h-20 object-cover rounded"
                            />

                            {/* INFO */}
                            <div className="flex-1">
                                <h2 className="font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-red-500">
                                    {item.price.toLocaleString()} đ
                                </p>
                            </div>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="px-2 border rounded"
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() => increaseQty(item.id)}
                                    className="px-2 border rounded"
                                >
                                    +
                                </button>
                            </div>

                            {/* TOTAL */}
                            <div className="w-24 text-right text-red-500 font-semibold">
                                {(item.price * item.quantity).toLocaleString()} đ
                            </div>

                            {/* REMOVE */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}

                    {/* SUMMARY */}
                    <div className="flex justify-between items-center mt-6">
                        <h2 className="text-lg font-bold">
                            Tổng: {total.toLocaleString()} đ
                        </h2>

                        <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
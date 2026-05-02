import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Đảm bảo đường dẫn này đúng

type CartItem = {
    id: number;          // ID của dòng giỏ hàng trong Database
    productId: number;   // ID của sản phẩm
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Lấy dữ liệu giỏ hàng từ Database
    const fetchCart = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get(`/Cart/${userId}`);
            setCart(res.data);
        } catch (err) {
            console.error("Lỗi khi tải giỏ hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // 2. Tăng / Giảm số lượng (Gọi API PUT)
    const updateQuantity = async (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // Không cho giảm xuống dưới 1

        // Cập nhật giao diện ngay lập tức (Optimistic Update)
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === cartItemId ? { ...item, quantity: newQuantity } : item
            )
        );

        try {
            // Cập nhật ngầm dưới Backend
            await api.put(`/Cart/${cartItemId}`, { quantity: newQuantity });
        } catch (err) {
            console.error("Lỗi khi cập nhật số lượng:", err);
            alert("Có lỗi xảy ra, đang tải lại giỏ hàng!");
            fetchCart(); // Nếu API lỗi, tải lại data chuẩn từ server để rollback
        }
    };

    // 3. Xóa sản phẩm khỏi giỏ (Gọi API DELETE)
    const removeItem = async (cartItemId: number) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmDelete) return;

        // Xóa ngay trên giao diện cho mượt
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));

        try {
            // Xóa ngầm dưới Backend
            await api.delete(`/Cart/${cartItemId}`);
        } catch (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
            alert("Xóa thất bại, vui lòng thử lại!");
            fetchCart(); // Load lại nếu lỗi
        }
    };

    // Tính tổng tiền
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Kiểm tra đăng nhập
    const userId = localStorage.getItem("userId");
    if (!userId) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập!</h1>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                    Đến trang Đăng nhập
                </button>
            </div>
        );
    }

    if (loading) {
        return <div className="text-center mt-10 text-gray-500 font-semibold">Đang tải giỏ hàng của bạn...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <h1 className="text-2xl font-bold mb-6">🛒 Giỏ hàng của bạn</h1>

            {cart.length === 0 ? (
                <div className="text-center bg-white p-10 rounded-xl shadow border border-gray-100">
                    <p className="text-gray-500 mb-4 text-lg">Giỏ hàng của bạn đang trống</p>
                    <button
                        onClick={() => navigate("/products")} // Sửa lại link về trang sản phẩm của bạn
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                    >
                        Tiếp tục mua sắm
                    </button>
                </div>
            ) : (
                <div className="bg-white shadow rounded-xl p-4">

                    {/* LIST */}
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 border-b py-4 last:border-0"
                        >
                            {/* IMAGE */}
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-20 h-20 object-contain bg-gray-50 p-1 border rounded"
                            />

                            {/* INFO */}
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg text-gray-800">
                                    {item.name}
                                </h2>
                                <p className="text-red-500 font-medium">
                                    {item.price.toLocaleString()} đ
                                </p>
                            </div>

                            {/* QUANTITY CONTROLS */}
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-gray-50 font-bold"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-3 py-1 bg-white border rounded shadow-sm hover:bg-gray-50 font-bold"
                                >
                                    +
                                </button>
                            </div>

                            {/* ITEM TOTAL */}
                            <div className="w-32 text-right text-red-500 font-bold text-lg">
                                {(item.price * item.quantity).toLocaleString()} đ
                            </div>

                            {/* REMOVE BUTTON */}
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition-colors ml-2"
                                title="Xóa sản phẩm"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}

                    {/* SUMMARY SECTION */}
                    <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg border">
                        <div>
                            <p className="text-gray-500 mb-1">Tổng thanh toán:</p>
                            <h2 className="text-2xl font-bold text-red-600">
                                {total.toLocaleString()} đ
                            </h2>
                        </div>

                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all">
                            Tiến hành thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
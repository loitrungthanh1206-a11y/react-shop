import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

type CartItem = {
    id: number;
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

export default function Checkout() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // State lưu thông tin giao hàng
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        phone: "",
        address: ""
    });

    // 1. Lấy dữ liệu giỏ hàng
    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Vui lòng đăng nhập để thanh toán!");
                navigate("/login");
                return;
            }

            try {
                const res = await api.get(`/Cart/${userId}`);
                if (res.data.length === 0) {
                    alert("Giỏ hàng trống, không thể thanh toán!");
                    navigate("/cart");
                    return;
                }
                setCart(res.data);

                // (Tùy chọn) Gọi API lấy thông tin Profile để điền sẵn vào form
                const profileRes = await api.get("/Auth/me");
                if (profileRes.data) {
                    setShippingInfo({
                        fullName: profileRes.data.fullName || "",
                        phone: profileRes.data.phone || "",
                        address: profileRes.data.address || ""
                    });
                }
            } catch (err) {
                console.error("Lỗi khi tải giỏ hàng:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [navigate]);

    // 2. Tính tổng tiền
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 3. Xử lý đặt hàng
    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn form tự load lại trang

        const userId = localStorage.getItem("userId");
        if (!userId) return;

        setIsSubmitting(true);

        try {
            // GỌI API ĐẶT HÀNG TRÊN BACKEND
            await api.post("/Order/checkout", {
                customerId: parseInt(userId),
                fullName: shippingInfo.fullName,
                phone: shippingInfo.phone,
                address: shippingInfo.address,
                totalAmount: totalAmount,
                paymentMethod: "COD" // Mặc định Thanh toán khi nhận hàng
            });

            alert("🎉 Đặt hàng thành công!");
            navigate("/Shop"); // Hoặc chuyển sang trang lịch sử đơn hàng

        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Có lỗi xảy ra, không thể đặt hàng lúc này!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-center mt-10">Đang chuẩn bị đơn hàng...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">

            {/* CỘT TRÁI: FORM THÔNG TIN GIAO HÀNG */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold mb-6">📍 Thông tin giao hàng</h2>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập họ và tên người nhận"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Địa chỉ nhận hàng</label>
                        <textarea
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập địa chỉ chi tiết (Số nhà, tên đường, phường/xã, quận/huyện...)"
                        ></textarea>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                        <p className="font-semibold text-blue-800">Phương thức thanh toán:</p>
                        <p className="text-blue-600">💵 Thanh toán tiền mặt khi nhận hàng (COD)</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white py-3 rounded-lg font-bold text-lg mt-6 transition-all ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                            }`}
                    >
                        {isSubmitting ? "⏳ Đang xử lý..." : "Xác nhận Đặt hàng"}
                    </button>
                </form>
            </div>

            {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold mb-6">📦 Tóm tắt đơn hàng</h2>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm">
                            <div className="flex items-center gap-3">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain border rounded p-1" />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-bold text-red-500">
                                {(item.price * item.quantity).toLocaleString()} đ
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-6 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Tạm tính:</span>
                        <span>{totalAmount.toLocaleString()} đ</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Phí vận chuyển:</span>
                        <span>Miễn phí</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-xl font-bold">Tổng thanh toán:</span>
                        <span className="text-2xl font-bold text-red-600">{totalAmount.toLocaleString()} đ</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
import { useEffect, useState } from "react";
import api from "../../../api/api"; // Nhớ kiểm tra lại đường dẫn import api.ts

// Khai báo kiểu dữ liệu trả về từ API C#
interface AdminCartItem {
    id: number;
    customerId: number;
    customerName: string;
    productId: number;
    productName: string;
    price: number;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
}

export default function CartList() {
    const [cartItems, setCartItems] = useState<AdminCartItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Gọi API lấy tất cả giỏ hàng
    useEffect(() => {
        api.get("/Cart/all")
            .then((res) => {
                setCartItems(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy danh sách giỏ hàng:", err);
                setLoading(false);
            });
    }, []);

    // Hàm xóa 1 món đồ khỏi giỏ của khách (Dùng chung API Delete cũ của bạn)
    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ của khách?")) return;

        try {
            await api.delete(`/Cart/${id}`);
            // Xóa thành công thì lọc item đó ra khỏi state
            setCartItems(cartItems.filter((item) => item.id !== id));
            alert("Xóa thành công!");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng!");
        }
    };

    if (loading) return <div className="text-center py-10 font-bold text-gray-500">Đang tải danh sách...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Quản lý Giỏ hàng (Admin)</h1>
                <p className="text-gray-500 font-semibold">Tổng: {cartItems.length} mục đang có trong giỏ</p>
            </div>

            <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">ID Giỏ</th>
                        <th className="p-3 border">Khách hàng</th>
                        <th className="p-3 border">Hình ảnh</th>
                        <th className="p-3 border">Sản phẩm</th>
                        <th className="p-3 border text-center">Số lượng</th>
                        <th className="p-3 border text-right">Tổng tiền</th>
                        <th className="p-3 border text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center p-5 text-gray-500">
                                Hiện không có khách hàng nào đang để đồ trong giỏ.
                            </td>
                        </tr>
                    ) : (
                        cartItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-3 border text-gray-500">#{item.id}</td>

                                <td className="p-3 border font-semibold text-indigo-600">
                                    {item.customerName}
                                </td>

                                <td className="p-3 border">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-12 h-12 object-contain bg-gray-50 border rounded p-1"
                                        onError={(e) => (e.currentTarget.src = "/no-image.png")}
                                    />
                                </td>

                                <td className="p-3 border font-medium">
                                    {item.productName}
                                </td>

                                <td className="p-3 border text-center font-bold">
                                    {item.quantity}
                                </td>

                                <td className="p-3 border text-right font-bold text-red-500">
                                    {item.totalPrice.toLocaleString("vi-VN")}đ
                                </td>

                                <td className="p-3 border text-center">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 shadow-sm"
                                    >
                                        Xóa khỏi giỏ
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
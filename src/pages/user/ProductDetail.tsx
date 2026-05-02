import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api"; // Đảm bảo đường dẫn này đúng

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stock: number;
    categoryId: number;
    brandId: number;
};

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false); // Thêm state để làm hiệu ứng loading khi bấm nút
    const navigate = useNavigate();

    // 1. Fetch dữ liệu sản phẩm
    useEffect(() => {
        api.get(`/Product/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.log("Lỗi lấy chi tiết SP:", err));
    }, [id]);

    // 2. Xử lý thêm vào giỏ hàng (Gọi API Backend)
    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Lấy ID user đã lưu lúc Login

        // ❌ CHƯA LOGIN → về trang login
        if (!token || !userId) {
            alert("Vui lòng đăng nhập trước khi mua hàng!");
            navigate("/login");
            return;
        }

        if (!product) return;

        setIsAdding(true); // Hiển thị trạng thái đang xử lý

        try {
            // ✅ GỌI API THÊM VÀO DATABASE
            await api.post("/Cart", {
                customerId: parseInt(userId), // Gửi ID của người mua
                productId: product.id,        // Gửi ID sản phẩm
                quantity: 1                   // Mặc định thêm 1 cái
            });

            alert("Đã thêm vào giỏ hàng thành công!");
            navigate("/cart"); // Chuyển sang trang giỏ hàng

        } catch (error) {
            console.error("Lỗi khi thêm giỏ hàng:", error);
            alert("Có lỗi xảy ra, không thể thêm vào giỏ hàng!");
        } finally {
            setIsAdding(false); // Tắt trạng thái xử lý
        }
    };

    if (!product) {
        return <div className="text-center mt-10 text-lg font-semibold text-gray-500">Đang tải thông tin sản phẩm...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-lg border">

                {/* IMAGE */}
                <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-h-[400px] rounded-lg object-contain"
                    />
                </div>

                {/* INFO */}
                <div className="flex flex-col justify-between">

                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-gray-800">
                            {product.name}
                        </h1>

                        <p className="text-3xl text-red-500 font-bold mb-4">
                            {product.price.toLocaleString()} đ
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Tình trạng:</span>{" "}
                                {product.stock > 0 ? (
                                    <span className="text-green-600 font-medium">Còn {product.stock} sản phẩm</span>
                                ) : (
                                    <span className="text-red-500 font-medium">Hết hàng</span>
                                )}
                            </p>
                            <p className="text-gray-500 text-sm">
                                <span className="font-semibold">Mã sản phẩm:</span> #{product.id}
                            </p>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding || product.stock <= 0} // Khóa nút nếu đang tải hoặc hết hàng
                            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all 
                                ${isAdding || product.stock <= 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
                                }`}
                        >
                            {isAdding ? "⏳ Đang thêm..." : (product.stock > 0 ? "🛒 Thêm vào giỏ hàng" : "🚫 Hết hàng")}
                        </button>

                        <button className="border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center">
                            ❤️ Yêu thích
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}
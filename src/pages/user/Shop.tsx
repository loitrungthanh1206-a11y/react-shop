import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api"; // Đảm bảo đường dẫn đúng tới file api.ts của bạn

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stock: number;
};

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Lấy danh sách sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API lấy toàn bộ sản phẩm (Sửa lại endpoint nếu API của bạn tên khác)
                const res = await api.get("/Product");
                setProducts(res.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold text-gray-500">Đang tải sản phẩm...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">🛍️ Cửa hàng của chúng tôi</h1>
                <p className="text-gray-500">Khám phá những sản phẩm tuyệt vời nhất dành cho bạn</p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-10 text-gray-500">Hiện chưa có sản phẩm nào.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Duyệt qua mảng sản phẩm và render từng Card */}
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Ảnh sản phẩm (Bấm vào ảnh cũng qua trang chi tiết) */}
                            <Link to={`/product/${product.id}`} className="block relative pt-[100%] bg-gray-50">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                                />
                            </Link>

                            {/* Thông tin sản phẩm */}
                            <div className="p-4 flex flex-col flex-1">
                                <Link to={`/product/${product.id}`}>
                                    <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2 mb-2">
                                        {product.name}
                                    </h2>
                                </Link>

                                {/* Đẩy giá và nút bấm xuống đáy card */}
                                <div className="mt-auto">
                                    <p className="text-xl font-bold text-red-500 mb-3">
                                        {product.price.toLocaleString()} đ
                                    </p>

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="block w-full text-center bg-indigo-50 text-indigo-600 font-semibold py-2 rounded border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-colors"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
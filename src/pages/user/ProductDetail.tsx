import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

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
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/Product/${id}`)
            .then((res) => {
                console.log("DETAIL:", res.data);
                setProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        // ❌ CHƯA LOGIN → về login
        if (!token) {
            alert("Vui lòng đăng nhập trước!");
            navigate("/login");
            return;
        }

        if (!product) return;

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const exist = cart.find((item: any) => item.id === product.id);

        if (exist) {
            exist.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Đã thêm vào giỏ hàng!");

        // ✅ chuyển sang giỏ hàng
        navigate("/cart");
    };

    if (!product) {
        return <div className="text-center mt-10">Đang tải...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

                {/* IMAGE */}
                <div>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full rounded-lg object-cover"
                    />
                </div>

                {/* INFO */}
                <div className="flex flex-col justify-between">

                    <div>
                        <h1 className="text-2xl font-bold mb-3">
                            {product.name}
                        </h1>

                        <p className="text-2xl text-red-500 font-semibold mb-4">
                            {product.price.toLocaleString()}đ
                        </p>

                        <p className="text-gray-600 mb-2">
                            Tình trạng:{" "}
                            {product.stock > 0 ? (
                                <span className="text-green-600">Còn hàng</span>
                            ) : (
                                <span className="text-red-500">Hết hàng</span>
                            )}
                        </p>

                        <p className="text-gray-500 text-sm">
                            Mã sản phẩm: #{product.id}
                        </p>
                    </div>

                    {/* ACTION */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                        >
                            🛒 Thêm vào giỏ
                        </button>

                        <button className="border px-6 py-2 rounded hover:bg-gray-100">
                            ❤️ Yêu thích
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}
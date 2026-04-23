import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
};

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        api.get(`/product-service/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center mt-10">Đang tải...</p>;

    if (!product) return <p className="text-center mt-10">Không tìm thấy sản phẩm</p>;

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Ảnh */}
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
            />

            {/* Thông tin */}
            <div>
                <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

                <p className="text-red-500 text-xl mb-3">
                    {product.price.toLocaleString("vi-VN")} đ
                </p>

                <p className="text-gray-600 mb-4">
                    {product.description}
                </p>

                {/* Button */}
                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

                        const exist = cart.find((item: any) => item.id === product.id);

                        if (exist) {
                            alert("Sản phẩm đã có trong giỏ");
                            return;
                        }

                        cart.push(product);
                        localStorage.setItem("cart", JSON.stringify(cart));

                        alert("Đã thêm vào giỏ hàng!");
                    }}
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
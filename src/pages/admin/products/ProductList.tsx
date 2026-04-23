import { useEffect, useState } from "react";
import api from "../../../api/api";
import { Link } from "react-router-dom";
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number;
    brandId: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/Product")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Đang tải...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
                <Link to="/admin/products/add">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        + Thêm sản phẩm
                    </button>
                </Link>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Hình ảnh</th>
                        <th className="p-3 border">Tên sản phẩm</th>
                        <th className="p-3 border">Giá</th>
                        <th className="p-3 border">Tồn kho</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="p-3 border">{product.id}</td>
                            <td className="p-3 border">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/50")}
                                />
                            </td>
                            <td className="p-3 border">{product.name}</td>
                            <td className="p-3 border">
                                {product.price.toLocaleString("vi-VN")}đ
                            </td>
                            <td className="p-3 border">{product.stock}</td>
                            <td className="p-3 border">
                                <button className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500">
                                    Sửa
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
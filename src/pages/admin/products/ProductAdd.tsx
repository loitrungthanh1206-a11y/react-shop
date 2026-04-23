import { useState, useEffect } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

type Category = {
    id: number;
    name: string;
};

type Brand = {
    id: number;
    name: string;
    logoUrl: string;
};

export default function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    const [categoryId, setCategoryId] = useState<number | "">("");
    const [brandId, setBrandId] = useState<number | "">("");

    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // 🚀 load category + brand
    useEffect(() => {
        api.get("/Category").then((res) => setCategories(res.data));
        api.get("/Brand").then((res) => setBrands(res.data));
    }, []);

    // 🚀 upload ảnh
    const uploadImage = async () => {
        if (!image) return "";

        const formData = new FormData();
        formData.append("file", image);

        const res = await api.post("/Upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data.imageUrl;
    };

    // 🚀 submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || price <= 0 || !categoryId || !brandId) {
            alert("Nhập đầy đủ thông tin!");
            return;
        }

        if (image && image.size > 2 * 1024 * 1024) {
            alert("Ảnh phải < 2MB");
            return;
        }

        try {
            setLoading(true);

            const imageUrl = await uploadImage();

            await api.post("/Product", {
                name,
                price,
                stock,
                imageUrl,
                categoryId,
                brandId,
            });

            alert("Thêm sản phẩm thành công!");
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Lỗi thêm sản phẩm!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Tên */}
                <input
                    type="text"
                    placeholder="Tên sản phẩm"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Giá */}
                <input
                    type="number"
                    placeholder="Giá"
                    className="w-full border p-2 rounded"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                {/* Tồn kho */}
                <input
                    type="number"
                    placeholder="Tồn kho"
                    className="w-full border p-2 rounded"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                />

                {/* Category */}
                <select
                    className="w-full border p-2 rounded"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                {/* Brand */}
                <select
                    className="w-full border p-2 rounded"
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.name}
                        </option>
                    ))}
                </select>

                {/* Upload ảnh */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                setImage(e.target.files[0]);
                            }
                        }}
                    />

                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            className="w-32 h-32 object-cover mt-2 rounded"
                        />
                    )}
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Đang thêm..." : "Thêm sản phẩm"}
                </button>
            </form>
        </div>
    );
}
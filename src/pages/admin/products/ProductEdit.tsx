import { useState, useEffect } from "react";
import api from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";

type Category = {
    id: number;
    name: string;
};

type Brand = {
    id: number;
    name: string;
    logoUrl: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    categoryId: number;
    brandId: number;
};

export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);

    const [categoryId, setCategoryId] = useState<number | "">("");
    const [brandId, setBrandId] = useState<number | "">("");

    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);

    const [image, setImage] = useState<File | null>(null);
    const [oldImage, setOldImage] = useState("");

    const [loading, setLoading] = useState(false);

    // 🚀 load category + brand + product detail
    useEffect(() => {
        api.get("/Category").then((res) => setCategories(res.data));
        api.get("/Brand").then((res) => setBrands(res.data));

        api.get(`/Product/${id}`)
            .then((res) => {
                const p: Product = res.data;

                setName(p.name);
                setPrice(p.price);
                setStock(p.stock);
                setCategoryId(p.categoryId);
                setBrandId(p.brandId);
                setOldImage(p.imageUrl);
            })
            .catch((err) => console.log(err));
    }, [id]);

    // 🚀 upload ảnh
    const uploadImage = async () => {
        if (!image) return oldImage;

        const formData = new FormData();
        formData.append("file", image);

        const res = await api.post("/Upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data.imageUrl;
    };

    // 🚀 update product
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || price <= 0 || !categoryId || !brandId) {
            alert("Nhập đầy đủ thông tin!");
            return;
        }

        try {
            setLoading(true);

            const imageUrl = await uploadImage();

            await api.put(`/Product/${id}`, {
                name,
                price,
                stock,
                imageUrl,
                categoryId,
                brandId,
            });

            alert("Cập nhật sản phẩm thành công!");
            navigate("/admin/products");
        } catch (err) {
            console.error(err);
            alert("Lỗi cập nhật sản phẩm!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Tên */}
                <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Giá */}
                <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />

                {/* Tồn kho */}
                <input
                    type="number"
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

                {/* Ảnh */}
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

                    <div className="flex gap-3 mt-2">
                        {oldImage && !image && (
                            <img
                                src={oldImage}
                                className="w-32 h-32 object-cover rounded"
                            />
                        )}

                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                className="w-32 h-32 object-cover rounded"
                            />
                        )}
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
                </button>
            </form>
        </div>
    );
}
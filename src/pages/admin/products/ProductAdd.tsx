import { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(1);
    const [brandId, setBrandId] = useState<number>(1);

    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

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

        if (!name || price <= 0) {
            alert("Nhập đầy đủ thông tin!");
            return;
        }

        if (image && image.size > 2 * 1024 * 1024) {
            alert("Ảnh phải < 2MB");
            return;
        }

        try {
            setLoading(true);

            // 1. upload ảnh
            const imageUrl = await uploadImage();

            // 2. tạo sản phẩm
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
                <input
                    type="number"
                    placeholder="Category ID"
                    className="w-full border p-2 rounded"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                />

                {/* Brand */}
                <input
                    type="number"
                    placeholder="Brand ID"
                    className="w-full border p-2 rounded"
                    value={brandId}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                />

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

                    {/* Preview */}
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
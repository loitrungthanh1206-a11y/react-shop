import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/user/ProductCard";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    brandId: number;
};

const CATEGORIES = [
    { id: 0, name: "all" },
    { id: 1, name: "Laptop Gaming" },
    { id: 2, name: "Laptop Đồ họa / Kỹ thuật" },
    { id: 3, name: "Ultrabook" },
    { id: 4, name: "Laptop Mỏng nhẹ / Ultrabook" }
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        api.get("/Product")
            .then((res) => {
                console.log("DATA API:", res.data);
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

        const matchCat =
            activeCategory === 0 ||
            p.categoryId === activeCategory;

        return matchSearch && matchCat;
    });

    return (
        <div
            className="min-h-screen"
            style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f7f4" }}
        >

            {/* HERO */}
            <div
                style={{
                    background: "#0a0a0f",
                    padding: "2.5rem 2rem 2rem",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <p style={{ fontSize: 11, color: "rgba(245,244,239,0.4)" }}>
                    Laptop Store Vietnam
                </p>

                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 700,
                        color: "#fff"
                    }}
                >
                    Công nghệ <span style={{ color: "#8f85e8" }}>đỉnh cao</span>
                </h1>

                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm..."
                        style={{
                            flex: 1,
                            padding: "10px 18px",
                            borderRadius: 999,
                            border: "none"
                        }}
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">

                {/* CATEGORY */}
                <div style={{ display: "flex", gap: 10, margin: "20px 0" }}>
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCategory(c.id)}
                            style={{
                                background: activeCategory === c.id ? "#000" : "#fff",
                                color: activeCategory === c.id ? "#fff" : "#333",
                                padding: "8px 16px",
                                borderRadius: 999,
                                border: "1px solid #ddd",
                                cursor: "pointer"
                            }}
                        >
                            {c.id === 0 ? "Tất cả" : c.name}
                        </button>
                    ))}
                </div>

                {/* COUNT */}
                <p style={{ marginBottom: 10 }}>
                    Sản phẩm: {filtered.length}
                </p>

                {/* PRODUCTS */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 40 }}>
                        Không tìm thấy sản phẩm
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {filtered.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
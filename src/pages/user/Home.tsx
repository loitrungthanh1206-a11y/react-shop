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
    { id: 0, name: "Tất cả" },
    { id: 1, name: "Gaming" },
    { id: 2, name: "Đồ họa" },
    { id: 3, name: "Ultrabook" },
    { id: 4, name: "Mỏng nhẹ" },
];

const SORT_OPTIONS = [
    { value: "default", label: "Mặc định" },
    { value: "price_asc", label: "Giá tăng dần" },
    { value: "price_desc", label: "Giá giảm dần" },
    { value: "name_asc", label: "Tên A–Z" },
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(0);
    const [sort, setSort] = useState("default");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/Product")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const filtered = products
        .filter((p) => {
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchCat = activeCategory === 0 || p.categoryId === activeCategory;
            return matchSearch && matchCat;
        })
        .sort((a, b) => {
            if (sort === "price_asc") return a.price - b.price;
            if (sort === "price_desc") return b.price - a.price;
            if (sort === "name_asc") return a.name.localeCompare(b.name);
            return 0;
        });

    return (
        <div style={{ minHeight: "100vh", background: "#f0eff8", fontFamily: "'Syne', 'DM Sans', sans-serif" }}>

            {/* ── HERO ── */}
            <div style={{
                background: "#0c0b18",
                padding: "3rem 2rem 4rem",
                position: "relative",
                overflow: "hidden",
            }}>
                {/* Decorative blobs */}
                <div style={{
                    position: "absolute", top: -80, right: -60,
                    width: 340, height: 340,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(120,100,255,0.28) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: -60, left: "30%",
                    width: 260, height: 260,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(80,200,180,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                    {/* Badge */}
                    <span style={{
                        display: "inline-block",
                        padding: "4px 14px",
                        borderRadius: 999,
                        border: "1px solid rgba(120,100,255,0.5)",
                        color: "#a897ff",
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: "1.25rem",
                    }}>
                        Laptop Store Vietnam
                    </span>

                    <h1 style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 800,
                        color: "#fff",
                        lineHeight: 1.15,
                        maxWidth: 560,
                        margin: "0 0 0.5rem",
                        letterSpacing: "-0.02em",
                    }}>
                        Công nghệ{" "}
                        <span style={{
                            background: "linear-gradient(90deg, #8f85e8, #5ee7d0)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                            đỉnh cao
                        </span>
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, marginBottom: "2rem" }}>
                        Khám phá dòng laptop mới nhất — hiệu suất mạnh mẽ, thiết kế tinh tế.
                    </p>

                    {/* Search */}
                    <div style={{ position: "relative", maxWidth: 480 }}>
                        <svg
                            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm laptop..."
                            style={{
                                width: "100%",
                                padding: "13px 20px 13px 46px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.12)",
                                background: "rgba(255,255,255,0.07)",
                                color: "#fff",
                                fontSize: 14,
                                outline: "none",
                                backdropFilter: "blur(8px)",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    {/* Stats row */}
                    <div style={{ display: "flex", gap: 32, marginTop: "2.5rem" }}>
                        {[
                            { label: "Sản phẩm", value: products.length + "+" },
                            { label: "Thương hiệu", value: "12+" },
                            { label: "Bảo hành", value: "24 tháng" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: 0 }}>{s.value}</p>
                                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: "2px 0 0" }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

                {/* FILTER BAR */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: "1.5rem",
                }}>
                    {/* Category pills */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CATEGORIES.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setActiveCategory(c.id)}
                                style={{
                                    padding: "8px 18px",
                                    borderRadius: 999,
                                    border: activeCategory === c.id ? "none" : "1px solid #d8d6f0",
                                    background: activeCategory === c.id ? "#7b6ff0" : "#fff",
                                    color: activeCategory === c.id ? "#fff" : "#555",
                                    fontWeight: activeCategory === c.id ? 600 : 400,
                                    fontSize: 13,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    boxShadow: activeCategory === c.id ? "0 4px 16px rgba(123,111,240,0.35)" : "none",
                                }}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort + count */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: "#888" }}>
                            <strong style={{ color: "#333" }}>{filtered.length}</strong> sản phẩm
                        </span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            style={{
                                padding: "8px 14px",
                                borderRadius: 10,
                                border: "1px solid #d8d6f0",
                                background: "#fff",
                                fontSize: 13,
                                color: "#333",
                                cursor: "pointer",
                                outline: "none",
                            }}
                        >
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* DIVIDER */}
                <div style={{ height: 1, background: "linear-gradient(90deg, #d0cef7, transparent)", marginBottom: "1.5rem" }} />

                {/* PRODUCT GRID */}
                {loading ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} style={{
                                height: 280,
                                borderRadius: 18,
                                background: "linear-gradient(90deg, #e8e6f7 25%, #f2f0ff 50%, #e8e6f7 75%)",
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.4s infinite",
                            }} />
                        ))}
                        <style>{`
                            @keyframes shimmer {
                                0% { background-position: 200% 0; }
                                100% { background-position: -200% 0; }
                            }
                        `}</style>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{
                        textAlign: "center",
                        padding: "5rem 2rem",
                        background: "#fff",
                        borderRadius: 20,
                        border: "1px dashed #c8c5ee",
                    }}>
                        <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
                        <p style={{ fontSize: 16, color: "#666", fontWeight: 500 }}>Không tìm thấy sản phẩm phù hợp</p>
                        <p style={{ fontSize: 13, color: "#aaa" }}>Thử thay đổi từ khóa hoặc bộ lọc</p>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory(0); }}
                            style={{
                                marginTop: 16,
                                padding: "10px 24px",
                                borderRadius: 999,
                                border: "none",
                                background: "#7b6ff0",
                                color: "#fff",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontSize: 13,
                            }}
                        >
                            Xem tất cả
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 20,
                    }}>
                        {filtered.map((p) => (
                            <div
                                key={p.id}
                                style={{
                                    background: "#fff",
                                    borderRadius: 18,
                                    border: "1px solid #ebebf7",
                                    overflow: "hidden",
                                    transition: "transform 0.22s ease, box-shadow 0.22s ease",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(123,111,240,0.18)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                                }}
                            >
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
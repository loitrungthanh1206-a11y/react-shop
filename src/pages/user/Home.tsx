import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/user/ProductCard";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;

    category?: {
        id: number;
        name: string;
    };

    brand?: {
        id: number;
        name: string;
    };
};

const CATEGORIES = ["all", "Laptop Gaming", "Laptop Đồ họa / Kỹ thuật", "Ultrabook", "Laptop Mỏng nhẹ / Ultrabook"];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        api.get("/Product")
            .then((res) => {
                console.log("DATA API:", res.data); // 👈 LOG Ở ĐÂY
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const filtered = products.filter((p) => {
        console.log("PRODUCT:", p); // 👈 log từng sản phẩm
        console.log("CATEGORY NAME:", p.category?.name);
        console.log("ACTIVE:", activeCategory);

        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

        const matchCat =
            activeCategory === "all" ||
            p.category?.name?.trim().toLowerCase() === activeCategory.trim().toLowerCase();

        console.log("MATCH:", matchCat); // 👈 xem true/false

        return matchSearch && matchCat;
    });

    return (
        <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f7f4" }}>

            {/* HERO */}
            <div style={{ background: "#0a0a0f", padding: "2.5rem 2rem 2rem", position: "relative", overflow: "hidden" }}>
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(83,74,183,0.25) 0%, transparent 70%)",
                    pointerEvents: "none"
                }} />
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,244,239,0.4)", marginBottom: 12 }}>
                    Laptop Store Vietnam
                </p>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 700, color: "#f5f4ef", lineHeight: 1.05, margin: "0 0 6px"
                }}>
                    Công nghệ <span style={{ color: "#8f85e8" }}>đỉnh cao</span>
                </h1>
                <p style={{ fontSize: 13, color: "rgba(245,244,239,0.45)", fontWeight: 300, marginBottom: 24 }}>
                    Laptop chính hãng — Giá tốt nhất — Giao nhanh toàn quốc
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm theo tên, hãng, cấu hình..."
                        style={{
                            flex: 1, background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.15)",
                            borderRadius: 999, padding: "10px 18px", color: "#f5f4ef", fontSize: 14, outline: "none",
                            maxWidth: 480
                        }}
                    />
                    <button style={{
                        background: "#534AB7", border: "none", borderRadius: 999,
                        color: "#fff", padding: "10px 20px", fontSize: 13, cursor: "pointer"
                    }}>
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">

                {/* STATS */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "1.5rem 0" }}>
                    {[["500+", "Sản phẩm"], ["12K+", "Khách hàng"], ["4.9★", "Đánh giá"]].map(([num, lbl]) => (
                        <div key={lbl} style={{ background: "#fff", borderRadius: 10, padding: "14px 12px", textAlign: "center", border: "0.5px solid rgba(0,0,0,0.07)" }}>
                            <div style={{ fontSize: 20, fontWeight: 500 }}>{num}</div>
                            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{lbl}</div>
                        </div>
                    ))}
                </div>

                {/* CATEGORIES */}
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 24, scrollbarWidth: "none" }}>
                    {CATEGORIES.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActiveCategory(c)}
                            style={{
                                background: activeCategory === c ? "#0a0a0f" : "#fff",
                                color: activeCategory === c ? "#f5f4ef" : "#666",
                                border: `0.5px solid ${activeCategory === c ? "#0a0a0f" : "rgba(0,0,0,0.12)"}`,
                                borderRadius: 999, padding: "7px 16px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap"
                            }}
                        >
                            {c === "all" ? "Tất cả" : c}
                        </button>
                    ))}
                </div>

                {/* SECTION LABEL */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 16 }}>
                    <span>Sản phẩm · {filtered.length}</span>
                    <div style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
                </div>

                {/* PRODUCTS */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem", color: "#999", fontSize: 14 }}>
                        Không tìm thấy sản phẩm phù hợp.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10">
                        {filtered.map((p) => (
                            <div key={p.id} style={{
                                background: "#fff", borderRadius: 12, border: "0.5px solid rgba(0,0,0,0.07)",
                                overflow: "hidden", transition: "transform 0.15s, border-color 0.15s",
                                cursor: "pointer"
                            }}
                                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                                onMouseLeave={e => (e.currentTarget.style.transform = "none")}
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
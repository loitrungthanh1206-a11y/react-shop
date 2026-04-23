import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductCard from "../../components/user/ProductCard";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get("/product-service/api/products/all")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Sản phẩm</h1>

            <div className="grid grid-cols-4 gap-4">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
}
import { Link } from "react-router-dom";

type Product = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    return (
        <div className="border rounded-xl p-3 shadow">
            <img
                src={product.imageUrl}
                className="h-40 w-full object-cover"
                alt={product.name}
            />

            <h2 className="font-semibold mt-2">{product.name}</h2>

            <p className="text-red-500">
                {product.price.toLocaleString()} đ
            </p>

            <Link to={`/product/${product.id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
                    Xem
                </button>
            </Link>
        </div>
    );
}
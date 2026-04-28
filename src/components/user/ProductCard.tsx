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
        <Link to={`/product/${product.id}`}>
            <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer">

                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-44 w-full object-cover"
                    />

                    {/* BADGE */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        HOT
                    </span>
                </div>

                {/* CONTENT */}
                <div className="p-3">

                    <h2 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                        {product.name}
                    </h2>

                    <p className="text-red-500 font-bold mt-2">
                        {product.price.toLocaleString()} đ
                    </p>

                    {/* ACTION */}
                    <button className="w-full mt-3 bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </Link>
    );
}
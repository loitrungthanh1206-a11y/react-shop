type CartItem = {
    id: number;
    name: string;
    price: number;
};

export default function Cart() {
    const cart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
    );

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Giỏ hàng</h1>

            {cart.length === 0 ? (
                <p>Chưa có sản phẩm</p>
            ) : (
                cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between border-b py-2"
                    >
                        <span>{item.name}</span>
                        <span>{item.price.toLocaleString()} đ</span>
                    </div>
                ))
            )}
        </div>
    );
}
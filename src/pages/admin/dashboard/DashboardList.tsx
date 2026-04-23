import { useEffect, useState } from "react";
import api from "../../api/api"

export default function DashboardList() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0,
        categories: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [p, u, o, c] = await Promise.all([
                    api.get("/products"),
                    api.get("/users"),
                    api.get("/orders"),
                    api.get("/categories"),
                ]);

                setStats({
                    products: p.data.length,
                    users: u.data.length,
                    orders: o.data.length,
                    categories: c.data.length,
                });
            } catch (err) {
                console.error("Dashboard error:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <Card title="Products" value={stats.products} color="bg-blue-500" />
                <Card title="Users" value={stats.users} color="bg-green-500" />
                <Card title="Orders" value={stats.orders} color="bg-yellow-500" />
                <Card title="Categories" value={stats.categories} color="bg-purple-500" />
            </div>
        </div>
    );
}

// ================= CARD =================
function Card({ title, value, color }: any) {
    return (
        <div className={`p-6 rounded-2xl text-white shadow ${color}`}>
            <h2 className="text-sm">{title}</h2>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}
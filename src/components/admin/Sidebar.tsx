import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5">
            <h2 className="text-xl font-bold mb-6">Admin</h2>
            <nav className="flex flex-col gap-3">
                <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                <Link to="/admin/products" className="hover:text-gray-300">Products</Link>
                <Link to="/admin/orders" className="hover:text-gray-300">Orders</Link>
                <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                <Link to="/admin/categories" className="hover:text-gray-300">Categories</Link>
            </nav>
        </div>
    );
}
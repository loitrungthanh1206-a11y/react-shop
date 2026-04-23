import Navbar from "../components/user/Navbar";
import Footer from "../components/user/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen px-4 py-6">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
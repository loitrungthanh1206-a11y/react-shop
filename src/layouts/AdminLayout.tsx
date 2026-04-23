import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="ml-64 flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div className="text-center mt-10">Chưa đăng nhập</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Thông tin người dùng
            </h2>

            <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl">
                    {user.username?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div>
                    <p className="text-lg font-semibold">
                        👤 {user.username}
                    </p>
                    <p className="text-gray-600">
                        🔑 Role: {user.role}
                    </p>
                </div>
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import api from "../../api/api";

type ProfileType = {
    username: string;
    email: string;
    fullName: string;
    phone?: string;
    address?: string;
};

export default function Profile() {
    const [user, setUser] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get("/Auth/me");
            setUser(res.data);
            setForm({
                fullName: res.data.fullName || "",
                phone: res.data.phone || "",
                address: res.data.address || ""
            });
        } catch (err) {
            console.error("Lỗi lấy profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await api.put("/Auth/update-profile", form);
            alert("Cập nhật thành công!");
            setEditing(false);
            fetchProfile();
        } catch (err) {
            console.error("Lỗi update:", err);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Đang tải...</div>;
    }

    if (!user) {
        return <div className="text-center mt-10">Chưa đăng nhập</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
                👤 Hồ sơ cá nhân
            </h2>

            <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl">
                    {user.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="text-xl font-semibold">{user.username}</p>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            {/* FORM */}
            <div className="space-y-4">
                <div>
                    <label className="font-medium">Họ tên</label>
                    <input
                        type="text"
                        disabled={!editing}
                        value={form.fullName}
                        onChange={(e) =>
                            setForm({ ...form, fullName: e.target.value })
                        }
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        disabled={!editing}
                        value={form.phone}
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="font-medium">Địa chỉ</label>
                    <input
                        type="text"
                        disabled={!editing}
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6 flex justify-end gap-3">
                {!editing ? (
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        ✏️ Chỉnh sửa
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => setEditing(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Huỷ
                        </button>

                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            💾 Lưu
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
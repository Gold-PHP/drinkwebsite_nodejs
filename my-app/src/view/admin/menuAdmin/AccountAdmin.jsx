import { useState, useEffect } from "react";
import axios from "axios";
import "./AccountAdmin.css";

const AccountAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tài khoản:", error);
        }
    };

    // Gửi yêu cầu khóa tài khoản (chỉ khóa user)
    const lockUser = async (email) => {
        try {
            const response = await axios.post("http://localhost:3000/lock-user", { email });
            
            // Cập nhật trạng thái tài khoản sau khi khóa
            setUsers(users.map(user => 
                user.email === email ? { ...user, isLocked: true } : user
            ));

            alert(response.data.message);
        } catch (error) {
            console.error("Lỗi khi khóa tài khoản:", error);
        }
    };

    return (
        <div className="account-admin">
            <h2>Quản lý tài khoản</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isLocked ? "Đã khóa" : "Hoạt động"}</td>
                            <td>
                                <button 
                                    onClick={() => lockUser(user.email)} 
                                    disabled={user.isLocked}
                                >
                                    {user.isLocked ? "Đã khóa" : "Khóa"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountAdmin;

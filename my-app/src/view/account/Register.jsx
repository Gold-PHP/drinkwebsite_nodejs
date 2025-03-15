import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Thêm state cho tên
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email,
                password,
                name, // Gửi tên trong request
            });
            setMessage(response.data.message);
            setMessageClass('success');
            // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data.error) {
                // Nếu là lỗi email đã tồn tại, hiển thị thông báo
                if (error.response.data.error === 'Email đã có tài khoản') {
                    setMessage('Email đã có tài khoản');
                    setMessageClass('error');
                } else {
                    setMessage(error.response.data.error);
                    setMessageClass('error');
                }
            } else {
                setMessage('Lỗi đăng ký');
                setMessageClass('error');
            }
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ và tên:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Đăng ký</button>
            </form>
            {message && <p className={messageClass}>{message}</p>}
            <button onClick={handleGoToLogin} className="go-to-login">
                Quay về trang đăng nhập
            </button>
        </div>
    );
};

export default Register;

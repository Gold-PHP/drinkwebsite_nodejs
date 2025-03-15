import  { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageClass, setMessageClass] = useState('');
    const navigate = useNavigate(); // Tạo đối tượng navigate

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3000/login', {
              email,
              password,
          });
          console.log('API Response:', response.data); 
  
          setMessage(response.data.message);
          setMessageClass('success');
          
          // Điều chỉnh để truy cập vào role từ response.data.user
          if (response.data.user.role === 'admin') {
              navigate('/admin');
          } else {
              navigate('/home');
          }
  
      } catch (error) {
          setMessage(error.response.data.error || 'Lỗi đăng nhập');
          setMessageClass('error');
      }
  };
  
  

    return (
        <div className="login">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Đăng nhập</button>
            </form>
            {message && <p className={messageClass}>{message}</p>}

            <div className="create-account">
                <p>Chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link></p> {/* Link điều hướng tới trang đăng ký */}
            </div>
        </div>
    );
};

export default Login;

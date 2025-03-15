import { useNavigate } from 'react-router-dom'; 
import './HeaderAdmin.css';


const Header = () => {
    const navigate = useNavigate(); 

    const goToHomeAdmin = () => {
      navigate('/admin');
    };

    const goToCategories = () => {
      navigate('/categoriesAdmin');
    };
  
    const goToProducts = () => {
      navigate('/productAdmin');
    };
  
    const goToAccount = () => {
      navigate('/accountAdmin');
    };
  
    const goToOrders = () => {
      navigate('/orders');
    };
  
    return (
      <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" />
          <h1>admin</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><button onClick={goToHomeAdmin}>Trang chủ</button></li>
            <li><button onClick={goToCategories}>Danh mục</button></li>
            <li><button onClick={goToProducts}>Sản phẩm</button></li>
            <li><button onClick={goToAccount}>Tài khoản</button></li>
            <li><button onClick={goToOrders}>Đơn hàng</button></li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;
  
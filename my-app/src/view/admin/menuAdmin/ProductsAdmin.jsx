import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductsAdmin.css';

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '', image_base64: '', category_id: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingForm, setEditingForm] = useState({ name: '', description: '', price: '', image_base64: '', category_id: '' });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/products');
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            setProducts([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/categories'); // API trả về danh mục
            setCategories(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách danh mục:', error);
            setCategories([]);
        }
    };

    const handleImageUpload = (e, isEditing = false) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (isEditing) {
                    setEditingForm(prevForm => ({ ...prevForm, image_base64: reader.result }));
                } else {
                    setForm(prevForm => ({ ...prevForm, image_base64: reader.result }));
                }
                setPreviewImage(reader.result);
            };
            reader.onerror = (error) => console.error('Lỗi khi đọc file:', error);
        }
    };

    const handleAddProduct = () => {
        if (!form.name || !form.description || !form.price || !form.category_id) {
            alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
            return;
        }
        axios.post('http://localhost:3000/products', form)
            .then(() => {
                fetchProducts();
                setForm({ name: '', description: '', price: '', image_base64: '', category_id: '' });
                setPreviewImage(null);
            })
            .catch(error => console.error('Lỗi khi thêm sản phẩm:', error));
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setEditingForm({ ...product });
        setPreviewImage(product.image_base64);
    };

    const handleSaveEdit = () => {
        if (!editingForm.name || !editingForm.description || !editingForm.price || !editingForm.category_id) {
            alert('Vui lòng nhập đầy đủ thông tin sản phẩm');
            return;
        }
        axios.put(`http://localhost:3000/products/${editingProduct.id}`, editingForm)
            .then(() => {
                fetchProducts();
                setEditingProduct(null);
            })
            .catch(error => console.error('Lỗi sửa sản phẩm:', error));
    };

    const handleDeleteProduct = (id) => {
        axios.delete(`http://localhost:3000/products/${id}`)
            .then(() => fetchProducts())
            .catch(error => console.error('Lỗi khi xóa sản phẩm:', error));
    };

    return (
        <div>
            <h2>Quản lý Sản phẩm</h2>

            {!editingProduct && (
                <div className="add-form">
                    <h3>Thêm sản phẩm</h3>
                    <input type="text" placeholder="Tên sản phẩm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input type="text" placeholder="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <input type="number" placeholder="Giá" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                    {previewImage && <img src={previewImage} alt="Xem trước" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
                    
                    {/* Dropdown danh mục */}
                    <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <button onClick={handleAddProduct}>Thêm sản phẩm</button>
                </div>
            )}

            {editingProduct && (
                <div className="edit-form">
                    <h3>Sửa sản phẩm</h3>
                    <input type="text" value={editingForm.name} onChange={(e) => setEditingForm({ ...editingForm, name: e.target.value })} />
                    <input type="text" value={editingForm.description} onChange={(e) => setEditingForm({ ...editingForm, description: e.target.value })} />
                    <input type="number" value={editingForm.price} onChange={(e) => setEditingForm({ ...editingForm, price: e.target.value })} />
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} />
                    {previewImage && <img src={previewImage} alt="Xem trước" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
                    
                    {/* Dropdown danh mục */}
                    <select value={editingForm.category_id} onChange={(e) => setEditingForm({ ...editingForm, category_id: e.target.value })}>
                        <option value="">Chọn danh mục</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <button onClick={handleSaveEdit}>Lưu sửa</button>
                    <button onClick={() => setEditingProduct(null)}>Hủy</button>
                </div>
            )}

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th>Ảnh</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price} VND</td>
                            <td>{product.image_base64 && <img src={product.image_base64} alt="Ảnh sản phẩm" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}</td>
                            <td>{categories.find(c => c.id === product.category_id)?.name || 'Không xác định'}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)}>Sửa</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsAdmin;

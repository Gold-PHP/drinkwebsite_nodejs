import { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoriesAdmin.css';

const CategoriesAdmin = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Lỗi lấy danh mục:', error);
                setLoading(false);
            });
    }, []);

    const handleAddCategory = () => {
        if (!newCategory.name || !newCategory.description) {
            alert('Vui lòng nhập đầy đủ thông tin danh mục');
            return;
        }

        axios.post('http://localhost:3000/categories', newCategory)
            .then(response => {
                setCategories([...categories, response.data]);
                setNewCategory({ name: '', description: '' });
            })
            .catch(error => {
                console.error('Lỗi thêm danh mục:', error);
            });
    };

    const handleEditCategory = (id) => {
        const category = categories.find(cat => cat.id === id);
        setEditingCategory(category);
    };

    const handleSaveEdit = () => {
        if (!editingCategory.name || !editingCategory.description) {
            alert('Vui lòng nhập đầy đủ thông tin danh mục');
            return;
        }

        axios.put(`http://localhost:3000/categories/${editingCategory.id}`, editingCategory)
            .then(response => {
                const updatedCategories = categories.map(cat =>
                    cat.id === editingCategory.id ? response.data : cat
                );
                setCategories(updatedCategories);
                setEditingCategory(null);
            })
            .catch(error => {
                console.error('Lỗi sửa danh mục:', error);
            });
    };

    const handleDeleteCategory = (id) => {
        axios.delete(`http://localhost:3000/categories/${id}`)
            .then(() => {
                setCategories(categories.filter(cat => cat.id !== id));
            })
            .catch(error => {
                console.error('Lỗi xóa danh mục:', error);
            });
    };

    if (loading) {
        return <p>Đang tải danh mục...</p>;
    }

    return (
        <div>
            <h2>Danh mục sản phẩm</h2>

            <div className="add-form">
                <h3>Thêm danh mục</h3>
                <input
                    type="text"
                    placeholder="Tên danh mục"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
                <button onClick={handleAddCategory}>Thêm danh mục</button>
            </div>

            {editingCategory && (
                <div className="edit-form">
                    <h3>Sửa danh mục</h3>

                    <label htmlFor="category-name">Tên danh mục:</label>
                    <input
                        id="category-name"
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    />

                    <label htmlFor="category-description">Mô tả:</label>
                    <input
                        id="category-description"
                        type="text"
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    />

                    <button onClick={handleSaveEdit}>Lưu sửa</button>
                    <button onClick={() => setEditingCategory(null)}>Hủy</button>
                </div>
            )}

            <table className="categories-table">
                <thead>
                    <tr>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditCategory(category.id)}>Sửa</button>
                                <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesAdmin;

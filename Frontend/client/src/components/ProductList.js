import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';  // Import external CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, {
        name: editName,
        price: editPrice,
      });
      alert('Product updated successfully!');
      setEditingProductId(null);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      alert(`Product with ID ${id} deleted successfully!`);
      fetchProducts(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {editingProductId === product.id ? (
              // Edit Form
              <div className="edit-form">
                <input
                  className="edit-input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Product Name"
                />
                <input
                  className="edit-input"
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Product Price"
                />
                <div className="edit-buttons">
                  <button className="btn-save" onClick={() => handleUpdate(product.id)}>Save</button>
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              // Display Product
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
                <div className="product-buttons">
                  <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

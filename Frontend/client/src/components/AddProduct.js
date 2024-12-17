import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';  // Import the CSS

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', { name, price });
      setName('');
      setPrice('');
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-form"> {/* Apply the class for styling */}
      <h3 className="form-title">Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="edit-input"  // Apply input styles from CSS
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="edit-input"  // Apply input styles from CSS
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn-save" type="submit"> {/* Apply button styles from CSS */}
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

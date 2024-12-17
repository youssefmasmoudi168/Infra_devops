import React from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Product Management</h1>
      <AddProduct />
      <ProductList />
    </div>
  );
}

export default App;

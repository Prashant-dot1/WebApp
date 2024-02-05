import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
// import dotenv from 'dotenv';
// dotenv.config();

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('Name');
  const [sortOrder, setSortOrder] = useState('ASC');
  
  const fetchProducts = async () => {
    try {
      // console.log(process.env.REACT_APP_URL);
      const response = await axios.get(
        `http://localhost:3000/api/products?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    // Fetch products when the component mounts or when page/sort changes
    fetchProducts();
  }, [page, sortBy, sortOrder]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.checked ? 'DESC' : 'ASC');
  };

  return (
    <div>
      <h1>Product App</h1>
      <div>
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="Name">Name</option>
            <option value="Category">Category</option>
            <option value="Price">Price</option>
          </select>
        </label>
        <label>
          Desc:
          <input
            type="checkbox"
            checked={sortOrder === 'DESC'}
            onChange={handleSortOrderChange}
          />
        </label>
      </div>
      <ProductTable products={products} />
      <div>
        {page > 1 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous Page</button>
        )}
        <span> Page {page} </span>
        <button onClick={() => handlePageChange(page + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default App;

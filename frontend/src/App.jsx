import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
import SwaggerUIComponent from './SwaggerUIComponent';
// import dotenv from 'dotenv';
// dotenv.config();

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('ProductID');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [totalCount , setTotalCount] = useState(0);
  const [productModels, setProductModels] = useState([]);
  const [selectedProductModels, setSelectedProductModels] = useState([]);
  const [showProductModelFilter, setShowProductModelFilter] = useState(false);
  const [showCategoryFilter , setShowCategoryFilter] = useState(false);
  
  const fetchProducts = async () => {
    try {
      // console.log(process.env.REACT_APP_URL);
      const categoryFilters = selectedCategories.join(',');
      const productModelFilters = selectedProductModels.join(',');
      const response = await axios.get(
        `http://localhost:3000/api/products?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&categories=${categoryFilters}&productModels=${productModelFilters}`
      );
      
      const { totalCount, products } = response.data;
      console.log(response.data);
      setProducts(products);
      setTotalCount(totalCount);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/categories');
        
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch products when the component mounts or when page/sort changes
    fetchProducts();
  }, [page, sortBy, sortOrder , selectedCategories , selectedProductModels]);

  useEffect(() => {
    const fetchProductModels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/models');
        setProductModels(response.data);
      } catch (error) {
        console.error('Error fetching product models:', error);
      }
    };

    // Fetch product models when the component mounts
    fetchProductModels();
  }, []);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.checked ? 'DESC' : 'ASC');
  };

  const handleCategoryChange = (category) => {
    // Toggle selected categories
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  const handleProductModelChange = (productModel) => {
    // Toggle selected product models
    const updatedProductModels = selectedProductModels.includes(productModel)
      ? selectedProductModels.filter((p) => p !== productModel)
      : [...selectedProductModels, productModel];

    setSelectedProductModels(updatedProductModels);
  };
  const handleToggleProductModelFilter = () => {
    setShowProductModelFilter(!showProductModelFilter);
  };
  const handleToggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  }

  return (
    <div className="app-container ">
      <h1 className="app-title">Products Table</h1>
      <div className='filter-section'>
      <button className="filter-btn"
          onClick={handleToggleCategoryFilter}>
          Filter by Category
        </button>
        {/* <h2>Filter by Category</h2> */}
        {showCategoryFilter && (
          <div className="category-filter">
          {categories.map((category) => (
          <label key={category.ProductCategoryID}>
            <input
              type="checkbox"
              value={category.ProductCategoryID}
              checked={selectedCategories.includes(category.ProductCategoryID)}
              onChange={() => handleCategoryChange(category.ProductCategoryID)}
            />
            {category.Name}
          </label>
        ))}
          </div>
  )}
      </div>
      <div className="filter-section">
      <button className="filter-btn" onClick={handleToggleProductModelFilter}>
          Filter by Product Model
        </button>
        {/* <h2>Filter by Product Model</h2> */}
        {showProductModelFilter && (
          <div className="product-model-filter">
            {productModels.map((productModel) => (
              <label key={productModel.ProductModelID}>
                <input
                  type="checkbox"
                  value={productModel.ProductModelID}
                  checked={selectedProductModels.includes(productModel.ProductModelID)}
                  onChange={() => handleProductModelChange(productModel.ProductModelID)}
                />
                {productModel.Name}
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="count-section">
      <p className="total-count">Total Count: {totalCount}</p>
      </div>
      <div className="sort-controls">
        <label>
          Sort By:
          <select className="sort-select" value={sortBy} onChange={handleSortByChange}>
            <option value="Name">Name</option>
            <option value="Category">Category</option>
            <option value="Price">Price</option>
          </select>
        </label>
        <label className="desc-checkbox">
          Desc:
          <input
            type="checkbox"
            checked={sortOrder === 'DESC'}
            onChange={handleSortOrderChange}
          />
        </label>
      </div>
      <ProductTable products={products} />
      <div className="pagination">
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
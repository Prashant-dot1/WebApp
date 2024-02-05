// ProductTable.js

import React from 'react';
import "./productTable.css"

const ProductTable = ({ products }) => {
  return (
    <div className='product-table-container'>
    <table>
      <thead>
        <tr>
          <th>ProductID</th>
          <th>Name</th>
          <th>ProductNumber</th>
          <th>Color</th>
          <th>StandardCost</th>
          <th>ListPrice</th>
          <th>Size</th>
          <th>Weight</th>
          <th>ProductCategoryID</th>
          <th>ProductModelID</th>
          <th>SellStartDate</th>
          <th>SellEndDate</th>
          <th>DiscontinuedDate</th>
          {/* <th>ThumbNailPhoto</th> */}
          <th>ThumbnailPhotoFileName</th>
          <th>rowguid</th>
          <th>ModifiedDate</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.ProductID}>
            <td>{product.ProductID}</td>
            <td>{product.Name}</td>
            <td>{product.ProductNumber}</td>
            <td>{product.Color}</td>
            <td>{product.StandardCost}</td>
            <td>{product.ListPrice}</td>
            <td>{product.Size}</td>
            <td>{product.Weight}</td>
            <td>{product.ProductCategoryID}</td>
            <td>{product.ProductModelID}</td>
            <td>{product.SellStartDate}</td>
            <td>{product.SellEndDate}</td>
            <td>{product.DiscontinuedDate}</td>
            {/* <td>{product.ThumbNailPhoto}</td> */}
            <td>{product.ThumbnailPhotoFileName}</td>
            <td>{product.rowguid}</td>
            <td>{product.ModifiedDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ProductTable;

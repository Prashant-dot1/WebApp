// // controllers/productController.js
const sql = require('mssql');

// Retrieve all products
const getProducts = async (req, res) => {
  const { page = 1, pageSize = 10, sortBy = 'ProductID', sortOrder = 'ASC', categories, productModels} = req.query;
  const offset = (page - 1) * pageSize;

  console.log(categories);
  console.log(productModels);
  try {
    let query = 'SELECT *,count(*) over() as totalcount FROM salesLT.Product';

    if (categories) {
      const categoryArray = categories.split(',');
      console.log(categoryArray);
      query += ` WHERE ProductCategoryID IN (${categoryArray.join(',')})`;
    }

    if(productModels){
      const modelArray = productModels.split(',');
      console.log(modelArray);
      query += ` WHERE ProductModelID IN (${modelArray.join(',')})`;
    }

    query += ` ORDER BY ${sortBy} ${sortOrder} OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;`;

    const result = await req.pool.request().query(query);
    const totalCount = result.recordset.length > 0 ? result.recordset[0].totalcount : 0;
    const products = result.recordset.map(({ totalCount, ...rest }) => rest);

    res.status(200).json({products , totalCount : totalCount});
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllCategories = async (req, res) => {
  try {
    // Replace this with your actual database query to fetch categories
    const result = await req.pool.request().query('SELECT * FROM SalesLT.ProductCategory');

    // console.log(result.recordset);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllModels = async (req,res) => {
  try {
      // Replace this with your actual database query to fetch product models
      const result = await req.pool.request().query('SELECT * FROM SalesLT.ProductModel');
  
      res.json(result.recordset);
    } catch (error) {
      console.error('Error fetching product models:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


const createProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name, productNumber, color, standardCost, listPrice, size, weight,
      productCategoryID, productModelID, sellStartDate, sellEndDate, discontinuedDate,
      thumbNailPhoto, thumbnailPhotoFileName
    } = req.body;

    // Replace this with your actual database insert query
    const result = await req.pool.request()
      .input('name', sql.NVarChar, name)
      .input('productNumber', sql.NVarChar, productNumber)
      .input('color', sql.NVarChar, color)
      .input('standardCost', sql.Money, standardCost)
      .input('listPrice', sql.Money, listPrice)
      .input('size', sql.NVarChar, size)
      .input('weight', sql.Decimal(8, 2), weight)
      .input('productCategoryID', sql.Int, productCategoryID)
      .input('productModelID', sql.Int, productModelID)
      .input('sellStartDate', sql.DateTime, sellStartDate)
      .input('sellEndDate', sql.DateTime, sellEndDate)
      .input('discontinuedDate', sql.DateTime, discontinuedDate)
      .input('thumbNailPhoto', sql.VarBinary(sql.MAX), Buffer.from(thumbNailPhoto, 'hex'))
      .input('thumbnailPhotoFileName', sql.NVarChar, thumbnailPhotoFileName)
      .query(`
        INSERT INTO SalesLT.Product (
          Name, ProductNumber, Color, StandardCost, ListPrice, Size, Weight,
          ProductCategoryID, ProductModelID, SellStartDate, SellEndDate, DiscontinuedDate,
          ThumbNailPhoto, ThumbnailPhotoFileName
        )
        OUTPUT inserted.*
        VALUES (
          @name, @productNumber, @color, @standardCost, @listPrice,
          @size, @weight, @productCategoryID, @productModelID,
          @sellStartDate, @sellEndDate, @discontinuedDate, 
          @thumbNailPhoto, @thumbnailPhotoFileName
        );
      `);

    res.status(201).json({ message: 'Product created successfully', product: result.recordset[0] });
  } catch (error) {
    console.error('Error creating product:', error);

    // Check if the error is a server error
    if (error.name === 'RequestError') {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(400).json({ error: `Check your input and try again - ${error.message}` });
    }
  }
};


// Helper function to fetch a product by ID
const getProductById = async (req , res) => {

  const productId = req.params.productId;
  try {
    const result = await req.pool.request()
      .input('productId', sql.Int, productId)
      .query(`
        SELECT *
        FROM SalesLT.Product
        WHERE ProductID = @productId
      `);

      res.status(200).json({ product: result.recordset[0] });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(400).json({ error: `Check your input and try again - ${error.message}` });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // Replace this with your actual database delete query
    const result = await req.pool.request()
      .input('productId', sql.Int, productId)
      .query(`
        DELETE FROM SalesLT.Product
        WHERE ProductID = @productId;
      `);

    if (result.rowsAffected[0] === 0) {
      // Product with the given ID not found
      res.status(404).json({ error: 'Product not found' });
    } else {
      // Product deleted successfully
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
  getAllCategories,
  getAllModels,
  createProduct,
  getProductById,
  deleteProductById
};

// // controllers/productController.js
const sql = require('mssql');

// Retrieve all products
const getProducts = async (req, res) => {

    const { page = 1, pageSize = 10, sortBy = 'ProductID', sortOrder = 'ASC' } = req.query;
    const offset = (page - 1) * pageSize;
  try {
    const result = await req.pool.request().query(`SELECT *
    FROM salesLT.Product
    ORDER BY ${sortBy} ${sortOrder}
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY;`);

    // .query('SELECT * FROM salesLT.Customer ORDER BY CustomerID OFFSET @SkipRows ROWS FETCH NEXT @PageSize ROWS ONLY');

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getProducts,
};

const sql = require("mssql");

// // controllers/customerController.js
// const { pool } = require('../db'); // Assuming you have a database connection pool

// const createCustomer = async (req, res) => {
//   try {
//     // Extract customer data from the request body
//     const { firstName, lastName, email, /* other fields */ } = req.body;

//     // Insert the new customer into the database
//     const result = await pool.query(
//       'INSERT INTO Customer (FirstName, LastName, Email) VALUES ($1, $2, $3) RETURNING *',
//       [firstName, lastName, email]
//     );

//     // Return the newly created customer
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating customer:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const getAllCustomers = async (req, res) => {
//   try {
//     // Retrieve all customers from the database
//     const result = await pool.query('SELECT * FROM Customer');

//     // Return the list of customers
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error retrieving customers:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const getCustomerById = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;

//     // Retrieve a specific customer by ID from the database
//     const result = await pool.query('SELECT * FROM Customer WHERE CustomerID = $1', [customerId]);

//     // Check if the customer exists
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Return the specific customer
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error retrieving customer by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const updateCustomer = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;

//     // Extract updated customer data from the request body
//     const { firstName, lastName, email, /* other fields */ } = req.body;

//     // Update the customer in the database
//     const result = await pool.query(
//       'UPDATE Customer SET FirstName = $1, LastName = $2, Email = $3 WHERE CustomerID = $4 RETURNING *',
//       [firstName, lastName, email, customerId]
//     );

//     // Check if the customer exists
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Return the updated customer
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const deleteCustomer = async (req, res) => {
//   try {
//     const customerId = req.params.customerId;

//     // Delete the customer from the database
//     const result = await pool.query('DELETE FROM Customer WHERE CustomerID = $1 RETURNING *', [customerId]);

//     // Check if the customer exists
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     // Return the deleted customer
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error deleting customer:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   createCustomer,
//   getAllCustomers,
//   getCustomerById,
//   updateCustomer,
//   deleteCustomer,
// };

// controllers/customerController.js

// controllers/customerController.js
const bcrypt = require('bcrypt');

// ...

const createCustomer = async (req, res) => {
  try {
    // Extract customer data from the request body
    const {
      Title,
      FirstName,
      MiddleName,
      LastName,
      Suffix,
      CompanyName,
      SalesPerson,
      EmailAddress,
      Phone,
      Password,
    } = req.body;

    // Hash the password using bcrypt
    const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    // Insert the new customer into the database using the pool
    const result = await req.pool.request()
      .input('NameStyle', sql.Bit, 0) // Default value for NameStyle
      .input('Title', sql.NVarChar, Title)
      .input('FirstName', sql.NVarChar, FirstName)
      .input('MiddleName', sql.NVarChar, MiddleName)
      .input('LastName', sql.NVarChar, LastName)
      .input('Suffix', sql.NVarChar, Suffix)
      .input('CompanyName', sql.NVarChar, CompanyName)
      .input('SalesPerson', sql.NVarChar, SalesPerson)
      .input('EmailAddress', sql.NVarChar, EmailAddress)
      .input('Phone', sql.NVarChar, Phone)
      .input('PasswordHash', sql.VarChar(128), hashedPassword)
      .input('PasswordSalt', sql.VarChar(10), '') // Not needed when using bcrypt
      .query(`
      INSERT INTO [SalesLT].[Customer] (
        [NameStyle], [Title], [FirstName], [MiddleName], [LastName], [Suffix], 
        [CompanyName], [SalesPerson], [EmailAddress], [Phone], [PasswordHash], [PasswordSalt]
      ) 
      OUTPUT INSERTED.*;
      `);

    // Return the newly created customer
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
  const getAllCustomers = async (req, res) => {
    try {
      const page = req.query.page || 1; // Default to page 1 if not provided
      const pageSize = req.query.pageSize || 10; // Default page size if not provided
  
      const skipRows = (page - 1) * pageSize;
  
      // Retrieve paginated customers from the database using the pool
      const result = await req.pool.request()
        .input('SkipRows', sql.Int, skipRows)
        .input('PageSize', sql.Int, pageSize)
        .query('SELECT * FROM salesLT.Customer ORDER BY CustomerID OFFSET @SkipRows ROWS FETCH NEXT @PageSize ROWS ONLY');
  
      // Return the paginated list of customers
      res.json(result.recordset);
    } catch (error) {
      console.error('Error retrieving paginated customers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const getCustomerById = async (req, res) => {
    try {
      const customerId = req.params.customerId;
  
      // Retrieve a specific customer by ID from the database using the pool
      const result = await req.pool.request()
        .input('CustomerId', sql.Int, customerId)
        .query('SELECT * FROM Customer WHERE CustomerID = @CustomerId');
  
      // Check if the customer exists
      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Return the specific customer
      res.json(result.recordset[0]);
    } catch (error) {
      console.error('Error retrieving customer by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Similar modifications for updateCustomer and deleteCustomer functions
  
  module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    // Add other functions here
  };
  

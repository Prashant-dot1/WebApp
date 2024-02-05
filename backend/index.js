// server.js
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const {ConnectToMSSQL} = require("./db");
const customerRoutes = require("./routes/customers")
const productRoutes = require("./routes/products");


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
// TODO: Connect to SQL Server
const pool = ConnectToMSSQL();

// Attach database connection pool to request object for easy access in controllers
app.use((req, res, next) => {
    req.pool = pool; // Attach the sql pool to the request
    next();
  });


// API routes
app.use('/api/customers', customerRoutes);
app.use('/api/products',productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

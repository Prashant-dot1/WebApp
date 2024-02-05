// server.js
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const {ConnectToMSSQL} = require("./db");
const productRoutes = require("./routes/products");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDefinition'); 


const app = express();

app.use(cors({}));
app.use(express.json());

const options = {
  definition: swaggerDefinition,
  apis: ['./routes/*.js'], // Update with the path to your route files
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3001;
// TODO: Connect to SQL Server
const pool = ConnectToMSSQL();

// Attach database connection pool to request object for easy access in controllers
app.use((req, res, next) => {
    req.pool = pool; // Attach the sql pool to the request
    next();
  });


// API routes
app.use('/api/products',productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes/customers.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new customer
// router.post('/', customerController.createCustomer);

// Retrieve all customers

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     description: Returns a list of products with optional pagination and filtering by categories and product models.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page (default is 10).
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The field to sort by (default is 'ProductID').
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: The sort order ('ASC' or 'DESC', default is 'ASC').
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of product category IDs for filtering.
 *       - in: query
 *         name: productModels
 *         schema:
 *           type: string
 *         description: Comma-separated list of product model IDs for filtering.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     # Define the properties of each product here
 *                 totalCount:
 *                   type: integer
 *                   description: Total count of products (without pagination)
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products/categories:
 *   get:
 *     summary: Get all product categories
 *     description: Returns a list of all product categories.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 # Define the properties of each product category here
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/categories",productController.getAllCategories);

/**
 * @swagger
 * /api/products/models:
 *   get:
 *     summary: Get a list of product models
 *     description: Returns a list of product models.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 # Define the properties of each product model here
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get("/models",productController.getAllModels);


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: "newProduct"
 *               productNumber:
 *                 type: string
 *                 default: "p1234"
 *               color:
 *                 type: string
 *                 default: "Red"
 *               standardCost:
 *                 type: number
 *                 default: 0
 *               listPrice:
 *                 type: number
 *                 default: 0
 *               size:
 *                 type: string
 *                 maxLength: 5  // Update with the actual maximum length allowed
 *                 default: ""
 *               weight:
 *                 type: number
 *                 default: 1016.14
 *               productCategoryID:
 *                 type: integer
 *                 default: 6
 *               productModelID:
 *                 type: integer
 *                 default: 24
 *               sellStartDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2024-02-05T16:01:44.778Z"
 *               sellEndDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2024-02-05T16:01:44.778Z"
 *               discontinuedDate:
 *                 type: string
 *                 format: date-time
 *                 default: "2024-02-05T16:01:44.778Z"
 *               thumbNailPhoto:
 *                 type: string
 *                 default: "string"
 *               thumbnailPhotoFileName:
 *                 type: string
 *                 default: "string"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product created successfully
 *               product:
 *                 ProductID: 1
 *                 Name: 'Product Name'
 *                 ProductNumber: 'Product Number'
 *                 Color: 'Product Color'
 *                 StandardCost: 10.0
 *                 ListPrice: 20.0
 *                 Size: 'Small'
 *                 Weight: 1.5
 *                 ProductCategoryID: 1
 *                 ProductModelID: 1
 *                 SellStartDate: '2024-02-04T12:00:00Z'
 *                 SellEndDate: '2025-02-04T12:00:00Z'
 *                 DiscontinuedDate: '2026-02-04T12:00:00Z'
 *                 ThumbNailPhoto: 'base64-encoded-image'
 *                 ThumbnailPhotoFileName: 'thumb.jpg'
 *       400:
 *         description: Bad Request. Check your input and try again.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Check your input and try again - [detailed error message]'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.post("/",productController.createProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieves product details based on the provided product ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               ProductID: 1
 *               Name: 'Product Name'
 *               ProductNumber: 'Product Number'
 *               Color: 'Product Color'
 *               StandardCost: 10.0
 *               ListPrice: 20.0
 *               Size: 'Small'
 *               Weight: 1.5
 *               ProductCategoryID: 1
 *               ProductModelID: 1
 *               SellStartDate: '2024-02-04T12:00:00Z'
 *               SellEndDate: '2025-02-04T12:00:00Z'
 *               DiscontinuedDate: '2026-02-04T12:00:00Z'
 *               ThumbNailPhoto: 'base64-encoded-image'
 *               ThumbnailPhotoFileName: 'thumb.jpg'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.get("/:productId",productController.getProductById);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a product based on the provided product ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product deleted successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: 'Product not found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */
router.delete('/:productId', productController.deleteProductById);


module.exports = router;

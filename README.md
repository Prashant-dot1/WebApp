# Full Stack Application

Starting with the backend part of a Full Stack Application. It provides RESTful APIs for managing products in the AdventureWorksLT database.

## Prerequisites

- Node.js (version 18.19.0)
- npm (Node Package Manager)
- SQL Server (for AdventureWorksLT database)
- ```npm install``` command to be ran in backend directory (```cd backend```)
- `.env` file with the following configurations:

```env
PORT=3000

DB_USERNAME=sa
DB_PASSWORD=<your_db_password>
DB_DATABASE_NAME=AdventureWorksLT2022
DB_SERVER=localhost
```

- The server will run at http://localhost:3000/
- The FrontEnd would be running at http://127.0.0.1:5173/

- For frontend make sure to switch to the frontend directory - ```cd ../frontend``` assuming that you were in the backend folder first
- ```npm install``` , run this command to install all the dependencies
- run , ```npm run dev```

# API Documentation

Swagger documentation for the APIs is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## API Endpoints

### 1. Get List of Products

- **Endpoint:** `GET /api/products`
- **Description:** Get a list of products.

### 2. Get Product Details by ID

- **Endpoint:** `GET /api/products/{productId}`
- **Description:** Get details of a product by ID.

### 3. Create a New Product

- **Endpoint:** `POST /api/products`
- **Description:** Create a new product.

### 4. Update Product Details by ID

- **Endpoint:** `PUT /api/products/{productId}`
- **Description:** Update details of a product by ID.

### 5. Delete a Product by ID

- **Endpoint:** `DELETE /api/products/{productId}`
- **Description:** Delete a product by ID.

## Frontend features include-

### 1. Filtering the data using the list of product categories and product models
### 2. Sorting the data with the specific columns
### 3. Added the feature of pagination as well
### 4. Swagger docs support is available


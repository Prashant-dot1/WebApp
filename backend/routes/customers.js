// routes/customers.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/', customerController.createCustomer);

// Retrieve all customers
router.get('/', customerController.getAllCustomers);

// Retrieve a specific customer by ID
router.get('/:customerId', customerController.getCustomerById);

// Update customer details
// router.put('/:customerId', customerController.updateCustomer);

// Delete a customer
// router.delete('/:customerId', customerController.deleteCustomer);

module.exports = router;

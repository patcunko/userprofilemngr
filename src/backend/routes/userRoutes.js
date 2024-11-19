const express = require('express');
const { getUserProfile, updatePayment, updateContactInfo } = require('../controllers/userController');

const router = express.Router();

// Route to get user profile by ID
router.get('/user/:userId', getUserProfile);

// Route to update payment information
router.put('/user/:userId/payment', updatePayment);

// Route to update contact information
router.put('/user/:userId/contact', updateContactInfo);

module.exports = router;
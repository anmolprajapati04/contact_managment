const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// Validation rules
const contactValidation = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('phone').notEmpty().withMessage('Phone number is required').trim(),
];

// Routes
router.route('/')
  .get(getContacts)
  .post(contactValidation, createContact);

router.route('/:id')
  .get(getContactById)
  .put(contactValidation, updateContact)
  .delete(deleteContact);

module.exports = router;
const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', submitContact);

// @route   GET /api/contact/stats
// @desc    Get contact statistics
// @access  Private (Admin)
router.get('/stats', adminAuth, getContactStats);

// @route   GET /api/contact
// @desc    Get all contacts
// @access  Private (Admin)
router.get('/', adminAuth, getAllContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact
// @access  Private (Admin)
router.get('/:id', adminAuth, getContact);

// @route   PUT /api/contact/:id
// @desc    Update contact status
// @access  Private (Admin)
router.put('/:id', adminAuth, updateContactStatus);

// @route   DELETE /api/contact/:id
// @desc    Delete contact
// @access  Private (Admin)
router.delete('/:id', adminAuth, deleteContact);

module.exports = router;
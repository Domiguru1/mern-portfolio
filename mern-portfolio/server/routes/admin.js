const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  adminLogin,
  createAdmin,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  getDashboardStats
} = require('../controllers/adminController');

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', adminLogin);

// @route   POST /api/admin/create
// @desc    Create admin user (initial setup)
// @access  Public
router.post('/create', createAdmin);

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard/stats', adminAuth, getDashboardStats);

// @route   GET /api/admin/projects
// @desc    Get all projects (admin view)
// @access  Private (Admin)
router.get('/projects', adminAuth, getAdminProjects);

// @route   POST /api/admin/projects
// @desc    Create new project
// @access  Private (Admin)
router.post('/projects', adminAuth, createProject);

// @route   PUT /api/admin/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/projects/:id', adminAuth, updateProject);

// @route   DELETE /api/admin/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/projects/:id', adminAuth, deleteProject);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  getFeaturedProjects
} = require('../controllers/portfolioController');

// @route   GET /api/portfolio/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', getAllProjects);

// @route   GET /api/portfolio/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/projects/featured', getFeaturedProjects);

// @route   GET /api/portfolio/projects/:id
// @desc    Get single project
// @access  Public
router.get('/projects/:id', getProject);

module.exports = router;
const Project = require('../models/Project');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const { category, featured, status } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (status) filter.status = status;
    
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get featured projects
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true, status: 'active' })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProject,
  getFeaturedProjects
};
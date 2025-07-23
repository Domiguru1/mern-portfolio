const User = require('../models/User');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create admin user (for initial setup)
const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }
    
    const user = new User({
      username,
      email,
      password,
      role: 'admin'
    });
    
    await user.save();
    
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all projects (admin view)
const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create project
const createProject = async (req, res) => {
  try {
    console.log('Creating project with data:', req.body);
    
    // Validate required fields
    const { title, description, shortDescription, technologies } = req.body;
    
    if (!title || !description || !shortDescription) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        details: 'Title, description, and short description are required' 
      });
    }
    
    if (!technologies || technologies.length === 0) {
      return res.status(400).json({ 
        message: 'Technologies are required', 
        details: 'At least one technology must be specified' 
      });
    }
    
    // Create project with validated data
    const projectData = {
      ...req.body,
      // Ensure image has a default if empty
      image: req.body.image || 'https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image'
    };
    
    const project = new Project(projectData);
    const savedProject = await project.save();
    
    console.log('Project created successfully:', savedProject._id);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        details: validationErrors.join(', '),
        errors: error.errors
      });
    }
    
    res.status(500).json({ 
      message: 'Server error while creating project', 
      error: error.message 
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const featuredProjects = await Project.countDocuments({ featured: true });
    
    res.json({
      totalProjects,
      activeProjects,
      featuredProjects
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  adminLogin,
  createAdmin,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  getDashboardStats
};
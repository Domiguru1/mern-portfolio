# MERN Portfolio with Admin Dashboard  (FINAL PROJECT) Week 8 Assignment

A full-stack portfolio website built with MongoDB, Express.js, React.js, and Node.js. Features a modern, responsive design with a complete admin dashboard for managing projects and contact messages.

## Features

### Frontend (React)
- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Portfolio Showcase**: Display projects with filtering by category and featured status
- **Contact Form**: Integrated contact form for potential clients
- **Project Details**: Detailed project pages with technologies, links, and descriptions
- **SEO Friendly**: Optimized meta tags and semantic HTML

### Admin Dashboard
- **Secure Authentication**: JWT-based login system
- **Project Management**: Full CRUD operations for portfolio projects
- **Contact Management**: View, respond to, and manage contact form messages
- **Dashboard Analytics**: Overview of projects and messages statistics
- **Mobile Responsive**: Admin panel works on all devices
- **Status Management**: Track project status (active, completed, inactive)
- **Featured Projects**: Mark projects as featured for homepage display

### Backend (Node.js/Express)
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Mongoose ODM for database operations
- **Authentication**: JWT tokens with bcrypt password hashing
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and responses
- **CORS Enabled**: Cross-origin resource sharing configured

## Tech Stack

- **Frontend**: React 18, React Router, Axios, React Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Styling**: Custom CSS with modern design patterns
- **Development**: Concurrently for running both client and server

## Project Structure

```
mern-portfolio/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/     # Reusable React components
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── ...
│       ├── pages/          # Page components
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Portfolio.jsx
│       │   ├── Contact.jsx
│       │   └── ProjectDetail.jsx
│       ├── admin/          # Admin dashboard components
│       │   ├── AdminLogin.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AdminProjects.jsx
│       │   ├── AdminContacts.jsx
│       │   └── ProtectedRoute.jsx
│       ├── services/       # API service layer
│       │   └── api.js
│       ├── App.jsx         # Main app component
│       ├── index.js        # React entry point
│       └── index.css       # Global styles
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   │   ├── portfolioController.js
│   │   ├── adminController.js
│   │   └── contactController.js
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/            # Express routes
│   │   ├── portfolio.js
│   │   ├── admin.js
│   │   └── contact.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   ├── package.json
│   └── index.js           # Server entry point
├── .env                   # Environment variables
├── package.json           # Root package.json for concurrent running
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-portfolio
```

### 2. Install Dependencies
```bash
# Install root dependencies (for concurrently)
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:3000
```

For MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-portfolio?retryWrites=true&w=majority
```

### 4. Create Admin User
Before running the application, you'll need to create an admin user. You can do this by:

1. Starting the server: `npm run server`
2. Making a POST request to `http://localhost:5000/api/admin/create` with:
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "your-secure-password"
}
```

Or use the demo credentials provided in the admin login form.

### 5. Start the Application
```bash
# Run both client and server concurrently
npm run dev

# Or run them separately:
# Terminal 1: npm run server
# Terminal 2: npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:3000/admin/login

## Usage

### Public Website
- **Home**: Landing page with hero section, skills, and featured projects
- **About**: Personal information, experience timeline, and skills
- **Portfolio**: All projects with category filtering
- **Contact**: Contact form for potential clients
- **Project Details**: Detailed view of individual projects

### Admin Dashboard
1. **Login**: Access admin panel at `/admin/login`
2. **Dashboard**: Overview of statistics and quick actions
3. **Projects**: Manage portfolio projects (Create, Read, Update, Delete)
4. **Messages**: View and respond to contact form submissions

### API Endpoints

#### Public Routes
- `GET /api/portfolio/projects` - Get all active projects
- `GET /api/portfolio/projects/featured` - Get featured projects
- `GET /api/portfolio/projects/:id` - Get single project
- `POST /api/contact` - Submit contact form

#### Admin Routes (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/projects` - Get all projects (admin view)
- `POST /api/admin/projects` - Create new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/contact` - Get all contact messages
- `PUT /api/contact/:id` - Update message status
- `DELETE /api/contact/:id` - Delete message

## Customization

### Design
- Modify colors in `client/src/index.css`
- Update component styles in individual CSS files
- Change gradient colors and animations

### Content
- Update personal information in pages
- Add your own project images and descriptions
- Modify the skills and experience sections

### Features
- Add more project categories in the models
- Implement email notifications for contact forms
- Add image upload functionality
- Integrate with external APIs

## Deployment

### Frontend (Netlify/Vercel)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URLs in the build

### Backend (Heroku/Railway/Render)
1. Set environment variables on your hosting platform
2. Update MongoDB URI to your cloud database
3. Deploy the server folder

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-super-secure-production-secret
CLIENT_URL=https://your-frontend-domain.com
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:
1. Check the GitHub Issues page
2. Create a new issue with detailed description
3. Include error messages and environment details

## Screenshots

### Home Page
- Hero section with call-to-action
- Skills showcase
- Featured projects grid

### Admin Dashboard
- Statistics overview
- Project management interface
- Contact message management

### Mobile Responsive
- Works seamlessly on all device sizes
- Touch-friendly admin interface
- Optimized mobile navigation

---

**Built with ❤️ using the MERN Stack**
** Dominic Njenga**

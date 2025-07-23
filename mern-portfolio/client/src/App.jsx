import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjects from './admin/AdminProjects';
import AdminContacts from './admin/AdminContacts';
import AdminTest from './admin/AdminTest';
import AdminAPITest from './admin/AdminAPITest';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes - These need to be first to avoid conflicts */}
          <Route path="/admin/test" element={<AdminTest />} />
          <Route path="/admin/api-test" element={
            <ProtectedRoute>
              <AdminAPITest />
            </ProtectedRoute>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects" 
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/contacts" 
            element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes with Layout */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/about" element={
            <>
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/portfolio" element={
            <>
              <Navbar />
              <main>
                <Portfolio />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <Navbar />
              <main>
                <Contact />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/project/:id" element={
            <>
              <Navbar />
              <main>
                <ProjectDetail />
              </main>
              <Footer />
            </>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <>
              <Navbar />
              <main>
                <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                  <h2>404 - Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
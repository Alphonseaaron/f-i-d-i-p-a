import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import BlogPage from './pages/Blog';
import ProjectsPage from './pages/Projects';
import WriteForUsPage from './pages/WriteForUs';
import AdminPanel from './pages/admin/AdminPanel';
import ProgramsPage from './pages/Programs';
import BlogPostPage from './pages/BlogPost';
import ProgramDetailPage from './pages/ProgramDetail';
import ProjectDetailPage from './pages/ProjectDetail';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-white">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:slug" element={<ProgramDetailPage />} />
        <Route path="/write-for-us" element={<WriteForUsPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
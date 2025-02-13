import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, FileImage, Layout, BookOpen, Target, Users } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, query, orderBy, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { uploadFile } from '../../lib/storage';

interface ContentItem {
  id: string;
  title: string;
  content?: string;
  description?: string;
  image_url?: string;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  slug: string;
  author?: string;
  author_photo?: string;
  author_bio?: string;
}

interface SiteConfig {
  id: string;
  name: string;
  meta_title?: string;
  meta_description?: string;
  logo_url?: string;
  favicon_url?: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface Section {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  order: number;
}

export default function AdminPanel() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'blog' | 'projects' | 'programs' | 'site' | 'sections' | 'media'>('blog');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated, activeTab]);

  const fetchContent = async () => {
    try {
      let data;
      
      switch (activeTab) {
        case 'blog':
          const blogSnapshot = await getDocs(query(collection(db, 'blog_posts'), orderBy('created_at', 'desc')));
          data = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          break;

        case 'projects':
          const projectsSnapshot = await getDocs(query(collection(db, 'projects'), orderBy('created_at', 'desc')));
          data = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          break;

        case 'programs':
          const programsSnapshot = await getDocs(query(collection(db, 'programs'), orderBy('created_at', 'desc')));
          data = programsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          break;

        case 'sections':
          const sectionsSnapshot = await getDocs(query(collection(db, 'sections'), orderBy('order', 'asc')));
          setSections(sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Section[]);
          return;

        case 'site':
          const configSnapshot = await getDocs(collection(db, 'site_config'));
          if (!configSnapshot.empty) {
            setSiteConfig({ id: configSnapshot.docs[0].id, ...configSnapshot.docs[0].data() } as SiteConfig);
          }
          return;
      }

      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = await login(email, password);
    if (!success) {
      setLoginError('Invalid credentials');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="bg-dark-lighter p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-center">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="flex h-screen">
        <div className="w-64 bg-dark-lighter border-r border-gray-800">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'blog' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <BookOpen size={20} />
                <span>Blog Posts</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <Target size={20} />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'programs' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <Users size={20} />
                <span>Programs</span>
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'sections' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <Layout size={20} />
                <span>Page Sections</span>
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'media' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <FileImage size={20} />
                <span>Media Library</span>
              </button>
              <button
                onClick={() => setActiveTab('site')}
                className={`w-full flex items-center space-x-2 p-2 rounded ${
                  activeTab === 'site' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-dark-accent'
                }`}
              >
                <Settings size={20} />
                <span>Site Settings</span>
              </button>
            </nav>
          </div>
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'blog' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
              <div className="space-y-4">
                {content.map((post) => (
                  <div key={post.id} className="bg-dark-lighter p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="text-gray-400 mt-2">{post.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <div className="space-y-4">
                {content.map((project) => (
                  <div key={project.id} className="bg-dark-lighter p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-400 mt-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'programs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Programs</h2>
              <div className="space-y-4">
                {content.map((program) => (
                  <div key={program.id} className="bg-dark-lighter p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                    <p className="text-gray-400 mt-2">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'sections' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Page Sections</h2>
              <div className="space-y-4">
                {sections.map((section) => (
                  <div key={section.id} className="bg-dark-lighter p-4 rounded-lg">
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'site' && siteConfig && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{siteConfig.name}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={siteConfig.meta_title || ''}
                      className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Description</label>
                    <textarea
                      value={siteConfig.meta_description || ''}
                      className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'media' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Media Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Media items would go here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
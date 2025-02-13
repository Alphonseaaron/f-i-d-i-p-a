import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, FileImage, Layout, BookOpen, Target, Users, Plus, Trash2, Edit, Eye } from 'lucide-react';
import { collection, query, orderBy, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { uploadFile, deleteFile } from '../../lib/storage';
import ContentForm from '../../components/admin/ContentForm';
import MediaUploader from '../../components/admin/MediaUploader';
import Editor from '../../components/admin/Editor';

interface ContentItem {
  id: string;
  title: string;
  content?: string;
  description?: string;
  image_url?: string;
  image_path?: string;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  slug: string;
  author?: string;
  author_photo?: string;
  author_bio?: string;
  created_at?: any;
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
  image_path?: string;
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
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated, activeTab]);

  const fetchContent = async () => {
    try {
      let collectionName = '';
      switch (activeTab) {
        case 'blog':
          collectionName = 'blog_posts';
          break;
        case 'projects':
          collectionName = 'projects';
          break;
        case 'programs':
          collectionName = 'programs';
          break;
        case 'sections':
          collectionName = 'sections';
          break;
      }

      if (collectionName) {
        const q = query(collection(db, collectionName), orderBy('created_at', 'desc'));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (activeTab === 'sections') {
          setSections(items as Section[]);
        } else {
          setContent(items as ContentItem[]);
        }
      }

      // Fetch site config
      if (activeTab === 'site') {
        const configSnapshot = await getDocs(collection(db, 'site_config'));
        if (!configSnapshot.empty) {
          setSiteConfig({ id: configSnapshot.docs[0].id, ...configSnapshot.docs[0].data() } as SiteConfig);
        }
      }
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

  const handleCreate = () => {
    setEditingItem(null);
    setIsCreating(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleDelete = async (item: ContentItem) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const collectionName = `${activeTab === 'blog' ? 'blog_posts' : activeTab}`;
      await deleteDoc(doc(db, collectionName, item.id));

      // Delete associated image if it exists
      if (item.image_path) {
        await deleteFile(item.image_path);
      }

      fetchContent();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const collectionName = `${activeTab === 'blog' ? 'blog_posts' : activeTab}`;
      
      if (isCreating) {
        await addDoc(collection(db, collectionName), {
          ...data,
          created_at: new Date(),
          updated_at: new Date()
        });
      } else if (editingItem) {
        await updateDoc(doc(db, collectionName, editingItem.id), {
          ...data,
          updated_at: new Date()
        });
      }

      setIsCreating(false);
      setEditingItem(null);
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes');
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            {activeTab !== 'site' && activeTab !== 'media' && (
              <button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create New</span>
              </button>
            )}
          </div>

          {(isCreating || editingItem) && activeTab !== 'site' && activeTab !== 'media' ? (
            <div className="bg-dark-lighter p-6 rounded-lg">
              <ContentForm
                type={activeTab === 'blog' ? 'blog' : activeTab === 'projects' ? 'project' : 'program'}
                initialData={editingItem}
                onSubmit={handleSubmit}
              />
            </div>
          ) : (
            <>
              {activeTab !== 'site' && activeTab !== 'media' && (
                <div className="grid gap-6">
                  {content.map((item) => (
                    <div key={item.id} className="bg-dark-lighter p-6 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-gray-400 hover:text-primary"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'site' && siteConfig && (
                <div className="bg-dark-lighter p-6 rounded-lg">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name</label>
                      <input
                        type="text"
                        value={siteConfig.name}
                        onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                        className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Meta Title</label>
                        <input
                          type="text"
                          value={siteConfig.meta_title || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, meta_title: e.target.value })}
                          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Meta Description</label>
                        <textarea
                          value={siteConfig.meta_description || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, meta_description: e.target.value })}
                          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Logo</label>
                        <MediaUploader
                          onUploadComplete={(url) => setSiteConfig({ ...siteConfig, logo_url: url })}
                          folder="site"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Favicon</label>
                        <MediaUploader
                          onUploadComplete={(url) => setSiteConfig({ ...siteConfig, favicon_url: url })}
                          folder="site"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Social Links</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(siteConfig.social_links || {}).map(([platform, url]) => (
                          <div key={platform}>
                            <label className="block text-sm font-medium mb-2 capitalize">{platform}</label>
                            <input
                              type="url"
                              value={url || ''}
                              onChange={(e) => setSiteConfig({
                                ...siteConfig,
                                social_links: {
                                  ...siteConfig.social_links,
                                  [platform]: e.target.value
                                }
                              })}
                              className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  <MediaUploader
                    onUploadComplete={(url) => {
                      // Handle media upload
                      console.log('Uploaded:', url);
                    }}
                    folder="media"
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Media items would go here */}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
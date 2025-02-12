import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, FileImage, Layout, BookOpen, Target, Users } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, query, orderBy, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { db, storage, auth } from '../../lib/firebase';

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
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blog' | 'projects' | 'programs' | 'site' | 'sections' | 'media'>('blog');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchContent();
    }
  }, [session, activeTab]);

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

  const handleFileUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${activeTab}/${fileName}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleUpdateContent = async (item: ContentItem) => {
    try {
      const collectionName = activeTab === 'blog' ? 'blog_posts' : 
                            activeTab === 'projects' ? 'projects' : 'programs';

      await updateDoc(doc(db, collectionName, item.id), {
        ...item,
        updated_at: new Date()
      });

      fetchContent();
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="bg-dark-lighter p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Access</h2>
          <p className="text-center text-gray-300 mb-4">
            Please sign in through Netlify to access the admin panel.
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
          >
            Sign In with Netlify
          </button>
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
              onClick={() => auth.signOut()}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'site' && siteConfig && (
            <div className="bg-dark-lighter p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Site Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    value={siteConfig.name}
                    onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={siteConfig.meta_title}
                    onChange={(e) => setSiteConfig({ ...siteConfig, meta_title: e.target.value })}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <textarea
                    value={siteConfig.meta_description}
                    onChange={(e) => setSiteConfig({ ...siteConfig, meta_description: e.target.value })}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Social Links</label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(siteConfig.social_links).map(([platform, url]) => (
                      <div key={platform}>
                        <label className="block text-sm font-medium mb-2 capitalize">{platform}</label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            social_links: { ...siteConfig.social_links, [platform]: e.target.value }
                          })}
                          className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'blog' || activeTab === 'projects' || activeTab === 'programs') && (
            <div className="space-y-6">
              {content.map((item) => (
                <div key={item.id} className="bg-dark-lighter p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      {item.author && (
                        <div className="flex items-center mt-2">
                          {item.author_photo && (
                            <img
                              src={item.author_photo}
                              alt={item.author}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                          )}
                          <div>
                            <p className="text-gray-400">By {item.author}</p>
                            {item.author_bio && (
                              <p className="text-sm text-gray-500">{item.author_bio}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleUpdateContent({ ...item, status: 'published' })}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="prose prose-invert max-w-none">
                    {item.content || item.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} className="bg-dark-lighter p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <button
                      onClick={() => setEditingItem(section)}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    {section.content}
                  </div>
                  {section.image_url && (
                    <img
                      src={section.image_url}
                      alt={section.title}
                      className="mt-4 rounded-lg max-h-48 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="bg-dark-lighter p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    for (const file of files) {
                      try {
                        await handleFileUpload(file);
                      } catch (error) {
                        console.error('Error uploading file:', error);
                      }
                    }
                  }}
                  className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
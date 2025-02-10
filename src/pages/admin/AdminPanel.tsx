import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, query, where, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ContentItem {
  id: string;
  title?: string;
  content?: string;
  author?: string;
  authorPhoto?: string;
  authorBio?: string;
  status?: 'pending' | 'approved' | 'rejected';
  type: 'blog' | 'project' | 'program';
  description?: string;
  imageUrl?: string;
}

interface SiteConfig {
  name: string;
  logo: string;
  favicon: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blog' | 'projects' | 'programs' | 'site'>('blog');
  const [content, setContent] = useState<ContentItem[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    name: 'FIDIPA',
    logo: '',
    favicon: ''
  });
  const [editingConfig, setEditingConfig] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials');
    }
  };

  const fetchContent = async () => {
    try {
      if (activeTab === 'site') {
        const docSnap = await getDocs(collection(db, 'site_config'));
        if (!docSnap.empty) {
          setSiteConfig(docSnap.docs[0].data() as SiteConfig);
        }
        return;
      }

      let q;
      if (activeTab === 'blog') {
        q = query(collection(db, 'blog_posts'));
      } else {
        q = query(collection(db, activeTab));
      }
      
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: activeTab === 'blog' ? 'blog' : activeTab === 'projects' ? 'project' : 'program'
      })) as ContentItem[];
      setContent(items);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated, activeTab]);

  const handleAction = async (item: ContentItem, action: 'approve' | 'reject' | 'delete') => {
    try {
      const collectionName = item.type === 'blog' ? 'blog_posts' : 
                            item.type === 'project' ? 'projects' : 'programs';
      
      if (action === 'delete') {
        await deleteDoc(doc(db, collectionName, item.id));
      } else {
        await updateDoc(doc(db, collectionName, item.id), {
          status: action === 'approve' ? 'approved' : 'rejected'
        });
      }
      
      fetchContent();
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content');
    }
  };

  const handleFileUpload = async (file: File, path: string) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleSiteConfigUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const configRef = doc(db, 'site_config', 'main');
      await setDoc(configRef, siteConfig);
      setEditingConfig(false);
      alert('Site configuration updated successfully!');
    } catch (error) {
      console.error('Error updating site config:', error);
      alert('Failed to update site configuration');
    }
  };

  const handleConfigFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await handleFileUpload(file, `site/${type}/${file.name}`);
        setSiteConfig(prev => ({ ...prev, [type]: url }));
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        alert(`Failed to upload ${type}`);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <form onSubmit={handleLogin} className="bg-dark-lighter p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button
            onClick={() => auth.signOut()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <div className="border-b border-gray-600">
            <nav className="-mb-px flex space-x-8">
              {['blog', 'projects', 'programs', 'site'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'site' ? (
          <div className="bg-dark-lighter p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Site Configuration</h2>
              <button
                onClick={() => setEditingConfig(!editingConfig)}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                {editingConfig ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingConfig ? (
              <form onSubmit={handleSiteConfigUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    value={siteConfig.name}
                    onChange={(e) => setSiteConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleConfigFileChange(e, 'logo')}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                  />
                  {siteConfig.logo && (
                    <img src={siteConfig.logo} alt="Logo" className="mt-2 h-12" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Favicon</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleConfigFileChange(e, 'favicon')}
                    className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                  />
                  {siteConfig.favicon && (
                    <img src={siteConfig.favicon} alt="Favicon" className="mt-2 h-8" />
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p><strong>Site Name:</strong> {siteConfig.name}</p>
                <div>
                  <strong>Logo:</strong>
                  {siteConfig.logo && (
                    <img src={siteConfig.logo} alt="Logo" className="mt-2 h-12" />
                  )}
                </div>
                <div>
                  <strong>Favicon:</strong>
                  {siteConfig.favicon && (
                    <img src={siteConfig.favicon} alt="Favicon" className="mt-2 h-8" />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {content.map((item) => (
              <div key={item.id} className="bg-dark-lighter p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    {item.author && (
                      <div className="flex items-center mt-2">
                        {item.authorPhoto && (
                          <img
                            src={item.authorPhoto}
                            alt={item.author}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <p className="text-gray-400">By {item.author}</p>
                          {item.authorBio && (
                            <p className="text-sm text-gray-500">{item.authorBio}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAction(item, 'approve')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(item, 'reject')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(item, 'delete')}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {item.imageUrl && (
                  <div className="mb-4 h-48 overflow-hidden rounded">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content || item.description || '' }}
                />
              </div>
            ))}

            {content.length === 0 && (
              <div className="text-center text-gray-400">
                No {activeTab} to review
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
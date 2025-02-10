import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'blog_posts'),
          where('status', '==', 'approved')
        );
        const snapshot = await getDocs(q);
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Latest Updates
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <div 
                  className="text-gray-300 mb-4 prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }}
                />
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>By {post.author}</span>
                  <span>{new Date(post.createdAt.toDate()).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.article>
          ))}

          {posts.length === 0 && (
            <div className="col-span-2 text-center text-gray-400">
              No blog posts available
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
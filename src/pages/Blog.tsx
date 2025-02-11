import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

// Use the same blog posts as the homepage
const blogPosts = [
  {
    title: "Empowering Communities Through Sustainable Development",
    content: "Exploring how sustainable development practices are transforming rural communities and creating lasting positive change...",
    author: "Sarah Johnson",
    authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    date: "2024-02-15",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Impact of Gender Equality Programs",
    content: "Examining the transformative effects of our gender equality initiatives on communities and individual lives...",
    author: "Michael Chen",
    authorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    date: "2024-02-10",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Innovation in Rural Healthcare Delivery",
    content: "Discovering new approaches to delivering healthcare services in remote and underserved areas...",
    author: "Dr. Emily Roberts",
    authorPhoto: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150",
    date: "2024-02-05",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600"
  }
];

export default function Blog() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-dark">
      <BackButton />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Blog
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={post.authorPhoto}
                      alt={post.author}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <span className="text-gray-400">{post.author}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <Link 
                  to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Read More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
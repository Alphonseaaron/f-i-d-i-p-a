import React from 'react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: "Empowering Communities Through Sustainable Development",
    content: "Exploring how sustainable development practices are transforming rural communities and creating lasting positive change...",
    author: "Sarah Johnson",
    date: "2024-02-15",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "The Impact of Gender Equality Programs",
    content: "Examining the transformative effects of our gender equality initiatives on communities and individual lives...",
    author: "Michael Chen",
    date: "2024-02-10",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Innovation in Rural Healthcare Delivery",
    content: "Discovering new approaches to delivering healthcare services in remote and underserved areas...",
    author: "Dr. Emily Roberts",
    date: "2024-02-05",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Youth Education: Building Future Leaders",
    content: "How our educational programs are shaping the next generation of community leaders and change-makers...",
    author: "David Kimani",
    date: "2024-02-01",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600"
  }
];

export default function Blog() {
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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-dark-lighter rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>By {post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="mt-4 text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Read More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
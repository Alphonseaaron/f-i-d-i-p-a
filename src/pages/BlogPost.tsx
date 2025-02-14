import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function BlogPost() {
  const { slug } = useParams();

  // Match the blog post data with the listing page
  const post = {
    title: "Empowering Communities Through Sustainable Development",
    content: `Exploring how sustainable development practices are transforming rural communities and creating lasting positive change.

    Our sustainable development initiatives focus on building resilient communities through participatory approaches and local empowerment strategies. By working directly with community members, we ensure that development projects are both sustainable and aligned with local needs and capabilities.

    Through our integrated approach, we've seen remarkable transformations in various communities:
    
    • Improved agricultural practices leading to better food security
    • Enhanced economic opportunities through skills development
    • Strengthened community institutions and leadership
    • Better environmental conservation practices
    
    The success of these initiatives demonstrates the power of community-led development in creating lasting positive change.`,
    author: "Sarah Johnson",
    date: "2024-02-15",
    imageUrl: "/images/DSC05379.JPG"
  };

  return (
    <div className="min-h-screen bg-dark">
      <BackButton />
      <article className="max-w-4xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
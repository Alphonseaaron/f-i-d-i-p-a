import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function BlogPost() {
  const { slug } = useParams();

  // Match the blog post data with the listing page
  const post = {
    title: "Empowering Communities Through Sustainable Development",
    content: `Our sustainable development initiatives are transforming rural communities through innovative approaches to poverty alleviation, environmental conservation, and economic empowerment. By implementing participatory development strategies and building local capacity, we're creating lasting positive change that benefits entire communities.

    Key Focus Areas:
    • Sustainable Agriculture: Introducing climate-smart farming techniques and drought-resistant crops
    • Renewable Energy: Implementing solar power solutions for homes and community facilities
    • Water Management: Developing sustainable water sources and irrigation systems
    • Economic Empowerment: Creating village savings groups and micro-enterprise opportunities
    
    Impact and Achievements:
    • Increased crop yields by 40% through improved farming methods
    • Provided clean energy access to over 500 households
    • Established 20 community-managed water points
    • Created 50 successful micro-enterprises
    
    Community Engagement:
    Our approach emphasizes community ownership and participation at every stage. Local leaders and community members are actively involved in:
    • Project planning and design
    • Implementation and monitoring
    • Resource management
    • Knowledge sharing and capacity building
    
    Future Directions:
    We're expanding our programs to reach more communities while focusing on:
    • Technology integration for improved efficiency
    • Climate change adaptation strategies
    • Enhanced market linkages for local products
    • Expanded training and skills development
    
    Through these comprehensive efforts, we're building resilient communities that can sustainably manage their resources and continue developing long after our initial intervention.`,
    author: "Sarah Johnson",
    date: "2024-02-15",
    imageUrl: "/images/DSC05379.JPG"
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <BackButton />
      <article className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px] shadow-lg dark:shadow-none">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {post.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
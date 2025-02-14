import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const blogPosts = {
  'empowering-communities-through-sustainable-development': {
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
  },
  'the-impact-of-gender-equality-programs': {
    title: "The Impact of Gender Equality Programs",
    content: `Our gender equality initiatives have demonstrated remarkable success in transforming communities and individual lives through targeted interventions and comprehensive support systems. These programs are creating lasting change by addressing systemic barriers and empowering women to take leadership roles in their communities.

    Program Components:
    • Women's Economic Empowerment: Supporting business development and financial literacy
    • Leadership Development: Training women for community leadership positions
    • Education Access: Removing barriers to girls' education
    • Healthcare Initiatives: Improving access to essential health services
    
    Key Achievements:
    • Established 25 women-led businesses
    • Trained 100+ women in leadership roles
    • Increased girls' school enrollment by 35%
    • Created 15 women's support networks
    
    Success Stories:
    Our programs have empowered numerous women to overcome challenges and achieve their goals:
    • Mary's Story: From small-scale farmer to agricultural cooperative leader
    • Sarah's Journey: Breaking barriers in local government
    • The Women's Savings Group: Creating financial independence
    
    Community Impact:
    The ripple effects of our gender equality programs extend throughout communities:
    • Increased household incomes
    • Improved family health outcomes
    • Enhanced community decision-making
    • Greater economic resilience
    
    Looking Forward:
    We're expanding our initiatives to:
    • Reach more remote communities
    • Develop mentorship programs
    • Strengthen policy advocacy
    • Create sustainable support systems`,
    author: "Michael Chen",
    date: "2024-02-10",
    imageUrl: "/images/SAM_0790.JPG"
  },
  'innovation-in-rural-healthcare-delivery': {
    title: "Innovation in Rural Healthcare Delivery",
    content: `We're revolutionizing healthcare delivery in remote and underserved areas through innovative approaches and community partnerships. Our integrated healthcare solutions are bringing essential medical services to previously unreached populations while building sustainable local capacity.

    Healthcare Innovations:
    • Mobile Health Clinics: Bringing medical care to remote areas
    • Telemedicine Solutions: Connecting patients with specialists
    • Community Health Worker Training: Building local healthcare capacity
    • Digital Health Records: Improving patient care coordination
    
    Impact Metrics:
    • Served 5,000+ patients in remote areas
    • Trained 50 community health workers
    • Established 10 mobile clinic routes
    • Implemented 5 telemedicine centers
    
    Healthcare Services:
    Our comprehensive approach includes:
    • Primary healthcare services
    • Maternal and child health
    • Preventive care programs
    • Health education initiatives
    
    Community Benefits:
    The program has resulted in:
    • Reduced travel time for medical care
    • Improved health outcomes
    • Enhanced preventive care
    • Stronger healthcare systems
    
    Future Expansion:
    We're working to:
    • Expand mobile clinic coverage
    • Enhance telemedicine capabilities
    • Increase health worker training
    • Implement new healthcare technologies`,
    author: "Dr. Emily Roberts",
    date: "2024-02-05",
    imageUrl: "/images/IMG_20141007_172002.jpg"
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
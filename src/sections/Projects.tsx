import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Community Health Initiative",
    description: "Implementing comprehensive healthcare programs in rural communities, focusing on preventive care and health education.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600",
    status: "Ongoing"
  },
  {
    title: "Women Empowerment Program",
    description: "Supporting women through skills training, microfinance initiatives, and business development workshops.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1600",
    status: "Completed"
  },
  {
    title: "Youth Education Support",
    description: "Providing educational resources and mentorship to underprivileged youth in urban areas.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600",
    status: "Ongoing"
  },
  {
    title: "Clean Water Access",
    description: "Installing water purification systems and wells in communities lacking access to clean drinking water.",
    imageUrl: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&q=80&w=1600",
    status: "Planning"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Our Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-dark rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Learn More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const programs = [
  {
    title: "Peace, Gender Mainstream & Governance Advocacy",
    description: "Promoting peace, gender equality, and good governance through community-based initiatives and advocacy programs.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "Environmental, Water & Sanitation",
    description: "Implementing sustainable environmental practices and improving access to clean water and sanitation facilities.",
    image: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&q=80&w=1600"
  },
  {
    title: "AIDS Orphans & Vulnerable Children",
    description: "Supporting and empowering AIDS orphans and vulnerable children through education and healthcare initiatives.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-20 bg-dark relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-dark/60" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Our Programs
          </motion.h2>
          <Link 
            to="/programs"
            className="text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            View All Programs
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-dark-lighter/80 backdrop-blur-sm rounded-lg overflow-hidden transform transition-transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-300 mb-4">{program.description}</p>
                <Link 
                  to={`/programs/${program.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-primary hover:text-primary/80 transition-colors flex items-center"
                >
                  Learn More 
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
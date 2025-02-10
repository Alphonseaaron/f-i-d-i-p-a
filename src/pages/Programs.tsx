import React from 'react';
import { motion } from 'framer-motion';

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
  },
  {
    title: "Capacity Building",
    description: "Developing skills and knowledge within communities to create sustainable, long-term solutions to poverty.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1600"
  }
];

export default function Programs() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Our Programs
        </motion.h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-300">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
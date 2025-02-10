import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const sliderContent = [
  "Our project objective is to increase the capacity of rural and urban affected areas.",
  "We implement grassroots programs and provide consultancy services.",
  "We believe in promoting peace and gender equality."
];

export default function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-lighter" />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Welcome to FIDIPA
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Friendly Integrated Development Initiative in Poverty Alleviation
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          {sliderContent.map((text, index) => (
            <p key={index} className="text-lg text-gray-300">{text}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown 
            size={32} 
            className="text-primary animate-bounce" 
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
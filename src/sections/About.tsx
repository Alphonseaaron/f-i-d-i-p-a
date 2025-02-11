import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const content = [
    {
      title: "Our Mission",
      description: "To empower communities through sustainable development initiatives and create lasting positive change in society.",
      icon: "🎯"
    },
    {
      title: "Our Vision",
      description: "A world where every community has the resources and opportunities to thrive and prosper sustainably.",
      icon: "👁️"
    },
    {
      title: "Our Values",
      description: "Integrity, Transparency, Community-First, Innovation, and Sustainable Development.",
      icon: "⭐"
    }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-dark-lighter via-dark to-dark-lighter min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
            Friendly Integrated Development Initiative in Poverty Alleviation (FIDIPA) 
            is a Non-Governmental Organization (NGO) in Kenya registered under the NGO 
            Act as a National NGO. The organization has a high profiled advisory Board 
            charged with the responsibility of formulation and review of policy framework, 
            which is executed by the management committee.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {content.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-dark-lighter/50 to-dark-accent/30 backdrop-blur-sm p-8 rounded-lg border border-gray-800 hover:border-primary/30 transition-colors group"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="text-4xl mb-4"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "10+", label: "Years Experience" },
            { number: "50+", label: "Projects Completed" },
            { number: "100K+", label: "Lives Impacted" },
            { number: "25+", label: "Community Partners" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg"
            >
              <h4 className="text-3xl font-bold text-primary mb-2">{stat.number}</h4>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          Friendly Integrated Development Initiative in Poverty Alleviation (FIDIPA) 
          is a Non-Governmental Organization (NGO) in Kenya registered under the NGO 
          Act as a National NGO. The organization has a high profiled advisory Board 
          charged with the responsibility of formulation and review of policy framework, 
          which is executed by the management committee.
        </motion.p>
      </div>
    </section>
  );
}
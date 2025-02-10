import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const sliderContent = [
  "Our project objective is to increase the capacity of rural and urban affected areas.",
  "We implement grassroots programs and provide consultancy services.",
  "We believe in promoting peace and gender equality."
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen bg-gradient-to-b from-dark to-dark-lighter"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-center w-full">
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
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Friendly Integrated Development Initiative in Poverty Alleviation
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Friendly Integrated Development Initiative in Poverty Alleviation (FIDIPA) 
            is a Non-Governmental Organization (NGO) in Kenya registered under the NGO 
            Act as a National NGO. The organization has a high profiled advisory Board 
            charged with the responsibility of formulation and review of policy framework, 
            which is executed by the management committee.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Address:</strong> Kayole Spine Road Line D2-303
              </p>
              <p>
                <strong>Phone:</strong> +254 788 377 557
              </p>
              <p>
                <strong>Email:</strong>
                <br />
                info@fidipa.org
                <br />
                fidipakenya@gmail.com
              </p>
              <p>
                <strong>Website:</strong> www.fidipa.org
              </p>
            </div>
            <div className="bg-dark-accent rounded-lg p-8">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-2 rounded bg-dark border border-gray-600 text-white"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
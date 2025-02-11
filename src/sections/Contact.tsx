import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:info@fidipa.org';
  };

  const handlePhoneClick = () => {
    if ('tel' in window.navigator) {
      window.location.href = 'tel:+254788377557';
    }
  };

  const handleWebsiteClick = () => {
    window.location.reload();
  };

  return (
    <section id="contact" className="py-20 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Contact Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="bg-dark p-6 rounded-lg">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Address</h3>
            <p className="text-gray-300">Kayole Spine Road Line D2-303</p>
          </div>

          <button
            onClick={handlePhoneClick}
            className="bg-dark p-6 rounded-lg text-left hover:bg-dark-lighter transition-colors"
          >
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-300">+254 788 377 557</p>
          </button>

          <button
            onClick={handleEmailClick}
            className="bg-dark p-6 rounded-lg text-left hover:bg-dark-lighter transition-colors"
          >
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-300">info@fidipa.org</p>
            <p className="text-gray-300">fidipakenya@gmail.com</p>
          </button>

          <button
            onClick={handleWebsiteClick}
            className="bg-dark p-6 rounded-lg text-left hover:bg-dark-lighter transition-colors"
          >
            <Globe className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Website</h3>
            <p className="text-gray-300">www.fidipa.org</p>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link 
            to="/write-for-us"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <PenTool size={20} />
            <span>Write for Us</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, PenTool } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Contact() {
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle || !articleContent || !authorName || !authorEmail) {
      alert('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'blog_posts'), {
        title: articleTitle,
        content: articleContent,
        author: authorName,
        email: authorEmail,
        status: 'pending',
        createdAt: new Date()
      });
      setSubmitSuccess(true);
      setArticleTitle('');
      setArticleContent('');
      setAuthorName('');
      setAuthorEmail('');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Failed to submit article. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-300"
          >
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Address</h3>
                <p>Kayole Spine Road Line D2-303</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Phone</h3>
                <p>+254 788 377 557</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Email</h3>
                <p>info@fidipa.org</p>
                <p>fidipakenya@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Website</h3>
                <p>www.fidipa.org</p>
              </div>
            </div>

            <button
              onClick={() => setShowWriteForm(true)}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <PenTool className="w-5 h-5" />
              <span>Write for Us</span>
            </button>
          </motion.div>

          {!showWriteForm ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark rounded-lg p-8"
            >
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark rounded-lg p-8"
            >
              {submitSuccess ? (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4">Thank You!</h3>
                  <p className="text-gray-300 mb-6">
                    Your article has been submitted successfully and is pending review.
                    We'll notify you once it's approved.
                  </p>
                  <button
                    onClick={() => {
                      setShowWriteForm(false);
                      setSubmitSuccess(false);
                    }}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Back to Contact Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleArticleSubmit} className="space-y-4">
                  <h3 className="text-xl font-semibold mb-6">Write for Us</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Article Title
                    </label>
                    <input
                      type="text"
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      className="w-full p-2 rounded bg-dark-lighter border border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Article Content
                    </label>
                    <div className="bg-dark-lighter border border-gray-600 rounded">
                      <ReactQuill
                        theme="snow"
                        value={articleContent}
                        onChange={setArticleContent}
                        className="text-white"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowWriteForm(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded transition-colors disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Article'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
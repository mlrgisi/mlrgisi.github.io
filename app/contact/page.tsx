'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Map, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLastUpdated } from '@/components/LastUpdatedContext';

export default function ContactPage() {
  const { setLastUpdated } = useLastUpdated();

  useEffect(() => {
    setLastUpdated('2025-06-17');
  }, [setLastUpdated]);

  const contactInfo = [
    {
      icon: Map,
      title: 'Address',
      details: [
        'Room: 912, 919',
        '9th Floor, S. N. Bose Building',
        'Electronics and Communication Sciences Unit',
        'Indian Statistical Institute',
        'Kolkata, West Bengal 700108, India'
      ],
      color: 'text-blue-500',
      link: 'https://maps.app.goo.gl/2YohFJHp4zxABDn87'
    },
    {
      icon: MapPin,
      title: "DigiPin",
      details: ['2TF-F6P-3TL6', 'DIGIPIN is a transformative geospatial reference system developed by Department of Posts, Government of India, offering every 4×4 m² area across India a unique 10-character address.'],
      color: 'text-violet-500',
      link: 'https://dac.indiapost.gov.in/mydigipin/home/2TF-F6P-3TL6',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['Lab: 033-25752915', 'Prof. Das: 033-25752323'],
      color: 'text-green-500',
      link: 'tel:+913325752915'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['mlrgisical@gmail.com', 'swagatam.das@isical.ac.in'],
      color: 'text-purple-500',
      link:'mailto:mlrgisical@gmail.com?cc=swagatam.das@isical.ac.in&subject=[FromMLRGSite]'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 10:30 AM - 7:30 PM'],
      color: 'text-orange-500',
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Get in touch with our research team for collaborations, inquiries, or to learn more about our work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-16">
            {/* Contact Info Cards */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold mb-4 text-gradient">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  We're always excited to discuss research opportunities, collaborations, and answer any questions about our work.
                </p>
              </motion.div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="research-card p-6 rounded-2xl hover-lift"
                  >
                    <Link href={info.link} target='_blank'>
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${info.color}`}>
                          <info.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600 dark:text-gray-400 mb-1">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="research-card p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Send us a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                    <option>Research Collaboration</option>
                    <option>PhD Application</option>
                    <option>General Inquiry</option>
                    <option>Media Request</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient">
              Find Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Visit our research lab at the Indian Statistical Institute, Kolkata
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="research-card rounded-2xl overflow-hidden"
          >
            {/* Placeholder for map - in a real implementation, you'd use Google Maps or similar */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.5332968827375!2d88.37581317551096!3d22.648822295401207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89dba10e4e79f%3A0xace4e14eedfce0ec!2sIndian%20Statistical%20Institute%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1749984462508!5m2!1sen!2sin" width="100%" height="600" style={{ border:10 }} allowFullScreen={true} loading="lazy"></iframe>
            {/* <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  Interactive Map
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  University Research Institute<br />
                  Department of Computer Science
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

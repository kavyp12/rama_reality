'use client';

import { motion, easeOut, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const RamaRealtyFooter = () => {
  const quickLinks = [
    'Buy Property',
    'Sell Property',
    'Rent Property',
    'New Projects',
    'Property Valuation',
    'Home Loans'
  ];

  const locations = [
    'Ambli',
    'Gota',
    'Jagatpur',
    'Adani Shantigram',
    'Chharodi',
    'Iscon Ambli'
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.8 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        footer, h3, p, a, input, button, span {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="relative bg-white text-gray-900">
        <div className="w-full h-1 bg-gradient-to-r from-blue-800 to-red-600" />

        <div className="relative z-10">
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Logo + Description */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-3xl font-extrabold text-blue-800">
                    RAMA <span className="text-red-600">REALTY</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed text-base">
                  Your trusted partner in finding the perfect home. Promises fulfilled through premium properties across Ahmedabad.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-8 text-gray-800 relative">
                  Quick Links
                  <div className="absolute bottom-[-8px] left-0 w-12 h-0.5 bg-gradient-to-r from-blue-800 to-red-600 rounded-full" />
                </h3>
                <div className="space-y-4">
                  {quickLinks.map((link) => (
                    <motion.a
                      key={link}
                      href="#"
                      className="block text-base text-gray-600 hover:text-blue-800 transition-all duration-200 group font-medium"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Popular Locations */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-8 text-gray-800 relative">
                  Popular Locations
                  <div className="absolute bottom-[-8px] left-0 w-12 h-0.5 bg-gradient-to-r from-blue-800 to-red-600 rounded-full" />
                </h3>
                <div className="space-y-4">
                  {locations.map((location) => (
                    <motion.a
                      key={location}
                      href="#"
                      className="block text-base text-gray-600 hover:text-blue-800 transition-all duration-200 group font-medium"
                      whileHover={{ x: 5 }}
                    >
                      {location}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Stay Connected */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-8 text-gray-800 relative">
                  Stay Connected
                  <div className="absolute bottom-[-8px] left-0 w-12 h-0.5 bg-gradient-to-r from-blue-800 to-red-600 rounded-full" />
                </h3>
                <p className="text-gray-600 mb-6 text-base">
                  Get the latest property updates and exclusive deals.
                </p>
                <div className="relative mb-8">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-100 border-gray-200 focus:border-blue-800 focus:ring-blue-800 pr-12 h-12 rounded-lg text-base"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-800 hover:bg-blue-900 text-white w-9 h-9 rounded-md"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex space-x-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gray-100 hover:bg-blue-800 rounded-lg flex items-center justify-center transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
              className="border-t border-gray-200 mt-20 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <p className="text-gray-500 text-base">
                  © 2025 Rama Realty. Promises Fulfilled.
                </p>
                <div className="flex items-center space-x-6 text-base text-gray-500 font-medium">
                  <a href="#" className="hover:text-gray-800">Privacy Policy</a>
                  <a href="#" className="hover:text-gray-800">Terms of Service</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default RamaRealtyFooter;

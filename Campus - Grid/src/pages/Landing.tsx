import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A5F] via-[#2D6A9F] to-[#1D9E75] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1E3A5F] to-[#1D9E75]">
                Campus Grid
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-[#2D6A9F] transition-colors">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2D6A9F]/20 blur-[100px]" />
          <div className="absolute top-40 -left-20 w-[400px] h-[400px] rounded-full bg-[#1D9E75]/20 blur-[100px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8">
              The Unified <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A5F] via-[#2D6A9F] to-[#1D9E75]">
                Smart Campus
              </span> Platform
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10">
              Seamlessly connect students, faculty, and administrators with a modern, role-based management system designed for the future of education.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] hover:shadow-xl hover:shadow-[#2D6A9F]/30 transition-all group">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white dark:bg-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-[#1E3A5F] dark:text-[#4A8BDB]" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <p className="text-gray-600 dark:text-gray-400">Track attendance, submit assignments, view results, and access study materials all in one place.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2D6A9F]/10 dark:bg-[#2D6A9F]/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#2D6A9F] dark:text-[#5BA4E5]" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Faculty</h3>
              <p className="text-gray-600 dark:text-gray-400">Manage classes, grade assignments, upload notes, and monitor student performance effortlessly.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1D9E75]/10 dark:bg-[#1D9E75]/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#1D9E75] dark:text-[#34D399]" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Administrators</h3>
              <p className="text-gray-600 dark:text-gray-400">Oversee the entire campus, manage users, publish notices, and analyze institutional data.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Edit, Trash2, Bell, Calendar } from 'lucide-react';

export default function AdminNotices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Academic', 'Events', 'Administrative', 'Examination'];

  const notices = [
    { id: 1, title: 'Mid-Semester Examination Schedule', category: 'Examination', date: 'Oct 15, 2023', status: 'Published' },
    { id: 2, title: 'Annual Tech Symposium 2023', category: 'Events', date: 'Oct 12, 2023', status: 'Published' },
    { id: 3, title: 'Library Timings Update', category: 'Administrative', date: 'Oct 10, 2023', status: 'Draft' },
    { id: 4, title: 'Guest Lecture on AI', category: 'Academic', date: 'Oct 08, 2023', status: 'Published' },
  ];

  const filteredNotices = notices.filter(n => 
    (activeCategory === 'All' || n.category === activeCategory) &&
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notice Board Management</h2>
        
        <button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Notice
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice, i) => (
                  <motion.tr 
                    key={notice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[#2D6A9F]">
                        <Bell className="w-4 h-4" />
                      </div>
                      {notice.title}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                        {notice.category}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {notice.date}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        notice.status === 'Published' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#2D6A9F] hover:bg-[#2D6A9F]/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No notices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

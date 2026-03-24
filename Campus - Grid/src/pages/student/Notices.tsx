import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Calendar, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';

export default function StudentNotices() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const notices = [
    { 
      id: 1, 
      title: 'Mid-Term Examination Schedule Released', 
      date: '2026-03-24', 
      category: 'Academic',
      isNew: true,
      content: 'The mid-term examination schedule for all semesters has been released. Please check the department notice board or download the PDF attached below. Exams will commence from April 10th, 2026. Ensure you have cleared all dues before collecting your hall tickets.'
    },
    { 
      id: 2, 
      title: 'Tech Fest "Innovate 2026" Registration Open', 
      date: '2026-03-22', 
      category: 'Events',
      isNew: true,
      content: 'Registrations for the annual tech fest "Innovate 2026" are now open. Students can participate in various events including Hackathons, Robotics, Paper Presentations, and Coding Challenges. Visit the official website to register your team. Last date for registration is April 5th.'
    },
    { 
      id: 3, 
      title: 'Holiday on Friday due to State Festival', 
      date: '2026-03-20', 
      category: 'General',
      isNew: false,
      content: 'This is to inform all students and faculty that the college will remain closed on Friday, March 27th, 2026, on account of the State Festival. Regular classes will resume from Monday, March 30th.'
    },
    { 
      id: 4, 
      title: 'Campus Placement Drive - TechCorp', 
      date: '2026-03-18', 
      category: 'Placement',
      isNew: false,
      content: 'TechCorp will be conducting a campus placement drive for final year students on April 15th. Eligible branches: CS, IS, EC. Minimum CGPA required: 7.5. Interested students must register with the placement cell by April 1st.'
    },
    { 
      id: 5, 
      title: 'Library Book Return Deadline', 
      date: '2026-03-15', 
      category: 'Academic',
      isNew: false,
      content: 'All students are requested to return or renew their library books before the end of the month to avoid late fees. The library will be open during regular hours.'
    },
  ];

  const categories = ['All', 'Academic', 'Events', 'General', 'Placement'];

  const filteredNotices = notices.filter(notice => {
    const matchesFilter = filter === 'All' || notice.category === filter;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notice Board</h2>
      </div>

      {/* Filters and Search */}
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Filter className="w-5 h-5 text-gray-400 shrink-0 mr-1" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border transition-all overflow-hidden ${
                notice.isNew ? 'border-[#2D6A9F]/30 dark:border-[#2D6A9F]/50 ring-1 ring-[#2D6A9F]/10' : 'border-gray-100 dark:border-gray-700'
              }`}
            >
              <div 
                className="p-5 cursor-pointer flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
              >
                <div className="mt-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notice.isNew ? 'bg-[#2D6A9F]/10 text-[#2D6A9F] dark:bg-[#2D6A9F]/20 dark:text-[#5BA4E5]' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    <Bell className="w-5 h-5" />
                  </div>
                  {notice.isNew && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-gray-800"></span>
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h3 className={`text-base font-bold truncate ${notice.isNew ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                      {notice.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 shrink-0">
                      {notice.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {new Date(notice.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="shrink-0 ml-4">
                  {expandedId === notice.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Expanded Content */}
              {expandedId === notice.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
                >
                  <div className="pl-14">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {notice.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No notices found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

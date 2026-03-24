import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, PlayCircle, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function StudentMockTests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Available');

  const tests = [
    { id: 1, title: 'Mid-Term Mock 1', subject: 'Maths', duration: '60 mins', questions: 30, status: 'Available', date: 'Oct 20, 2023', score: '-' },
    { id: 2, title: 'Data Structures Quiz', subject: 'CS', duration: '30 mins', questions: 15, status: 'Available', date: 'Oct 22, 2023', score: '-' },
    { id: 3, title: 'Physics Unit Test', subject: 'Physics', duration: '45 mins', questions: 25, status: 'Completed', date: 'Oct 10, 2023', score: '22/25' },
    { id: 4, title: 'Chemistry Basics', subject: 'Chemistry', duration: '30 mins', questions: 20, status: 'Completed', date: 'Oct 05, 2023', score: '18/20' },
  ];

  const filteredTests = tests.filter(t => 
    (activeTab === 'All' || t.status === activeTab) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mock Tests</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl shrink-0 overflow-x-auto hide-scrollbar">
          {['All', 'Available', 'Completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tests, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.length > 0 ? (
          filteredTests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getStatusIcon(test.status)}
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  test.status === 'Available' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  {test.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{test.title}</h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Subject:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{test.subject}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {test.duration}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Questions:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{test.questions}</span>
                </p>
                {test.status === 'Completed' && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                    <span>Score:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{test.score}</span>
                  </p>
                )}
              </div>
              
              <button 
                className={`w-full flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  test.status === 'Available'
                    ? 'bg-[#2D6A9F] text-white hover:bg-[#1E3A5F] shadow-md shadow-[#2D6A9F]/20'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {test.status === 'Available' ? 'Start Test' : 'View Results'}
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
            <PlayCircle className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">No tests found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

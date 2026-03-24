import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Edit, Trash2, Users, Clock, CheckCircle } from 'lucide-react';

export default function FacultyMockTests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tests = [
    { id: 1, title: 'Mid-Term Mock 1', subject: 'Maths', duration: '60 mins', questions: 30, status: 'Active', date: 'Oct 20, 2023', attempts: 45 },
    { id: 2, title: 'Data Structures Quiz', subject: 'CS', duration: '30 mins', questions: 15, status: 'Active', date: 'Oct 22, 2023', attempts: 12 },
    { id: 3, title: 'Physics Unit Test', subject: 'Physics', duration: '45 mins', questions: 25, status: 'Completed', date: 'Oct 10, 2023', attempts: 58 },
    { id: 4, title: 'Chemistry Basics', subject: 'Chemistry', duration: '30 mins', questions: 20, status: 'Completed', date: 'Oct 05, 2023', attempts: 60 },
  ];

  const filteredTests = tests.filter(t => 
    (activeTab === 'All' || t.status === activeTab) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mock Test Management</h2>
        
        <button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Test
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl shrink-0 overflow-x-auto hide-scrollbar">
          {['All', 'Active', 'Completed', 'Drafts'].map(tab => (
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

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Test Details</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Stats</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredTests.length > 0 ? (
                filteredTests.map((test, i) => (
                  <motion.tr 
                    key={test.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white">{test.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {test.duration} • {test.questions} Qs
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                        {test.subject}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4" /> {test.attempts} attempts
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        test.status === 'Active' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {test.status}
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
                    No tests found matching your criteria.
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

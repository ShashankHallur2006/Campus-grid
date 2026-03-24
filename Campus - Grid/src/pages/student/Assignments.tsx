import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Upload, CheckCircle, FileText, AlertCircle } from 'lucide-react';

export default function StudentAssignments() {
  const [activeTab, setActiveTab] = useState('pending');

  const assignments = [
    { id: 1, title: 'Data Structures Lab 4', subject: 'Data Structures', faculty: 'Mahesh Bannur', deadline: '2026-03-25T23:59:00', status: 'pending' },
    { id: 2, title: 'Maths Assignment 2', subject: 'Mathematics IV', faculty: 'VS Patil', deadline: '2026-03-28T10:00:00', status: 'pending' },
    { id: 3, title: 'OS Case Study', subject: 'Operating Systems', faculty: 'Girish', deadline: '2026-03-20T23:59:00', status: 'submitted', submittedAt: '2026-03-19T14:30:00' },
    { id: 4, title: 'Network Topology Report', subject: 'Computer Networks', faculty: 'Vinayak', deadline: '2026-03-15T23:59:00', status: 'late', submittedAt: '2026-03-16T09:15:00' },
  ];

  const filteredAssignments = assignments.filter(a => a.status === activeTab || (activeTab === 'submitted' && a.status === 'late'));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h2>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'pending' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('submitted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'submitted' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Submitted
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#2D6A9F]/10 dark:bg-[#2D6A9F]/20 rounded-2xl">
                <FileText className="w-6 h-6 text-[#2D6A9F] dark:text-[#5BA4E5]" />
              </div>
              {assignment.status === 'pending' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  Pending
                </span>
              )}
              {assignment.status === 'submitted' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Submitted
                </span>
              )}
              {assignment.status === 'late' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  Late Submission
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{assignment.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{assignment.subject} • {assignment.faculty}</p>

            <div className="mt-auto space-y-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                Deadline: {new Date(assignment.deadline).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {new Date(assignment.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              {assignment.status === 'pending' ? (
                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Submission
                </button>
              ) : (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-start gap-3 border border-gray-100 dark:border-gray-600">
                  {assignment.status === 'submitted' ? (
                    <CheckCircle className="w-5 h-5 text-[#1D9E75] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">
                      Submitted on
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {new Date(assignment.submittedAt!).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

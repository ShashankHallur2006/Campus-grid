import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, BookOpen, Calendar, Users, FileText, Download, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyAssignments() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const assignments = [
    { id: 1, title: 'Data Structures Lab 4', subject: 'Data Structures', class: '2nd Year Sem 3', deadline: '2026-03-25T23:59:00', status: 'active', submissions: 45, total: 60 },
    { id: 2, title: 'Maths Assignment 2', subject: 'Mathematics IV', class: '2nd Year Sem 4', deadline: '2026-03-28T10:00:00', status: 'active', submissions: 12, total: 55 },
    { id: 3, title: 'OS Case Study', subject: 'Operating Systems', class: '3rd Year Sem 5', deadline: '2026-03-20T23:59:00', status: 'past', submissions: 58, total: 60 },
  ];

  const filteredAssignments = assignments.filter(a => a.status === activeTab);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Assignment created successfully');
    setShowCreate(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Assignments</h2>
        
        <div className="flex gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'active' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'past' 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Past
            </button>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </button>
        </div>
      </div>

      {showCreate && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Create Assignment</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input type="text" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all">
                  <option>Mathematics IV</option>
                  <option>Data Structures</option>
                  <option>Operating Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Class</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all">
                  <option>1st Year Sem 1 (C-Cycle)</option>
                  <option>2nd Year Sem 3</option>
                  <option>3rd Year Sem 5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
                <input type="datetime-local" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all">Publish Assignment</button>
            </div>
          </form>
        </motion.div>
      )}

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
              <div className="p-3 bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20 rounded-2xl">
                <BookOpen className="w-6 h-6 text-[#1E3A5F] dark:text-[#4A8BDB]" />
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                assignment.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {assignment.status === 'active' ? 'Active' : 'Closed'}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{assignment.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{assignment.subject}</p>

            <div className="mt-auto space-y-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                {assignment.class}
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                Due: {new Date(assignment.deadline).toLocaleDateString()}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Submissions</span>
                  <span className="text-sm font-bold text-[#2D6A9F] dark:text-[#5BA4E5]">{assignment.submissions} / {assignment.total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#2D6A9F] dark:bg-[#5BA4E5] h-2 rounded-full" 
                    style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FileText className="w-4 h-4 mr-2" />
                View Submissions
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

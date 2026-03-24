import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';
import { Users, BookOpen, FileText, CheckSquare } from 'lucide-react';

export default function FacultyDashboard() {
  const { userData } = useAuth();
  
  // Mock data for dashboard
  const stats = [
    { name: 'Total Students', value: '120', icon: Users, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20' },
    { name: 'Pending Reviews', value: '15', icon: BookOpen, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
    { name: 'Results Entered', value: '4', icon: FileText, color: 'text-[#1D9E75]', bg: 'bg-[#1D9E75]/10 dark:bg-[#1D9E75]/20' },
    { name: 'Today\'s Classes', value: '3', icon: CheckSquare, color: 'text-[#2D6A9F]', bg: 'bg-[#2D6A9F]/10 dark:bg-[#2D6A9F]/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, Prof. {userData?.name?.split(' ')[0] || 'Faculty'}! 👋
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', subject: 'Mathematics IV', class: '2nd Year Sem 4', room: 'Room 301' },
              { time: '11:00 AM', subject: 'Physics', class: '1st Year Sem 2', room: 'Lab 2' },
              { time: '02:00 PM', subject: 'Electronics', class: '3rd Year Sem 5', room: 'Room 304' },
            ].map((cls, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="w-16 text-center shrink-0">
                  <span className="text-xs font-bold text-[#2D6A9F] dark:text-[#5BA4E5]">{cls.time}</span>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-600"></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{cls.subject}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cls.class} • {cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pending Tasks</h3>
          <div className="space-y-4">
            {[
              { title: 'Grade Assignment 3', subject: 'Mathematics IV', due: 'Today' },
              { title: 'Upload Notes for Unit 2', subject: 'Physics', due: 'Tomorrow' },
              { title: 'Enter Internal Marks', subject: 'Electronics', due: 'In 3 days' },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-[#1E3A5F] dark:text-[#4A8BDB]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{task.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{task.subject} • Due: {task.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

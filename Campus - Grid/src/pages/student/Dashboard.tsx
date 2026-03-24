import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';
import { CheckSquare, BookOpen, FileText, Bell, AlertTriangle } from 'lucide-react';

export default function StudentDashboard() {
  const { userData } = useAuth();
  
  // Mock data for dashboard
  const stats = [
    { name: 'Attendance', value: '72%', icon: CheckSquare, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
    { name: 'Pending Assignments', value: '3', icon: BookOpen, color: 'text-[#2D6A9F]', bg: 'bg-[#2D6A9F]/10 dark:bg-[#2D6A9F]/20' },
    { name: 'Upcoming Tests', value: '2', icon: FileText, color: 'text-[#1D9E75]', bg: 'bg-[#1D9E75]/10 dark:bg-[#1D9E75]/20' },
    { name: 'New Notices', value: '5', icon: Bell, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {userData?.name?.split(' ')[0] || 'Student'}! 👋
        </h2>
      </div>

      {/* Warning Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-start gap-4"
      >
        <div className="p-2 bg-red-100 dark:bg-red-800/50 rounded-full shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-800 dark:text-red-300">Low Attendance Warning</h3>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            Your overall attendance is below 75%. Please attend classes regularly to avoid penalties.
          </p>
        </div>
      </motion.div>

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

      {/* Recent Activity & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', subject: 'Mathematics IV', faculty: 'VS Patil', room: 'Room 301' },
              { time: '11:00 AM', subject: 'Data Structures', faculty: 'Mahesh Bannur', room: 'Lab 2' },
              { time: '02:00 PM', subject: 'Computer Networks', faculty: 'Vinayak', room: 'Room 304' },
            ].map((cls, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="w-16 text-center shrink-0">
                  <span className="text-xs font-bold text-[#2D6A9F] dark:text-[#5BA4E5]">{cls.time}</span>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-600"></div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{cls.subject}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cls.faculty} • {cls.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Latest Notices</h3>
          <div className="space-y-4">
            {[
              { title: 'Mid-Term Examination Schedule', date: 'Oct 15, 2025', isNew: true },
              { title: 'Tech Fest Registration Open', date: 'Oct 12, 2025', isNew: true },
              { title: 'Holiday on Friday', date: 'Oct 10, 2025', isNew: false },
            ].map((notice, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notice.isNew ? 'bg-[#1D9E75]' : 'bg-transparent'}`} />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{notice.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

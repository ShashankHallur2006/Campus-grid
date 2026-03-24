import React from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, Users, BookOpen, AlertCircle } from 'lucide-react';

export default function FacultyInsights() {
  const performanceData = [
    { name: 'Test 1', avg: 65, highest: 95, lowest: 30 },
    { name: 'Test 2', avg: 72, highest: 98, lowest: 45 },
    { name: 'Mid-Term', avg: 68, highest: 96, lowest: 40 },
    { name: 'Test 3', avg: 78, highest: 100, lowest: 55 },
    { name: 'Mock Final', avg: 82, highest: 99, lowest: 60 },
  ];

  const attendanceData = [
    { name: 'Week 1', attendance: 95 },
    { name: 'Week 2', attendance: 92 },
    { name: 'Week 3', attendance: 88 },
    { name: 'Week 4', attendance: 85 },
    { name: 'Week 5', attendance: 90 },
    { name: 'Week 6', attendance: 82 },
  ];

  const weakStudents = [
    { id: 1, name: 'Akash C', attendance: '65%', avgScore: '45%', status: 'Critical' },
    { id: 2, name: 'Darshan H', attendance: '72%', avgScore: '52%', status: 'Warning' },
    { id: 3, name: 'Karthik J', attendance: '85%', avgScore: '48%', status: 'Warning' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Insights</h2>
        
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2D6A9F]">
            <option>CS - 5th Sem - Data Structures</option>
            <option>IS - 3rd Sem - Algorithms</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Class Average', value: '76%', icon: TrendingUp, color: 'text-[#1D9E75]', bg: 'bg-[#1D9E75]/10' },
          { title: 'Total Students', value: '65', icon: Users, color: 'text-[#2D6A9F]', bg: 'bg-[#2D6A9F]/10' },
          { title: 'Syllabus Covered', value: '80%', icon: BookOpen, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10' },
          { title: 'Students at Risk', value: '3', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="highest" name="Highest" stroke="#1D9E75" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="avg" name="Average" stroke="#2D6A9F" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="lowest" name="Lowest" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Attendance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="attendance" name="Attendance %" fill="#1E3A5F" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Students Requiring Attention</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-4 font-medium">Student Name</th>
                  <th className="p-4 font-medium">Attendance</th>
                  <th className="p-4 font-medium">Avg Score</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {weakStudents.map((student, i) => (
                  <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{student.name}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{student.attendance}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{student.avgScore}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                        student.status === 'Critical' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-sm font-medium text-[#2D6A9F] hover:text-[#1E3A5F] dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        Message Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

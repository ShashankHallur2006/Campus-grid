import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, UserPlus, MoreVertical, Edit, Trash2 } from 'lucide-react';

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('student');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 1, name: 'Akash C', email: 'akash@example.com', role: 'student', department: 'CS', year: '1st Year' },
    { id: 2, name: 'Darshan H', email: 'darshan@example.com', role: 'student', department: 'CS', year: '1st Year' },
    { id: 3, name: 'Karthik J', email: 'karthik@example.com', role: 'student', department: 'IS', year: '1st Year' },
    { id: 4, name: 'VS Patil', email: 'vspatil@example.com', role: 'faculty', department: 'Maths', year: '-' },
    { id: 5, name: 'Mahesh Bannur', email: 'mahesh@example.com', role: 'faculty', department: 'CS', year: '-' },
  ];

  const filteredUsers = users.filter(u => 
    u.role === activeTab && 
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
        
        <button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'student' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'faculty' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Faculty
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'admin' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Admins
          </button>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
        
        <button className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shrink-0">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Department</th>
                {activeTab === 'student' && <th className="p-4 font-medium">Year</th>}
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#1D9E75] flex items-center justify-center text-white text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{user.department}</td>
                    {activeTab === 'student' && <td className="p-4 text-gray-500 dark:text-gray-400">{user.year}</td>}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#2D6A9F] hover:bg-[#2D6A9F]/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No users found matching your criteria.
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

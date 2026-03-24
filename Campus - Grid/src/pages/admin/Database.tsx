import React from 'react';
import { motion } from 'motion/react';
import { Database, HardDrive, Server, Shield, Activity, RefreshCw } from 'lucide-react';

export default function AdminDatabase() {
  const dbStats = [
    { name: 'Total Size', value: '1.2 GB', icon: HardDrive, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10' },
    { name: 'Documents', value: '14,582', icon: Database, color: 'text-[#2D6A9F]', bg: 'bg-[#2D6A9F]/10' },
    { name: 'Collections', value: '12', icon: Server, color: 'text-[#1D9E75]', bg: 'bg-[#1D9E75]/10' },
    { name: 'Health', value: 'Healthy', icon: Activity, color: 'text-green-500', bg: 'bg-green-100' },
  ];

  const collections = [
    { name: 'users', count: 1325, size: '45 MB', lastUpdated: '2 mins ago' },
    { name: 'attendance', count: 8450, size: '120 MB', lastUpdated: '5 mins ago' },
    { name: 'assignments', count: 450, size: '850 MB', lastUpdated: '1 hour ago' },
    { name: 'results', count: 3200, size: '65 MB', lastUpdated: '3 hours ago' },
    { name: 'notices', count: 125, size: '15 MB', lastUpdated: '1 day ago' },
    { name: 'complaints', count: 45, size: '5 MB', lastUpdated: '2 days ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Database Management</h2>
        
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Data
          </button>
          <button className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all">
            <Shield className="w-4 h-4 mr-2" />
            Backup Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dbStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Collections Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Collection Name</th>
                <th className="p-4 font-medium">Documents</th>
                <th className="p-4 font-medium">Size</th>
                <th className="p-4 font-medium">Last Updated</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {collections.map((col, i) => (
                <motion.tr 
                  key={col.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <Database className="w-4 h-4 text-gray-400" />
                    {col.name}
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{col.count.toLocaleString()}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{col.size}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{col.lastUpdated}</td>
                  <td className="p-4 text-center">
                    <button className="text-sm font-medium text-[#2D6A9F] hover:text-[#1E3A5F] dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                      View Data
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

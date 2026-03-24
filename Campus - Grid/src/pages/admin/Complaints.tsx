import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function AdminComplaints() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const complaints = [
    { id: 'C-101', title: 'Hostel Wifi Issue', category: 'Infrastructure', student: 'Akash C', date: 'Oct 15, 2023', status: 'Open', priority: 'High' },
    { id: 'C-102', title: 'Library Book Shortage', category: 'Academic', student: 'Darshan H', date: 'Oct 14, 2023', status: 'In Progress', priority: 'Medium' },
    { id: 'C-103', title: 'Canteen Food Quality', category: 'Facilities', student: 'Karthik J', date: 'Oct 12, 2023', status: 'Resolved', priority: 'High' },
    { id: 'C-104', title: 'Classroom AC Malfunction', category: 'Infrastructure', student: 'Kirna C', date: 'Oct 10, 2023', status: 'Resolved', priority: 'Low' },
  ];

  const filteredComplaints = complaints.filter(c => 
    (activeTab === 'All' || c.status === activeTab) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.student.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'In Progress': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback & Complaints</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl shrink-0 overflow-x-auto hide-scrollbar">
          {['All', 'Open', 'In Progress', 'Resolved'].map(tab => (
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
            placeholder="Search complaints..."
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
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Student</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint, i) => (
                  <motion.tr 
                    key={complaint.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 text-sm font-medium text-gray-500 dark:text-gray-400">{complaint.id}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white">{complaint.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{complaint.category}</div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300 text-sm">{complaint.student}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{complaint.date}</td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-sm font-medium text-[#2D6A9F] hover:text-[#1E3A5F] dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No complaints found matching your criteria.
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

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Edit, Trash2, FileText, Video, Link as LinkIcon, Upload } from 'lucide-react';

export default function FacultyNotes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  const subjects = ['All', 'Maths', 'Physics', 'CS', 'EC'];

  const notes = [
    { id: 1, title: 'Calculus Chapter 1-3', subject: 'Maths', type: 'PDF', size: '2.4 MB', date: 'Oct 15, 2023', downloads: 45 },
    { id: 2, title: 'Data Structures Arrays', subject: 'CS', type: 'Video', size: '145 MB', date: 'Oct 14, 2023', downloads: 112 },
    { id: 3, title: 'Quantum Mechanics Intro', subject: 'Physics', type: 'PDF', size: '4.1 MB', date: 'Oct 12, 2023', downloads: 30 },
    { id: 4, title: 'Digital Logic Gates', subject: 'EC', type: 'Link', size: '-', date: 'Oct 10, 2023', downloads: 85 },
  ];

  const filteredNotes = notes.filter(n => 
    (activeSubject === 'All' || n.subject === activeSubject) &&
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'Video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'Link': return <LinkIcon className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials Management</h2>
        
        <button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Material
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeSubject === subject
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">Material Details</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Stats</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note, i) => (
                  <motion.tr 
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0">
                        {getTypeIcon(note.type)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{note.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note.type} • {note.size}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium">
                        {note.subject}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {note.downloads} downloads
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                      {note.date}
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
                    No materials found matching your criteria.
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

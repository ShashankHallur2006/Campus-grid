import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Book, Download, FileText, Video, Link as LinkIcon } from 'lucide-react';

export default function StudentNotes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  const subjects = ['All', 'Maths', 'Physics', 'CS', 'EC'];

  const notes = [
    { id: 1, title: 'Calculus Chapter 1-3', subject: 'Maths', type: 'PDF', size: '2.4 MB', date: 'Oct 15, 2023', author: 'Prof. VS Patil' },
    { id: 2, title: 'Data Structures Arrays', subject: 'CS', type: 'Video', size: '145 MB', date: 'Oct 14, 2023', author: 'Prof. Mahesh' },
    { id: 3, title: 'Quantum Mechanics Intro', subject: 'Physics', type: 'PDF', size: '4.1 MB', date: 'Oct 12, 2023', author: 'Prof. Sharma' },
    { id: 4, title: 'Digital Logic Gates', subject: 'EC', type: 'Link', size: '-', date: 'Oct 10, 2023', author: 'Prof. Sarfaraz' },
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
      default: return <Book className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getTypeIcon(note.type)}
                </div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                  {note.subject}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{note.title}</h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Uploaded by:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{note.author}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Date:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{note.date}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>Size:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{note.size}</span>
                </p>
              </div>
              
              <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-700 text-[#2D6A9F] dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-[#2D6A9F] hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                <Download className="w-4 h-4 mr-2" />
                {note.type === 'Link' ? 'Open Link' : 'Download'}
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
            <Book className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">No study materials found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

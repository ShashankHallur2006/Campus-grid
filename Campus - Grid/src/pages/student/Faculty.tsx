import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Mail, Phone, MapPin, BookOpen } from 'lucide-react';

export default function StudentFaculty() {
  const [searchQuery, setSearchQuery] = useState('');

  const facultyList = [
    { id: 1, name: 'Prof. VS Patil', department: 'Science', subjects: ['Maths', 'Physics'], email: 'vspatil@campus.edu', phone: '+91 98765 43210', office: 'Room 302, Block A' },
    { id: 2, name: 'Prof. Mahesh Bannur', department: 'Computer Science', subjects: ['Data Structures'], email: 'mahesh@campus.edu', phone: '+91 98765 43211', office: 'Room 405, Block B' },
    { id: 3, name: 'Prof. Vinayak', department: 'Information Science', subjects: ['Computer Networks'], email: 'vinayak@campus.edu', phone: '+91 98765 43212', office: 'Room 210, Block C' },
    { id: 4, name: 'Prof. Girish', department: 'Computer Science', subjects: ['Operating Systems'], email: 'girish@campus.edu', phone: '+91 98765 43213', office: 'Room 412, Block B' },
    { id: 5, name: 'Prof. Sarfaraz', department: 'Electronics', subjects: ['Microcontrollers'], email: 'sarfaraz@campus.edu', phone: '+91 98765 43214', office: 'Room 105, Block D' },
  ];

  const filteredFaculty = facultyList.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Directory</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, department, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty, i) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E3A5F] to-[#2D6A9F] flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {faculty.name.charAt(5)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{faculty.name}</h3>
                  <p className="text-sm text-[#2D6A9F] dark:text-blue-400 font-medium">{faculty.department}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 block mb-1">Subjects</span>
                    <div className="flex flex-wrap gap-1">
                      {faculty.subjects.map(sub => (
                        <span key={sub} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">{sub}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                  <a href={`mailto:${faculty.email}`} className="hover:text-[#2D6A9F] transition-colors">{faculty.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>{faculty.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                  <span>{faculty.office}</span>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-700 text-[#2D6A9F] dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-[#2D6A9F] hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Message
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">No faculty found</p>
            <p className="text-sm mt-1">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

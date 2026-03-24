import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Loader2, FileSpreadsheet, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyResults() {
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('1st Year Sem 1 (C-Cycle)');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics IV');
  const [examType, setExamType] = useState('internal');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock students
  const [students, setStudents] = useState([
    { id: '1', name: 'Akash C', usn: '1RV21CS001', marks: 85 },
    { id: '2', name: 'Darshan H', usn: '1RV21CS002', marks: 92 },
    { id: '3', name: 'Karthik J', usn: '1RV21CS003', marks: 78 },
    { id: '4', name: 'Kirna C', usn: '1RV21CS004', marks: 88 },
    { id: '5', name: 'Pavan H', usn: '1RV21CS005', marks: 65 },
  ]);

  const handleMarksChange = (id: string, value: string) => {
    const marks = parseInt(value, 10);
    if (isNaN(marks) || marks < 0 || marks > 100) return;
    setStudents(students.map(s => s.id === id ? { ...s, marks } : s));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Results saved successfully');
    } catch (error) {
      toast.error('Failed to save results');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.usn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Result Entry</h2>
        
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1D9E75] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#1D9E75]/30 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Results
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
          >
            <option>1st Year Sem 1 (C-Cycle)</option>
            <option>1st Year Sem 2 (P-Cycle)</option>
            <option>2nd Year Sem 3</option>
            <option>2nd Year Sem 4</option>
            <option>3rd Year Sem 5</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
          >
            <option>Mathematics IV</option>
            <option>Physics</option>
            <option>Electronics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exam Type</label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
          >
            <option value="mock">Mock Test</option>
            <option value="internal">Internal Assessment</option>
            <option value="final">Final Examination</option>
          </select>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Bulk Entry Table
          </h3>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">USN</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium text-center">Marks (out of 100)</th>
                <th className="p-4 font-medium text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredStudents.map((student, i) => {
                let grade = 'F';
                if (student.marks >= 90) grade = 'O';
                else if (student.marks >= 80) grade = 'A+';
                else if (student.marks >= 70) grade = 'A';
                else if (student.marks >= 60) grade = 'B+';
                else if (student.marks >= 50) grade = 'B';
                else if (student.marks >= 40) grade = 'C';

                return (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-500 dark:text-gray-400">{student.usn}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{student.name}</td>
                    <td className="p-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-20 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-center text-gray-900 dark:text-white focus:ring-2 focus:ring-[#1D9E75] focus:border-transparent transition-all"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        grade === 'F' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {grade}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

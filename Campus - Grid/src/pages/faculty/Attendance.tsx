import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, CheckCircle, XCircle, Clock, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyAttendance() {
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('1st Year Sem 1 (C-Cycle)');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics IV');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock students
  const [students, setStudents] = useState([
    { id: '1', name: 'Akash C', usn: '1RV21CS001', status: 'present' },
    { id: '2', name: 'Darshan H', usn: '1RV21CS002', status: 'present' },
    { id: '3', name: 'Karthik J', usn: '1RV21CS003', status: 'absent' },
    { id: '4', name: 'Kirna C', usn: '1RV21CS004', status: 'late' },
    { id: '5', name: 'Pavan H', usn: '1RV21CS005', status: 'present' },
  ]);

  const handleStatusChange = (id: string, status: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const markAllPresent = () => {
    setStudents(students.map(s => ({ ...s, status: 'present' })));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Attendance submitted successfully');
    } catch (error) {
      toast.error('Failed to submit attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mark Attendance</h2>
        
        <div className="flex gap-2">
          <button
            onClick={markAllPresent}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D6A9F] text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-[#2D6A9F]/30 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Submit
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          >
            <option>Mathematics IV</option>
            <option>Physics</option>
            <option>Electronics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2D6A9F] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2D6A9F]" />
            Student List
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {students.filter(s => s.status === 'present').length} Present • {students.filter(s => s.status === 'absent').length} Absent
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                <th className="p-4 font-medium">USN</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {students.map((student, i) => (
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
                    {student.status === 'present' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Present
                      </span>
                    )}
                    {student.status === 'absent' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        Absent
                      </span>
                    )}
                    {student.status === 'late' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        Late
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={`p-2 rounded-full transition-colors ${
                          student.status === 'present' 
                            ? 'bg-[#1D9E75]/20 text-[#1D9E75] dark:bg-[#1D9E75]/30' 
                            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title="Mark Present"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className={`p-2 rounded-full transition-colors ${
                          student.status === 'absent' 
                            ? 'bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400' 
                            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title="Mark Absent"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={`p-2 rounded-full transition-colors ${
                          student.status === 'late' 
                            ? 'bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400' 
                            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title="Mark Late"
                      >
                        <Clock className="w-5 h-5" />
                      </button>
                    </div>
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

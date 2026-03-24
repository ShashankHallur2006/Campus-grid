import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function StudentAttendance() {
  const attendanceData = [
    { name: 'Present', value: 72, color: '#1D9E75' },
    { name: 'Absent', value: 28, color: '#EF4444' },
  ];

  const subjectAttendance = [
    { subject: 'Mathematics IV', total: 40, attended: 35, percentage: 87.5 },
    { subject: 'Data Structures', total: 35, attended: 25, percentage: 71.4 },
    { subject: 'Computer Networks', total: 38, attended: 30, percentage: 78.9 },
    { subject: 'Operating Systems', total: 42, attended: 28, percentage: 66.7 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
            Your overall attendance is 72%, which is below the required 75%. Please attend classes regularly to avoid penalties.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 w-full text-left">Overall Attendance</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">72%</span>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1D9E75]"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Absent</span>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Subject-wise Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-4 font-medium">Subject</th>
                  <th className="p-4 font-medium text-center">Total Classes</th>
                  <th className="p-4 font-medium text-center">Attended</th>
                  <th className="p-4 font-medium text-center">Percentage</th>
                  <th className="p-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {subjectAttendance.map((sub, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{sub.subject}</td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">{sub.total}</td>
                    <td className="p-4 text-center text-gray-600 dark:text-gray-400">{sub.attended}</td>
                    <td className="p-4 text-center">
                      <span className={`font-bold ${sub.percentage >= 75 ? 'text-[#1D9E75]' : 'text-red-500'}`}>
                        {sub.percentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {sub.percentage >= 75 ? (
                        <CheckCircle className="w-5 h-5 text-[#1D9E75] mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

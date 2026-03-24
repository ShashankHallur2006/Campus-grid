import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Award, TrendingUp, BookOpen, CheckCircle, XCircle } from 'lucide-react';

export default function StudentResults() {
  const [activeTab, setActiveTab] = useState('internal');

  const resultsData = {
    internal: [
      { subject: 'Mathematics IV', marks: 85, max: 100, grade: 'A' },
      { subject: 'Data Structures', marks: 92, max: 100, grade: 'O' },
      { subject: 'Computer Networks', marks: 78, max: 100, grade: 'B+' },
      { subject: 'Operating Systems', marks: 88, max: 100, grade: 'A' },
      { subject: 'Microcontrollers', marks: 65, max: 100, grade: 'B' },
    ],
    mock: [
      { subject: 'Mathematics IV', marks: 75, max: 100, grade: 'B+' },
      { subject: 'Data Structures', marks: 85, max: 100, grade: 'A' },
      { subject: 'Computer Networks', marks: 70, max: 100, grade: 'B' },
      { subject: 'Operating Systems', marks: 80, max: 100, grade: 'A' },
      { subject: 'Microcontrollers', marks: 60, max: 100, grade: 'C' },
    ],
    final: [
      { subject: 'Mathematics IV', marks: 90, max: 100, grade: 'O' },
      { subject: 'Data Structures', marks: 95, max: 100, grade: 'O' },
      { subject: 'Computer Networks', marks: 82, max: 100, grade: 'A' },
      { subject: 'Operating Systems', marks: 91, max: 100, grade: 'O' },
      { subject: 'Microcontrollers', marks: 75, max: 100, grade: 'B+' },
    ]
  };

  const currentData = resultsData[activeTab as keyof typeof resultsData];

  const radarData = currentData.map(item => ({
    subject: item.subject.split(' ')[0], // Shorten name for chart
    marks: item.marks,
    fullMark: item.max,
  }));

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'O': return 'bg-[#1D9E75]/10 text-[#1D9E75] dark:bg-[#1D9E75]/20 dark:text-[#34D399]';
      case 'A+': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'A': return 'bg-[#2D6A9F]/10 text-[#2D6A9F] dark:bg-[#2D6A9F]/20 dark:text-[#5BA4E5]';
      case 'B+': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'B': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'C': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'F': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Results</h2>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {['mock', 'internal', 'final'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 w-full text-left">Performance Overview</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#374151" opacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Marks"
                  dataKey="marks"
                  stroke="#2D6A9F"
                  fill="#2D6A9F"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#1E3A5F]/5 dark:bg-[#1E3A5F]/20 border border-[#1E3A5F]/10 dark:border-[#1E3A5F]/30">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#1E3A5F] dark:text-[#4A8BDB]" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Average</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(currentData.reduce((acc, curr) => acc + curr.marks, 0) / currentData.length).toFixed(1)}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#1D9E75]/5 dark:bg-[#1D9E75]/20 border border-[#1D9E75]/10 dark:border-[#1D9E75]/30">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#1D9E75] dark:text-[#34D399]" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Top Grade</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentData.reduce((prev, current) => (prev.marks > current.marks) ? prev : current).grade}
              </p>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">{activeTab} Examination Results</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-4 font-medium">Subject</th>
                  <th className="p-4 font-medium text-center">Marks Obtained</th>
                  <th className="p-4 font-medium text-center">Maximum Marks</th>
                  <th className="p-4 font-medium text-center">Grade</th>
                  <th className="p-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentData.map((sub, i) => (
                  <motion.tr 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </div>
                      {sub.subject}
                    </td>
                    <td className="p-4 text-center font-bold text-gray-900 dark:text-white">{sub.marks}</td>
                    <td className="p-4 text-center text-gray-500 dark:text-gray-400">{sub.max}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${getGradeColor(sub.grade)}`}>
                        {sub.grade}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {sub.marks >= 40 ? (
                        <CheckCircle className="w-5 h-5 text-[#1D9E75] mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'motion/react';
import { Users, GraduationCap, Bell, MessageSquare, Database, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { userData } = useAuth();
  const [seeding, setSeeding] = useState(false);
  
  // Mock data for dashboard
  const stats = [
    { name: 'Total Students', value: '1,240', icon: GraduationCap, color: 'text-[#1E3A5F]', bg: 'bg-[#1E3A5F]/10 dark:bg-[#1E3A5F]/20' },
    { name: 'Total Faculty', value: '85', icon: Users, color: 'text-[#2D6A9F]', bg: 'bg-[#2D6A9F]/10 dark:bg-[#2D6A9F]/20' },
    { name: 'Active Notices', value: '12', icon: Bell, color: 'text-[#1D9E75]', bg: 'bg-[#1D9E75]/10 dark:bg-[#1D9E75]/20' },
    { name: 'Open Complaints', value: '4', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
  ];

  const attendanceData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 88 },
    { name: 'Wed', value: 82 },
    { name: 'Thu', value: 90 },
    { name: 'Fri', value: 86 },
  ];

  const handleSeedData = async () => {
    if (!window.confirm('This will seed the database with mock users. Continue?')) return;
    
    setSeeding(true);
    try {
      const mockUsers = [
        // Students
        { id: 'student_akash', name: 'Akash C', email: 'akash@campus.edu', role: 'student', year: '1st Year', semester: '1', department: 'CS', usn: '1RV21CS001' },
        { id: 'student_darshan', name: 'Darshan H', email: 'darshan@campus.edu', role: 'student', year: '1st Year', semester: '1', department: 'CS', usn: '1RV21CS002' },
        { id: 'student_karthik', name: 'Karthik J', email: 'karthik@campus.edu', role: 'student', year: '1st Year', semester: '2', department: 'IS', usn: '1RV21IS001' },
        { id: 'student_kirna', name: 'Kirna C', email: 'kirna@campus.edu', role: 'student', year: '1st Year', semester: '2', department: 'EC', usn: '1RV21EC001' },
        { id: 'student_pavan', name: 'Pavan H', email: 'pavan@campus.edu', role: 'student', year: '2nd Year', semester: '3', department: 'CS', usn: '1RV20CS045' },
        { id: 'student_krishna', name: 'Krishna', email: 'krishna@campus.edu', role: 'student', year: '2nd Year', semester: '3', department: 'CS', usn: '1RV20CS046' },
        { id: 'student_aditya', name: 'Aditya F', email: 'aditya@campus.edu', role: 'student', year: '2nd Year', semester: '4', department: 'EC', usn: '1RV20EC023' },
        { id: 'student_justin', name: 'J. Justin', email: 'justin@campus.edu', role: 'student', year: '2nd Year', semester: '4', department: 'EC', usn: '1RV20EC024' },
        { id: 'student_sachin', name: 'Sachin R', email: 'sachin@campus.edu', role: 'student', year: '3rd Year', semester: '5', department: 'EE', usn: '1RV19EE012' },
        { id: 'student_sudeep', name: 'Sudeep J', email: 'sudeep@campus.edu', role: 'student', year: '3rd Year', semester: '5', department: 'EE', usn: '1RV19EE013' },
        // Faculty
        { id: 'faculty_vspatil', name: 'VS Patil', email: 'vspatil@campus.edu', role: 'faculty', subjects: ['Maths', 'Physics', 'EC'], department: 'Science' },
        { id: 'faculty_mahesh', name: 'Mahesh Bannur', email: 'mahesh@campus.edu', role: 'faculty', subjects: ['Data Structures'], department: 'CS' },
        { id: 'faculty_vinayak', name: 'Vinayak', email: 'vinayak@campus.edu', role: 'faculty', subjects: ['Computer Networks'], department: 'IS' },
        { id: 'faculty_girish', name: 'Girish', email: 'girish@campus.edu', role: 'faculty', subjects: ['Operating Systems'], department: 'CS' },
        { id: 'faculty_sarfaraz', name: 'Sarfaraz', email: 'sarfaraz@campus.edu', role: 'faculty', subjects: ['Microcontrollers'], department: 'EC' },
      ];

      for (const user of mockUsers) {
        await setDoc(doc(db, 'users', user.id), {
          ...user,
          joinedDate: new Date().toISOString()
        });
      }
      
      toast.success('Database seeded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {userData?.name?.split(' ')[0] || 'Admin'}! 👋
        </h2>
        
        <button
          onClick={handleSeedData}
          disabled={seeding}
          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-70"
        >
          {seeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
          Seed Mock Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Campus Attendance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A9F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2D6A9F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#2D6A9F" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { title: 'New Faculty Registered', desc: 'Prof. Sharma joined CS Dept', time: '2h ago' },
              { title: 'Notice Published', desc: 'Exam schedule updated', time: '5h ago' },
              { title: 'System Backup', desc: 'Automated backup completed', time: '1d ago' },
              { title: 'Complaint Resolved', desc: 'Hostel wifi issue fixed', time: '1d ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#1D9E75] shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.desc}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


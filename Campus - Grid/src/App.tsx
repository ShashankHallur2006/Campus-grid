/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import StudentAssignments from './pages/student/Assignments';
import StudentResults from './pages/student/Results';
import StudentNotices from './pages/student/Notices';
import StudentNotes from './pages/student/Notes';
import StudentMockTests from './pages/student/MockTests';
import StudentFeedback from './pages/student/Feedback';
import StudentFaculty from './pages/student/Faculty';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyAttendance from './pages/faculty/Attendance';
import FacultyAssignments from './pages/faculty/Assignments';
import FacultyResults from './pages/faculty/Results';
import FacultyMockTests from './pages/faculty/MockTests';
import FacultyNotes from './pages/faculty/Notes';
import FacultyInsights from './pages/faculty/Insights';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminNotices from './pages/admin/Notices';
import AdminAnalytics from './pages/admin/Analytics';
import AdminComplaints from './pages/admin/Complaints';
import AdminDatabase from './pages/admin/Database';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, userData, loading, isAuthReady } = useAuth();
  
  if (!isAuthReady || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (userData && !allowedRoles.includes(userData.role as string)) {
    return <Navigate to="/403" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/app" element={<Layout />}>
            <Route path="profile" element={<ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}><Profile /></ProtectedRoute>} />
            
            {/* Student Routes */}
            <Route path="student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
            <Route path="student/attendance" element={<ProtectedRoute allowedRoles={['student']}><StudentAttendance /></ProtectedRoute>} />
            <Route path="student/assignments" element={<ProtectedRoute allowedRoles={['student']}><StudentAssignments /></ProtectedRoute>} />
            <Route path="student/results" element={<ProtectedRoute allowedRoles={['student']}><StudentResults /></ProtectedRoute>} />
            <Route path="student/notices" element={<ProtectedRoute allowedRoles={['student']}><StudentNotices /></ProtectedRoute>} />
            <Route path="student/notes" element={<ProtectedRoute allowedRoles={['student']}><StudentNotes /></ProtectedRoute>} />
            <Route path="student/mock-tests" element={<ProtectedRoute allowedRoles={['student']}><StudentMockTests /></ProtectedRoute>} />
            <Route path="student/feedback" element={<ProtectedRoute allowedRoles={['student']}><StudentFeedback /></ProtectedRoute>} />
            <Route path="student/faculty-contact" element={<ProtectedRoute allowedRoles={['student']}><StudentFaculty /></ProtectedRoute>} />
            
            {/* Faculty Routes */}
            <Route path="faculty" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
            <Route path="faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyAttendance /></ProtectedRoute>} />
            <Route path="faculty/assignments" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyAssignments /></ProtectedRoute>} />
            <Route path="faculty/results" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyResults /></ProtectedRoute>} />
            <Route path="faculty/mock-tests" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyMockTests /></ProtectedRoute>} />
            <Route path="faculty/notes" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyNotes /></ProtectedRoute>} />
            <Route path="faculty/insights" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyInsights /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="admin/notices" element={<ProtectedRoute allowedRoles={['admin']}><AdminNotices /></ProtectedRoute>} />
            <Route path="admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
            <Route path="admin/feedback" element={<ProtectedRoute allowedRoles={['admin']}><AdminComplaints /></ProtectedRoute>} />
            <Route path="admin/data" element={<ProtectedRoute allowedRoles={['admin']}><AdminDatabase /></ProtectedRoute>} />
          </Route>
          
          <Route path="/403" element={<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"><h1 className="text-4xl font-bold text-red-500 mb-4">403 - Forbidden</h1><p className="text-gray-600 dark:text-gray-400 mb-8">You do not have permission to access this page.</p><a href="/" className="px-4 py-2 bg-primary text-white rounded-md">Go Home</a></div>} />
          <Route path="*" element={<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"><h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404 - Not Found</h1><a href="/" className="px-4 py-2 bg-primary text-white rounded-md">Go Home</a></div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

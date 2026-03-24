import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, BookOpen, CheckSquare, FileText, 
  MessageSquare, Bell, Users, BarChart3, Menu, X, GraduationCap, Settings
} from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import { cn } from '../../utils/cn';

export default function Layout() {
  const { userData } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = userData?.role || 'student';

  const navItems = {
    student: [
      { name: 'Dashboard', path: '/app/student', icon: LayoutDashboard },
      { name: 'Attendance', path: '/app/student/attendance', icon: CheckSquare },
      { name: 'Assignments', path: '/app/student/assignments', icon: BookOpen },
      { name: 'Results', path: '/app/student/results', icon: BarChart3 },
      { name: 'Notices', path: '/app/student/notices', icon: Bell },
      { name: 'Notes', path: '/app/student/notes', icon: FileText },
      { name: 'Mock Tests', path: '/app/student/mock-tests', icon: FileText },
      { name: 'Feedback', path: '/app/student/feedback', icon: MessageSquare },
      { name: 'Faculty Contact', path: '/app/student/faculty-contact', icon: Users },
    ],
    faculty: [
      { name: 'Dashboard', path: '/app/faculty', icon: LayoutDashboard },
      { name: 'Attendance', path: '/app/faculty/attendance', icon: CheckSquare },
      { name: 'Assignments', path: '/app/faculty/assignments', icon: BookOpen },
      { name: 'Results', path: '/app/faculty/results', icon: BarChart3 },
      { name: 'Mock Tests', path: '/app/faculty/mock-tests', icon: FileText },
      { name: 'Notes', path: '/app/faculty/notes', icon: FileText },
      { name: 'Class Insights', path: '/app/faculty/insights', icon: BarChart3 },
    ],
    admin: [
      { name: 'Dashboard', path: '/app/admin', icon: LayoutDashboard },
      { name: 'Users', path: '/app/admin/users', icon: Users },
      { name: 'Notices', path: '/app/admin/notices', icon: Bell },
      { name: 'Analytics', path: '/app/admin/analytics', icon: BarChart3 },
      { name: 'Feedback', path: '/app/admin/feedback', icon: MessageSquare },
      { name: 'Full Data Access', path: '/app/admin/data', icon: FileText },
    ]
  };

  const currentNavItems = navItems[role as keyof typeof navItems] || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#1D9E75] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1E3A5F] to-[#1D9E75]">
              Campus Grid
            </span>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4 px-3">
          <div className="space-y-1">
            {currentNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-[#2D6A9F]/10 text-[#2D6A9F] dark:text-[#5BA4E5]" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-[#2D6A9F] dark:text-[#5BA4E5]" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  )} />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-5 rounded-full bg-[#2D6A9F] dark:bg-[#5BA4E5]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ProfileMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

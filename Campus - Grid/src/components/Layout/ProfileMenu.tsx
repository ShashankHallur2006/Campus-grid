import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { User, Settings, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

export default function ProfileMenu() {
  const { userData } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = async () => {
    try {
      // Bypass auth logout
      // await signOut(auth);
      localStorage.removeItem('mockRole');
      window.dispatchEvent(new Event('mockRoleChanged'));
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const initials = userData?.name
    ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'U';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#1D9E75] flex items-center justify-center text-white font-medium text-sm shadow-sm">
          {userData?.photoURL ? (
            <img src={userData.photoURL} alt={userData.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {userData?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
              {userData?.role || 'Role'}
            </p>
          </div>
          <div className="py-1">
            <Link
              to="/app/profile"
              onClick={() => setIsOpen(false)}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              Edit Profile
            </Link>
            <button
              onClick={toggleDarkMode}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              ) : (
                <Moon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              )}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="mr-3 h-4 w-4 text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

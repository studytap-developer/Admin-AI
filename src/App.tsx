

import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { DashboardHome } from './components/DashboardHome';
import { UsersSection } from './components/UsersSection';
import SyllabusSection from './components/SyllabusSection';
import type { Screen } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      if (isLoggedIn) {
        setShowLogoutConfirm(true);
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setCurrentScreen('dashboard');
    window.history.pushState(null, '', window.location.href);  // Push on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setCurrentScreen('dashboard');
    setShowLogoutConfirm(false);
    window.history.pushState(null, '', window.location.href); // Reset state
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.history.pushState(null, '', window.location.href); // Push on each navigation
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'users':
        return <UsersSection />;
      case 'syllabus':
        return <SyllabusSection />;
      default:
        return <DashboardHome onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={handleLogout}
      />

      {/* Custom Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Confirm Logout</h2>
            <p className="text-gray-500 mb-6">
              Are you sure you want to logout? You will need to login again to access the dashboard.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-16">
          <div className="p-6">
            <nav className="space-y-2">
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Dashboard
              </button>
              <button
                onClick={() => handleNavigate('users')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'users'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Users
              </button>
              <button
                onClick={() => handleNavigate('syllabus')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  currentScreen === 'syllabus'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Syllabus
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1">{renderCurrentScreen()}</div>
      </div>
    </div>
  );
}

export default App;


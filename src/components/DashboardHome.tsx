
import React, { useEffect, useState } from 'react';
import { Users, BookOpen, ArrowRight, GraduationCap, FileText, TrendingUp } from 'lucide-react';
import type { Screen } from '../types';

interface DashboardHomeProps {
  onNavigate: (screen: Screen) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  is_subscribed: boolean;
}



export const DashboardHome: React.FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ai-chatbot-1-sgup.onrender.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch users:', error);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const activeSubscriptions = users.filter(user => user.is_subscribed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to StudyTap AI Dashboard</h1>
        <p className="text-xl text-gray-600">Manage your AI-powered educational platform efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Users</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">{loading ? 'Loading...' : totalUsers}</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">Active Subscriptions</p>
              <p className="text-3xl font-bold text-green-900 mt-1">{loading ? 'Loading...' : activeSubscriptions}</p>
              <p className="text-green-700 text-sm mt-1">Live</p>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Total Questions</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">15,632</p>
              <p className="text-purple-700 text-sm mt-1">+8% this week</p>
            </div>
            <FileText className="w-10 h-10 text-purple-600" />
          </div>
        </div> */}

        {/* <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide">PDF Documents</p>
              <p className="text-3xl font-bold text-orange-900 mt-1">4,521</p>
              <p className="text-orange-700 text-sm mt-1">Across all subjects</p>
            </div>
            <BookOpen className="w-10 h-10 text-orange-600" />
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <button
          onClick={() => onNavigate('users')}
          className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-left transform hover:scale-[1.02]"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">User Management</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Manage user accounts, view detailed statistics, monitor user activity, and track engagement across all universities and branches.
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-lg">
                <span>Manage Users</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('syllabus')}
          className="group bg-white rounded-3xl p-8 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 text-left transform hover:scale-[1.02]"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Syllabus Management</h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Access university syllabi, manage course content across branches, organize subjects, and upload PDF materials for AI training.
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-lg">
                <span>Manage Syllabus</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {[
              { action: 'New PDF uploaded', subject: 'Data Structures - CSE', time: '2 minutes ago', type: 'upload' },
              { action: 'User registered', user: 'Rajesh Kumar - OU', time: '15 minutes ago', type: 'user' },
              { action: 'Subject created', subject: 'Machine Learning - CSE', time: '1 hour ago', type: 'subject' },
              { action: 'Bulk PDF processing completed', subject: 'Database Systems - IT', time: '2 hours ago', type: 'process' }
            ].map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'user' ? 'bg-green-100 text-green-600' :
                      activity.type === 'subject' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'upload' && <FileText className="w-5 h-5" />}
                      {activity.type === 'user' && <Users className="w-5 h-5" />}
                      {activity.type === 'subject' && <BookOpen className="w-5 h-5" />}
                      {activity.type === 'process' && <TrendingUp className="w-5 h-5" />}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-gray-600 text-sm">{activity.subject || activity.user}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

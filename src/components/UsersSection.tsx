import React, { useState } from 'react';
import { User, Mail, Calendar, Activity, Filter, Download, Search, GraduationCap } from 'lucide-react';
import type { User as UserType } from '../types';

const mockUsers: UserType[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    university: 'OU',
    branch: 'Computer Science Engineering',
    totalQuestions: 1247,
    lastActive: '2 hours ago',
    status: 'active',
    joinedDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    university: 'JNTUH',
    branch: 'Information Technology',
    totalQuestions: 892,
    lastActive: '1 day ago',
    status: 'active',
    joinedDate: '2024-02-03'
  },
  {
    id: '3',
    name: 'Arjun Reddy',
    email: 'arjun.reddy@email.com',
    university: 'JNTUK',
    branch: 'Electronics & Communication',
    totalQuestions: 1456,
    lastActive: '3 days ago',
    status: 'inactive',
    joinedDate: '2023-12-20'
  },
  {
    id: '4',
    name: 'Sneha Patel',
    email: 'sneha.patel@email.com',
    university: 'OU',
    branch: 'Mechanical Engineering',
    totalQuestions: 678,
    lastActive: '5 hours ago',
    status: 'active',
    joinedDate: '2024-01-28'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    university: 'JNTUH',
    branch: 'Civil Engineering',
    totalQuestions: 934,
    lastActive: '12 hours ago',
    status: 'active',
    joinedDate: '2024-02-10'
  }
];

export const UsersSection: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.branch.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-xl text-gray-600">Monitor and manage user accounts across all universities</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
          <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-blue-900">{mockUsers.length}</p>
            </div>
            <User className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
       
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Questions</p>
              <p className="text-2xl font-bold text-purple-900">{mockUsers.reduce((sum, user) => sum + user.totalQuestions, 0).toLocaleString()}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Users ({filteredUsers.length})</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedUser?.id === user.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span className="font-medium">{user.university}</span>
                          <span>•</span>
                          <span>{user.branch}</span>
                        </div>
                        <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                          <span>{user.totalQuestions} questions</span>
                          <span>•</span>
                          <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">{user.lastActive}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-24">
            {selectedUser ? (
              <div>
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedUser.email}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <GraduationCap className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">University</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedUser.university}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <Filter className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">Branch</span>
                    </div>
                    <span className="font-semibold text-gray-900 text-right text-sm">{selectedUser.branch}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">Total Questions</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedUser.totalQuestions}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">Last Active</span>
                    </div>
                    <span className="font-semibold text-gray-900">{selectedUser.lastActive}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">Status</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedUser.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
                    View Full Profile
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-medium hover:bg-gray-200 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Select a user to view details</p>
                <p className="text-sm mt-2">Click on any user from the list to see their complete profile information</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};





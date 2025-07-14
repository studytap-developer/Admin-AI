

import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash2 , User, UserIcon} from 'lucide-react';
import type { User as UserType } from '../types';

// ✅ Define base URL for API
// const BASE_URL = 'http://localhost:8000';
// https://ai-chatbot-1-sgup.onrender.com

const BASE_URL = 'https://ai-chatbot-1-sgup.onrender.com';


export const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();

      const formatted = data.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phoneNumber: u.phone_number || 'N/A',
        totalQuestions: u.prompt_count,
        lastActive: 'Recently Active',
        status: u.is_subscribed === true || u.is_subscribed === 1 || u.is_subscribed === 'T'
          ? 'active'
          : 'inactive',
      }));

      setUsers(formatted);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await fetch(`${BASE_URL}/delete/${userId}`, { method: 'DELETE' });
      fetchUsers();
    }
  };

  const handleEditUser = (user: UserType) => {
    setEditingUser(user);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingUser) return;
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    await fetch(`${BASE_URL}/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editingUser.name,
        phone_number: editingUser.phoneNumber,
        is_subscribed: editingUser.status === 'active',  // converted back to boolean
      }),
    });

    setEditingUser(null);
    fetchUsers();
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-4 space-x-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name, email, or phone..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 text-gray-500">No users found.</div>
        ) : (
          filteredUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-bold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email} | {user.phoneNumber}</p>
                <p className="text-xs text-gray-400">Status: {user.status}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div> */}

<div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
  {loading ? (
    <div className="p-6 text-gray-500">Loading users...</div>
  ) : filteredUsers.length === 0 ? (
    <div className="p-6 text-gray-500">No users found.</div>
  ) : (
    filteredUsers.map(user => (
      <div key={user.id} className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          
          {/* ✅ User icon with blue background circle */}
          <div className="bg-blue-100 p-2 rounded-full">
            <UserIcon className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email} | {user.phoneNumber}</p>
            <p className="text-xs text-gray-400">Status: {user.status}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-800">
            <Edit size={20} />
          </button>
          <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    ))
  )}
</div>

      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h2 className="text-xl font-bold">Edit User</h2>
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleEditChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              name="phoneNumber"
              value={editingUser.phoneNumber}
              onChange={handleEditChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <select
              name="status"
              value={editingUser.status}
              onChange={handleEditChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

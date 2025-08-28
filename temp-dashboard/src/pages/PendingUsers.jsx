import React, { useState, useEffect } from 'react';
import { getPendingUsers, approveUser, rejectUser } from '../api/adminApi';

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingUserId, setUpdatingUserId] = useState(null);

  // Fetch pending users on component mount
  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getPendingUsers();
      
      if (response.code === 'SUCCESS') {
        setUsers(response.users);
      } else {
        setError(response.message || 'Failed to fetch pending users');
      }
    } catch (err) {
      console.error('Error fetching pending users:', err);
      setError('An error occurred while fetching pending users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      setUpdatingUserId(userId);
      const response = await approveUser(userId);
      
      if (response.code === 'SUCCESS') {
        // Update the user status in the local state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, status: 'approved' } : user
        ).filter(user => user._id !== userId)); // Remove from pending list
      } else {
        setError(response.message || 'Failed to approve user');
      }
    } catch (err) {
      console.error('Error approving user:', err);
      setError('An error occurred while approving the user');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleReject = async (userId) => {
    try {
      setUpdatingUserId(userId);
      const response = await rejectUser(userId);
      
      if (response.code === 'SUCCESS') {
        // Update the user status in the local state
        setUsers(users.map(user => 
          user._id === userId ? { ...user, status: 'rejected' } : user
        ).filter(user => user._id !== userId)); // Remove from pending list
      } else {
        setError(response.message || 'Failed to reject user');
      }
    } catch (err) {
      console.error('Error rejecting user:', err);
      setError('An error occurred while rejecting the user');
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Pending Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            List of users waiting for approval
          </p>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 mt-4">
          <div className="text-sm text-red-700">
            {error}
          </div>
        </div>
      )}
      
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="glassmorphism-card overflow-hidden md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date Registered
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-sm text-gray-500">
                        No pending users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleApprove(user._id)}
                            disabled={updatingUserId === user._id}
                            className="neumorphism-glass-button text-green-600 hover:text-green-900 mr-3 disabled:opacity-50 text-sm"
                          >
                            {updatingUserId === user._id ? 'Approving...' : '✅ Approve'}
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            disabled={updatingUserId === user._id}
                            className="neumorphism-glass-button text-red-600 hover:text-red-900 disabled:opacity-50 text-sm"
                          >
                            {updatingUserId === user._id ? 'Rejecting...' : '❌ Reject'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingUsers;
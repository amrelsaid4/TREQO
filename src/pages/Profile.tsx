import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Profile: React.FC = () => {
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Full Name
                </label>
                <p className="text-gray-800 font-medium">{user.name || 'Not provided'}</p>
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  Email Address
                </label>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">
                  User ID
                </label>
                <p className="text-gray-800 font-medium">{user.id}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Account Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Order History</h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">You haven't placed any orders yet.</p>
              <Link 
                to="/products" 
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
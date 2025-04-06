import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <p className="text-gray-800">{user.name}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <p className="text-gray-800">{user.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User ID
            </label>
            <p className="text-gray-800">{user.id}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
          <p className="text-gray-600">No orders yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckoutSuccess = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <CheckCircleIcon className="text-green-500 text-6xl mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Thank you for your order!
      </h2>
      <p className="text-gray-600 mb-8">
        Your order has been successfully placed. We'll send you a confirmation email with your order details.
      </p>
      <Link
        to="/products"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CheckoutSuccess; 
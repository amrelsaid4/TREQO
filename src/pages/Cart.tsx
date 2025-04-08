import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';
import { removeItem, updateQuantity, clearCart } from '../features/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  oldPrice?: number;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);

  // Memoized handlers for better performance
  const handleQuantityChange = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((id: number) => {
    dispatch(removeItem(id));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            <ArrowBackIcon className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({items.length} items)</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2"
            aria-label="Clear cart"
          >
            <DeleteIcon className="w-5 h-5" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {items.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-md"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <Link 
                      to={`/products/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-1 flex justify-center sm:justify-start items-center gap-4">
                      <span className="text-green-600 font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-12 text-center py-1 font-medium text-gray-900 border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-900">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-medium mt-6"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="block w-full text-center text-gray-600 hover:text-gray-900 transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);
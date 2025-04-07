import React from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-64 object-contain rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-red-500 ml-2 text-sm">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 fill-current ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-1">({product.rating.count} reviews)</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-gray-600 capitalize">{product.category}</p>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

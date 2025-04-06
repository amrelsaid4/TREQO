import React, { useState } from 'react';
import { motion } from 'framer-motion';

import product1 from '../assets/images/products/product1.jpg';
import product2 from '../assets/images/products/product2.jpg';
import product3 from '../assets/images/products/product3.jpg';
import product4 from '../assets/images/products/product4.jpg';
import product5 from '../assets/images/products/product5.jpg';
import product6 from '../assets/images/products/product6.jpg';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
};

const TopProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');

  const products: Record<string, Product[]> = {
    featured: [
      {
        id: 1,
        name: 'NUTRITIONES TEXTURE GO...',
        price: 19.12,
        originalPrice: 29.90,
        image: product1,
        category: 'clothing'
      },
      {
        id: 2,
        name: 'Lorem ipsum dolor sit...',
        price: 24.65,
        originalPrice: 29.90,
        image: product2,
        category: 'women'
      }
    ],
    bestsellers: [
      {
        id: 3,
        name: 'consectetur adipiscing...',
        price: 29.00,
        image: product3,
        category: 'accessories'
      },
      {
        id: 4,
        name: 'Seid cursus ante...',
        price: 28.10,
        originalPrice: 29.90,
        image: product4,
        category: 'clothing'
      }
    ],
    new: [
      {
        id: 5,
        name: 'Mauris sed sapien ac urna',
        price: 9.52,
        originalPrice: 11.00,
        image: product5,
        category: 'women',
        isNew: true
      },
      {
        id: 6,
        name: 'Aenean quis sem loculis',
        price: 11.90,
        image: product6,
        category: 'accessories',
        isNew: true
      }
    ]
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Top Products</h2>

       
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === 'featured' ? 'text-green-600 ' : 'text-gray-600'
            }`}
          >
            Featured Products
          </button>
          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === 'bestsellers' ? 'text-green-600 ' : 'text-gray-600'
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === 'new' ? 'text-green-600 ' : 'text-gray-600'
            }`}
          >
            New Arrivals
          </button>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {products[activeTab].map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 text-xs rounded-full uppercase tracking-wide">
                    New
                  </span>
                )}
                {/* Hover Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <button className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                    Quick View
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-base font-semibold truncate text-gray-800">{product.name}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-red-500 ml-2 text-sm">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Shop Now Button */}
        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopProducts;


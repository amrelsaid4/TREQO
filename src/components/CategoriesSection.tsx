import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";

interface CategoriesSectionProps {
  products: Product[];
  loading: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ products, loading }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // تصنيفات المنتجات مع تعييناتها الصحيحة
  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "women's clothing", name: "Women" },
    { id: "men's clothing", name: "Men" },
    { id: "electronics", name: "Electronics" },
    { id: "jewelery", name: "Accessories" }
  ];

  // تصفية المنتجات حسب الفئة المختارة
  const filteredProducts = products.filter(product => {
    if (activeCategory === "all") return true;
    if (activeCategory === "clothing") {
      return product.category === "men's clothing" || product.category === "women's clothing";
    }
    return product.category === activeCategory;
  });

  // حساب الخصم (يمكن استبداله ببيانات حقيقية من المنتج)
  const calculateDiscount = (price: number) => {
    const originalPrice = price + (price * 0.3); // افتراضي: زيادة 30% للسعر الأصلي
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* أزرار الفئات */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-[#6f9a37] text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f9a37]"></div>
          </div>
        ) : (
          <>
            {/* شبكة المنتجات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map(product => {
                const discount = product.price < 30 ? calculateDiscount(product.price) : 0;
                const originalPrice = discount > 0 
                  ? (product.price / (1 - discount / 100)).toFixed(2)
                  : null;

                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={product.image || '/placeholder-product.jpg'}
                        alt={product.title}
                        className="w-full h-48 object-contain p-4 bg-white"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-product.jpg';
                        }}
                      />
                      {discount > 0 && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-900 font-medium mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[#6f9a37] font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        {originalPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ${originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* زر عرض المزيد */}
            <div className="text-center mt-10">
              <Link
                to="/products"
                className="inline-block px-8 py-3 border border-[#6f9a37] text-[#6f9a37] font-medium rounded-lg hover:bg-[#6f9a37] hover:text-white transition-colors"
              >
                View More Products
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
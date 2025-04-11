import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./QuickViewModal"; 

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  isNew?: boolean;
}

const TopProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "featured" | "bestsellers" | "new"
  >("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const formattedProducts = data.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: Math.round(product.price * (1 + Math.random() * 0.3)),
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
          isNew: Math.random() > 0.5, 
        }));

        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categorizedProducts = {
    featured: products.slice(0, 4),
    bestsellers: products
      .slice(4, 8)
      .map((p) => ({ ...p, rating: { ...p.rating!, rate: 4.5 } })),
    new: products.filter((p) => p.isNew).slice(0, 4),
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        image: product.image || "/placeholder-product.jpg",
      })
    );
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Top Products</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === "featured"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            Featured Products
          </button>
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === "bestsellers"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            Best Sellers
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-2 font-medium focus:outline-none ${
              activeTab === "new"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            New Arrivals
          </button>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categorizedProducts[activeTab].map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                />
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 text-xs rounded-full uppercase tracking-wide">
                    New
                  </span>
                )}
                {/* Hover Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <button
                    onClick={() => handleQuickView(product)}
                    className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-base font-semibold truncate text-gray-800">
                  {product.title}
                </h3>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-red-500 ml-2 text-sm">
                        -
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 fill-current ${
                            i < Math.floor(product.rating.rate)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">
                      ({product.rating.count})
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Shop Now Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setShowQuickView(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default TopProducts;
function addToCart(arg0: {
  quantity: number; image: string; id: number; title: string; price: number; originalPrice?: number; description: string; category: string; rating?: {
    rate: number;
    count: number;
  }; isNew?: boolean;
}): any {
  throw new Error("Function not implemented.");
}

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}


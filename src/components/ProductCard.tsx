import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
  onSale?: boolean;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isNew = false,
  onSale = false,
  onAddToCart,
}) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group relative"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {onSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div
          className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-t from-[#6f9a37]/80 to-transparent transition-all duration-500 ease-in-out flex items-end justify-center pb-6"
          onClick={(e) => e.preventDefault()} 
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.();
            }}
            className="w-4/5 text-center transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out focus:outline-none"
          >
            <span className="inline-block text-sm font-semibold border-2 border-white px-4 py-2 text-white bg-transparent hover:bg-white hover:text-[#6f9a37] transition-all duration-300 rounded ">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-center line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex justify-center items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              {i < Math.round(product.rating.rate) ? (
                <StarIcon style={{ fontSize: 16 }} />
              ) : (
                <StarBorderIcon style={{ fontSize: 16 }} />
              )}
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-1">
            ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-lg font-bold text-green-700">
            ${product.price.toFixed(2)}
          </span>
          {onSale && (
            <span className="text-sm text-gray-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

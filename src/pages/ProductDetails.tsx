import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { fetchProduct, fetchProducts } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) return;
        const productId = parseInt(id, 10);
        const data = await fetchProduct(productId);
        setProduct(data);

        const all = await fetchProducts();
        const relatedProducts = all.filter(p => p.category === data.category && p.id !== productId);
        setRelated(relatedProducts.slice(0, 4));
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // إضافة المنتج إلى السلة مع تعيين quantity إلى 1
      dispatch(addToCart({ ...product, quantity: 1 }));
      navigate('/cart');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-auto object-contain rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.title}</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>
          <p className="text-3xl font-semibold text-green-600 mb-6">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 border-t"></div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {/* Divider */}
      <div className="my-16 border-t"></div>
    </div>
  );
};

export default ProductDetails;

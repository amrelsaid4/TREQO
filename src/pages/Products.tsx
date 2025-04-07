import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { Product } from '../types';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import 'swiper/swiper-bundle.css';
import SortIcon from '@mui/icons-material/Sort';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const category = searchParams.get('category');
        const products = category 
          ? await fetchProductsByCategory(category)
          : await fetchProducts();
        
        setProducts(products.map(p => ({
          ...p,
          rating: p.rating || { rate: 0, count: 0 }
        })));
        setSelectedCategory(category);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    result = result.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        case 'newest': return (b.id || 0) - (a.id || 0);
        default: return 0;
      }
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, priceRange, selectedCategory, sortBy]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ 
      ...product, 
      quantity: 1,
      image: product.image || '/placeholder-product.jpg'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {selectedCategory ? 
            `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 
            'All Products'}
        </h1>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6f9a37]"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 bg-white p-6 rounded-lg shadow-sm border`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button 
              onClick={() => setShowFilters(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Categories filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left p-2 rounded focus:outline-none ${!selectedCategory ? 'bg-[#6f9a37]/10 text-[#6f9a37]' : 'hover:bg-gray-100'}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded focus:outline-none ${selectedCategory === category ? 'bg-[#6f9a37]/10 text-[#6f9a37]' : 'hover:bg-gray-100'}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">${priceRange[0]}</span>
              <span className="text-gray-600">${priceRange[1]}</span>
            </div>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full focus:outline-none focus:ring-0"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
              setPriceRange([0, 1000]);
              setSortBy('featured');
            }}
            className="w-full py-2 text-[#6f9a37] border border-[#6f9a37] rounded-lg hover:bg-[#6f9a37]/10 transition-colors focus:outline-none"
          >
            Reset Filters
          </button>
        </div>

        {/* Main products area */}
        <div className="flex-1">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="text-gray-600">
              Showing {Math.min(indexOfFirstProduct + 1, filteredProducts.length)}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>

            <div className="flex items-center gap-4">
              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <SortIcon className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-0"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 focus:outline-none ${viewMode === 'grid' ? 'bg-[#6f9a37]/10 text-[#6f9a37]' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <GridViewIcon />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 focus:outline-none ${viewMode === 'list' ? 'bg-[#6f9a37]/10 text-[#6f9a37]' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <ViewListIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6f9a37]"></div>
            </div>
          )}

          {/* No products found */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                  setPriceRange([0, 1000]);
                }}
                className="px-4 py-2 bg-[#6f9a37] text-white rounded-lg hover:bg-[#5d8a2a] transition-colors focus:outline-none"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Grid view */}
          {!loading && filteredProducts.length > 0 && viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}

          {/* List view */}
          {!loading && filteredProducts.length > 0 && viewMode === 'list' && (
            <div className="space-y-6">
              {currentProducts.map(product => (
                <div key={product.id} className="flex flex-col sm:flex-row gap-6 p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={product.image || '/placeholder-product.jpg'}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          {i < Math.round(product.rating?.rate || 0) ? '★' : '☆'}
                        </span>
                      ))}
                      <span className="text-gray-600 ml-2">({product.rating?.count || 0})</span>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-[#6f9a37]">${product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-6 py-2 bg-[#6f9a37] text-white rounded-lg hover:bg-[#5d8a2a] transition-colors focus:outline-none"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronLeftIcon />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full focus:outline-none ${currentPage === page ? 'bg-[#6f9a37] text-white' : 'hover:bg-gray-100'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 focus:outline-none"
                >
                  <ChevronRightIcon />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
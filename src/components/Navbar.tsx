import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product } from '../types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const announcements = [
  { id: 1, text: "10% OFF on all products! Use code: SALE10", icon: <LocalOfferIcon className="w-4 h-4" /> },
  { id: 2, text: "Free shipping on orders over $500!", icon: <LocalOfferIcon className="w-4 h-4" /> },
  { id: 3, text: "New Summer Collection has arrived!", icon: <LocalOfferIcon className="w-4 h-4" /> }
];

type MenuItem = {
  [key: string]: string[] | { [key: string]: string[] } | null;
};

const menuItems: MenuItem = {
  Clothing: {
    Men: ['T-shirt', 'Jeans', 'Shorts'],
    Women: ['Western Wear', 'Ethnic Wear', 'Sportswear'],
    Girls: ['Dresses', 'Skirts', 'Jackets']
  },
  Accessories: ['Belts', 'Gloves', 'Scarves', 'Caps'],
  Watches: null,
  Backpacks: null,
  Blog: null
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { items } = useSelector((state: RootState) => state.cart);
  const cartItemsCount = items.length;
  
  const dummyProducts: Product[] = [
    {
      id: 1,
      title: "Summer T-Shirt",
      price: 29.99,
      description: "Comfortable cotton t-shirt",
      category: "Men",
      image: "/images/products/tshirt.jpg",
      rating: { rate: 4.5, count: 120 },
      featured: true
    },
    {
      id: 2,
      title: "Denim Jeans",
      price: 59.99,
      description: "Classic blue jeans",
      category: "Women",
      image: "/images/products/jeans.jpg",
      rating: { rate: 4.2, count: 85 },
      featured: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      const filteredProducts = dummyProducts.filter((product: Product) =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#6f9a37;] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden h-10">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                  index === currentAnnouncement
                    ? 'translate-x-0 opacity-100'
                    : index < currentAnnouncement
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  {announcement.icon}
                  <span>{announcement.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-[#6f9a37;]">
                TREQO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(menuItems).map(([key, subItems]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={`/${key.toLowerCase()}`}
                    className={`text-gray-700 hover:text-[#6f9a37;] py-8 ${
                      activeMenu === key ? 'text-[#6f9a37;]' : ''
                    }`}
                  >
                    {key}
                  </Link>
                  {subItems && activeMenu === key && key === 'Clothing' && (
                    <div className="absolute top-full left-0 bg-white shadow-lg py-6 w-[600px] z-50">
                      <div className="grid grid-cols-3 gap-4 px-4">
                        {Object.entries(subItems as Record<string, string[]>).map(([category, items]) => (
                          <div key={category} className="flex flex-col">
                            <h3 className="text-base font-bold text-gray-900 mb-2">
                              {category}
                            </h3>
                            <div className="space-y-2">
                              {items.map((item) => (
                                <Link
                                  key={item}
                                  to={`/${key.toLowerCase()}/${category.toLowerCase()}/${item.toLowerCase()}`}
                                  className="block text-sm text-gray-400 hover:text-[#6f9a37;]"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 px-4">
                        <img 
                          src="/src/assets/images/3-0_thumb.jpg" 
                          alt="Out Fit Fashion" 
                          className="w-full h-24 object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {subItems && activeMenu === key && key !== 'Clothing' && Array.isArray(subItems) && (
                    <div className="absolute top-full left-0 bg-white shadow-lg py-4 w-64 z-50">
                      {subItems.map((item: string) => (
                        <Link
                          key={item}
                          to={`/${key.toLowerCase()}/${item.toLowerCase()}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-[#6f9a37;]"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-transparent" onClick={() => setIsSearchOpen(false)} />
                  <div className="relative min-h-full">
                    <div className="bg-white shadow-xl transform transition-all">
                      <div className="max-w-7xl mx-auto">
                        {/* Search Input */}
                        <div className="relative bg-white border-b">
                          <div className="max-w-3xl mx-auto px-4 py-6">
                            <div className="relative flex items-center">
                              <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search product..."
                                className="w-full pl-16 pr-12 py-4 text-xl border-none bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6f9a37;] focus:bg-white transition-all"
                                autoFocus
                              />
                              <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-transparent hover:text-gray-600"
                              >
                                <CloseIcon className="text-2xl" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Search Results */}
                        <div className="max-w-3xl mx-auto px-4 py-8">
                          {searchQuery && (
                            <>
                              {searchResults.length > 0 ? (
                                <>
                                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                                    Search Results ({searchResults.length})
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {searchResults.map((product) => (
                                      <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="flex items-center p-4 rounded-lg hover:bg-gray-50 border border-gray-100 transition-all"
                                        onClick={() => setIsSearchOpen(false)}
                                      >
                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                          <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <div className="ml-6 flex-1">
                                          <h4 className="text-base font-medium text-gray-900 mb-1 line-clamp-1">
                                            {product.title}
                                          </h4>
                                          <p className="text-sm text-gray-500 mb-1">
                                            {product.category}
                                          </p>
                                          <p className="text-lg font-medium text-[#6f9a37;]">
                                            ${product.price}
                                          </p>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="text-center py-12">
                                  <div className="text-gray-400 mb-4">
                                    <SearchIcon style={{ fontSize: 48 }} />
                                  </div>
                                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No products found
                                  </h3>
                                  <p className="text-gray-500">
                                    Try checking your spelling or using different keywords
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:text-[#6f9a37;]"
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon />
              </button>
              <Link to="/account" className="p-2 text-black hover:text-[#6f9a37;]">
                <PersonOutlineIcon />
              </Link>
              <Link to="/cart" className="p-2 text-black hover:text-[#6f9a37;] relative">
                <ShoppingCartIcon />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#6f9a37;] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden p-2 hover:text-[#6f9a37;]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white ${
            isMenuOpen ? 'block' : 'hidden'
          } shadow-lg`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {Object.entries(menuItems).map(([key, subItems]) => (
              <div key={key} className="py-2">
                <div
                  className="flex items-center justify-between px-3 py-2 text-gray-700 hover:text-[#6f9a37;] cursor-pointer"
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                >
                  <span>{key}</span>
                  {subItems && (
                    <span className="transform transition-transform duration-200">
                      {activeMenu === key ? '−' : '+'}
                    </span>
                  )}
                </div>
                {subItems && activeMenu === key && (
                  <div className="pl-4">
                    {typeof subItems === 'object' && !Array.isArray(subItems) ? (
                      Object.entries(subItems).map(([category, items]) => (
                        <div key={category} className="py-2">
                          <div className="px-3 py-2 font-semibold text-gray-800">
                            {category}
                          </div>
                          {items.map((item: string) => (
                            <Link
                              key={item}
                              to={`/${key.toLowerCase()}/${category.toLowerCase()}/${item.toLowerCase()}`}
                              className="block px-3 py-2 text-gray-600 hover:text-[#6f9a37;]"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      ))
                    ) : (
                      Array.isArray(subItems) && subItems.map((item: string) => (
                        <Link
                          key={item}
                          to={`/${key.toLowerCase()}/${item.toLowerCase()}`}
                          className="block px-3 py-2 text-gray-600 hover:text-[#6f9a37;]"
                        >
                          {item}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 
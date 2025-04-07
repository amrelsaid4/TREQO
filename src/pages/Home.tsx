import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../types";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import personImage from "../assets/images/person/t.jpg";

import LoginModal from "../components/LoginModal";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MoneyIcon from "@mui/icons-material/Money";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import TopProducts from "../components/TopProducts";
import Hero from "../components/Hero";
import sample1 from "../assets/images/sample-1.jpg";
import sample2 from "../assets/images/sample-2.jpg";
import sample3 from "../assets/images/sample-3.jpg";
import CategoriesSection from "../components/CategoriesSection";




const slides = [
  {
    image: sample1,
    title: "Trendy Dresses",
    description: "Check out our newest styles and trends",
    contentPosition: "right" as const,
    overlayStyle: "bg-transparent",
    className: "bg-[#F5F5F5]",
    textColor: "text-gray-800",
  },
  {
    image: sample2,
    title: "Summer Fashion",
    description: "Get ready for summer with our latest collection",
    contentPosition: "center" as const,
    overlayStyle: "bg-transparent",
    className: "bg-[#F5F5F5]",
    textColor: "text-gray-800",
  },
  {
    image: sample3,
    title: "Premium Collection",
    description: "Discover our exclusive leather jackets and accessories",
    contentPosition: "right" as const,
    overlayStyle: "bg-transparent",
    className: "bg-[#F5F5F5]",
    textColor: "text-gray-800",
  },
];

const brands = [
  { id: 1, image: "/images/brands/brand1.png", name: "Brand 1" },
  { id: 2, image: "/images/brands/brand2.png", name: "Brand 2" },
  { id: 3, image: "/images/brands/brand3.png", name: "Brand 3" },
  { id: 4, image: "/images/brands/brand4.png", name: "Brand 4" },
  { id: 5, image: "/images/brands/brand5.png", name: "Brand 5" },
];

const styles = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slideInRight {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const [activeTab, setActiveTab] = useState("featured");
  const [activeCategory, setActiveCategory] = useState("clothing");

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLoginModal(true);
      localStorage.setItem("hasVisited", "true");
    }

    const loadFeaturedProducts = async () => {
      try {
        const products = await fetchProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const getFilteredProducts = () => {
    if (!featuredProducts || featuredProducts.length === 0) {
      return [];
    }
    return featuredProducts.filter((product) => {
      if (activeTab === "featured") {
        return product.featured;
      }
      return true;
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const testimonials = [
    {
      id: 1,
      image: "/src/assets/images/person/person1.png",
      name: "Job Charls",
      role: "Specialist",
      text: "voluptatem that accusantium unde omnis laudantium inventore ametsid of loremipsum.",
    },
    {
      id: 2,
      image: "/src/assets/images/person/person2.png",
      name: "Leesa Goec",
      role: "Developer",
      text: "voluptatem that accusantium unde omnis laudantium inventore ametsid of loremipsum.",
    },
    {
      id: 3,
      image: "/src/assets/images/person/person3.png",
      name: "Mack Duish",
      role: "Manager",
      text: "voluptatem that accusantium unde omnis laudantium inventore ametsid of loremipsum.",
    },
  ];
  const collections = [
    {
      title: "Summer Fashion Tips",
      image: "/src/assets/images/blog/blog1.jpg",
    },
    {
      title: "New Arrivals Guide",
      image: "/src/assets/images/blog/blog2.jpg",
    },
    {
      title: "Style Trends 2025",
      image: "/src/assets/images/blog/blog3.jpg",
    },
    {
      title: "Accessory Must-Haves",
      image: "/src/assets/images/blog/blog4.jpg",
    },
    {
      title: "Backpack Essentials",
      image: "/src/assets/images/blog/blog5.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <main>
        <Hero slides={slides} />
        {/* Features Section with Icons */}
        <section className="bg-white py-12 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Free Shipping */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary-50 rounded-full transition-colors group-hover:bg-primary-100">
                  <LocalShippingIcon className="text-3xl text-primary-500 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    Free Shipping Worldwide
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-primary-500 transition-colors">
                    On order over $150
                  </p>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary-50 rounded-full transition-colors group-hover:bg-primary-100">
                  <SupportAgentIcon className="text-3xl text-primary-500 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    24/7 Customer Support
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-primary-500 transition-colors">
                    Dedicated support team
                  </p>
                </div>
              </div>

              {/* Money Back */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary-50 rounded-full transition-colors group-hover:bg-primary-100">
                  <MoneyIcon className="text-3xl text-primary-500 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    Money Back Guarantee
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-primary-500 transition-colors">
                    Within 30 days
                  </p>
                </div>
              </div>

              {/* Gift & Vouchers */}
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-3 bg-primary-50 rounded-full transition-colors group-hover:bg-primary-100">
                  <CardGiftcardIcon className="text-3xl text-primary-500 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                    Gift And Vouchers
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-primary-500 transition-colors">
                    Special offers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Collection Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {collections.map((item, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden group rounded-lg h-[400px] lg:h-[500px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-t from-[#6f9a37]/80 to-transparent transition-all duration-700 ease-in-out" />
                  <div className="absolute bottom-6 w-full text-center px-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                    <h3 className="text-lg font-bold text-white transition duration-300">
                      {item.title}
                    </h3>
                    <Link
                      to="/products"
                      className="inline-block mt-2 text-sm font-semibold border border-white px-4 py-2 text-white transition-all duration-300"
                    >
                      Shop Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TopProducts />
      </main>

      {/* Top Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            centeredSlides={true}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <SwiperSlide key={num}>
                <div className="relative group h-40">
                  {" "}
                  {/* زيادة ارتفاع الحاوية */}
                  <img
                    src={`/src/assets/images/brand/${num}.jpg`}
                    alt={`Brand ${num}`}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      num > 5 ? "opacity-30 filter grayscale" : "opacity-70"
                    } group-hover:opacity-100 group-hover:grayscale-0`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonials */}

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center">
          <img
            src={personImage}
            className="w-[80%] h-[auto] min-h-[60vh] max-h-[120vh] object-cover object-center"
            alt="Background"
            style={{
              width: "80%",
              height: "auto",
              maxHeight: "120vh",
              minHeight: "60vh",
              objectFit: "cover",
              objectPosition: "center",
              aspectRatio: "auto",
            }}
          />
        </div>
        <div className="w-[80%] mx-auto px-4 relative z-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={testimonials.length > 1}
            className="relative"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-gray-400 mb-8">{testimonial.text}</p>
                  <h3 className="text-[#6f9a37] font-semibold mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400">-{testimonial.role}</p>
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Categories */}
      <CategoriesSection 
  products={featuredProducts} 
  loading={loading} 
/>
      {/* Newsletter */}
      <section className="bg-[#6f9a37] py-8 md:py-10">
  <div className="max-w-3xl mx-auto px-4">
    <div className="text-center text-white">
      <h2 className="text-xl md:text-2xl font-medium mb-1 md:mb-2">Subscribe For The Newsletter</h2>
      <p className="text-sm md:text-base text-gray-100 mb-4 md:mb-6">Words To Get Latest Update (Sign Up For Free)</p>
      <form className="max-w-xs mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-sm text-sm text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-[#6f9a37] px-4 py-1.5 md:px-5 md:py-2 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;

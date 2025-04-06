import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import "../index.css"
interface HeroProps {
  slides: {
    image: string;
    title: string;
    description: string;
    className?: string;
    contentPosition?: 'left' | 'center' | 'right';
    textColor?: string;
    overlayStyle?: string;
    animation?: 'slide' | 'fade';
  }[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const navigate = useNavigate();

  const getContentPosition = (position: string = 'left') => {
    switch (position) {
      case 'right':
        return 'justify-end';
      case 'center':
        return 'justify-center text-center';
      default:
        return 'justify-start';
    }
  };

  const getAnimationClasses = (slide: HeroProps['slides'][0]) => {
    const baseClasses = `${slide.textColor || 'text-gray-900'} ${
      slide.contentPosition === 'center' ? 'max-w-2xl text-center px-8' : 'max-w-xl'
    }`;

    if (slide.animation === 'fade') {
      return `${baseClasses} animate-fadeInUp`;
    }

    return `${baseClasses} ${
      slide.contentPosition === 'right' ? 'animate-slideInRight mr-32 pr-8' : 'animate-slideInLeft ml-24'
    }`;
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <section className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={`relative w-full h-full ${slide.className || ''} group`}>
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 ${slide.overlayStyle || 'bg-black/40'}`} />
            </div>
            <div className={`absolute inset-0 flex items-center ${getContentPosition(slide.contentPosition)}`}>
              <div className={getAnimationClasses(slide)}>
                <h1 className={`text-6xl font-bold mb-4 transition-colors duration-300 group-hover:text-[#82b440] whitespace-nowrap ${
                  slide.animation === 'fade' ? 'animate-fadeInUp' : ''
                }`}>
                  {slide.title}
                </h1>
                <p className={`text-xl mb-8 text-gray-600 ${
                  slide.animation === 'fade' ? 'animate-fadeInUp animation-delay-200' : ''
                }`}>
                  {slide.description}
                </p>
                <button 
                  onClick={handleShopNow}
                  className={`bg-black text-white px-8 py-3 rounded-2xl font-medium text-lg transition-all duration-300 hover:bg-[#82b440] ${
                    slide.animation === 'fade' ? 'animate-fadeInUp animation-delay-400' : ''
                  }`}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero; 
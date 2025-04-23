import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import '../index.css';

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
    const baseClasses = `${slide.textColor || 'text-white'} ${
      slide.contentPosition === 'center' ? 'text-center' : ''
    }`;

    if (slide.animation === 'fade') {
      return `${baseClasses} animate-fadeInUp`;
    }

    return `${baseClasses} ${
      slide.contentPosition === 'right'
        ? 'animate-slideInRight'
        : 'animate-slideInLeft'
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
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${slide.overlayStyle || 'bg-black/40'}`} />
            </div>
            <div className={`absolute inset-0 flex items-center ${getContentPosition(slide.contentPosition)} px-3`}>
              <div className={`w-full max-w-full sm:max-w-lg ${getAnimationClasses(slide)} px-2`}>
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2 text-white group-hover:text-[#82b440]">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-base md:text-lg mb-4 text-white/90">
                  {slide.description}
                </p>
                <button
                  onClick={handleShopNow}
                  className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm md:text-lg transition-all duration-300 hover:bg-[#82b440] hover:text-white"
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

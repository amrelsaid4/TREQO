import React from 'react';
import aboutUS from "../assets/images/aboutUS.jpg"
const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 animate__animated animate__fadeIn">
        About Us
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side (Text) */}
        <div className="text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
          <p className="text-lg leading-relaxed mb-4">
            Welcome to our e-commerce platform. We are dedicated to providing the best shopping experience for our customers. Our platform offers a wide range of high-quality products from trusted suppliers, all carefully selected to meet your needs.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            We aim to create a seamless and enjoyable shopping experience, with easy navigation, secure payment options, and fast shipping. Our team works tirelessly to ensure that your satisfaction is our top priority.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Whether you are looking for fashion, electronics, home goods, or any other product, we've got you covered. Thank you for choosing us for your shopping needs. We look forward to serving you!
          </p>
        </div>

        {/* Right side (Image) */}
        <div className="relative group">
          <img
            src={aboutUS}
            alt="About Us"
            className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-all duration-500 ease-in-out"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-16 border-t border-gray-300"></div>

      {/* Our Mission */}
      <div className="text-center animate__animated animate__fadeIn animate__delay-2s">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Our mission is to revolutionize the shopping experience by providing an intuitive, user-friendly platform that offers high-quality products at competitive prices. We strive to create long-lasting relationships with our customers by continuously improving our services and offerings.
        </p>
      </div>
    </div>
  );
};

export default About;

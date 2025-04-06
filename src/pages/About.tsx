import React from 'react';

const About: React.FC = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      <div className="prose max-w-none">
        <p>
          Welcome to our e-commerce platform. We are dedicated to providing the best shopping experience for our customers.
        </p>
      </div>
    </div>
  );
};

export default About; 
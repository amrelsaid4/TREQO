import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900  mb-4">
              TREQO
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your one-stop shop for all your fashion needs. Quality products at affordable prices.
            </p>
          </div>

          <div className="animate-fade-in [animation-delay:200ms]">
            <h3 className="text-lg font-semibold text-gray-900  mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in [animation-delay:400ms]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>123 Fashion Street, NY 10001</li>
              <li>amrelsaid6288@gmail.com</li>
              <li>+201029708267</li>
            </ul>
          </div>

          <div className="animate-fade-in [animation-delay:600ms]">
            <h3 className="text-lg font-semibold text-gray-900  mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} TREQO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
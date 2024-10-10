import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          FashionNova
        </Link>
        <div className="flex-1 mx-8 relative">
          <input
            type="text"
            placeholder="Search for trendy styles..."
            className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link to="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
          <Link to="/deals" className="text-gray-600 hover:text-gray-800">Deals</Link>
          <Link to="/admin" className="text-gray-600 hover:text-gray-800">Admin</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ShoppingBag className="text-gray-600 hover:text-purple-500 transition-colors cursor-pointer" />
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
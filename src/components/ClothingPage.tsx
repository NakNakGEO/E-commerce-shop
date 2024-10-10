import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

interface ClothingItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const ClothingPage: React.FC = () => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [featuredItem, setFeaturedItem] = useState<ClothingItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const fetchClothingItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/inventory');
      const fetchedItems = response.data;
      setItems(fetchedItems);
      if (fetchedItems.length > 0) {
        setFeaturedItem(fetchedItems[0]);
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching clothing items:', error);
      setError('Failed to load clothing items. Please try again later.');
    }
  };

  const scrollLeft = () => {
    const container = document.getElementById('clothing-container');
    if (container) container.scrollLeft -= 200;
  };

  const scrollRight = () => {
    const container = document.getElementById('clothing-container');
    if (container) container.scrollLeft += 200;
  };

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 relative overflow-hidden rounded-2xl shadow-2xl">
          {featuredItem && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-75"></div>
              <img
                src={featuredItem.image}
                alt={featuredItem.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="text-white ml-16 max-w-lg">
                  <h2 className="text-5xl font-bold mb-4">Summer Sensation</h2>
                  <p className="text-xl mb-6">Discover our hottest picks for the season. Be bold, be you.</p>
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition-colors transform hover:scale-105 duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Trending Now</h2>
          <div className="relative">
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-purple-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>
            <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-purple-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>
            <div id="clothing-container" className="flex overflow-x-auto scrollbar-hide space-x-6 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-purple-600 mb-2">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-bold">${item.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
              <p className="mb-6">Be the first to wear our latest styles. Fresh looks for every occasion.</p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full self-start hover:bg-purple-100 transition-colors">
              Explore New
            </button>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-lg p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Summer Sale</h3>
              <p className="mb-6">Hot deals on cool styles. Up to 50% off on selected items.</p>
            </div>
            <button className="bg-white text-pink-600 px-6 py-2 rounded-full self-start hover:bg-pink-100 transition-colors">
              Shop Sale
            </button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Dresses', 'Tops', 'Bottoms', 'Accessories'].map((category) => (
              <div key={category} className="relative group overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={`https://source.unsplash.com/400x300/?${category.toLowerCase()},fashion`}
                  alt={category}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Join Our Style Community</h2>
              <p className="text-lg">Get exclusive offers, style tips, and first access to new collections!</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
              />
              <button className="bg-purple-800 text-white px-6 py-2 rounded-r-full hover:bg-purple-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale</li>
                <li>Collections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>FAQ</li>
                <li>Shipping & Returns</li>
                <li>Contact Us</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>Our Story</li>
                <li>Sustainability</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>&copy; 2024 FashionNova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClothingPage;
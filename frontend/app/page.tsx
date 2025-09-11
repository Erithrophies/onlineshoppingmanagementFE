"use client";
import React from 'react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white text-center py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">COSMO Vision Pro</h2>
          <h3 className="text-2xl md:text-3xl text-gray-300 mb-6">Welcome to the era of spatial computing.</h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="apple-link text-lg">Learn more</a>
            <a href="#" className="apple-link text-lg">Buy</a>
          </div>
        </div>
      </section>
      
      {/* Product Showcase 1 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">iPhone 15 Pro</h2>
          <p className="text-xl text-gray-600 mb-8">Titanium. So strong. So light. So Pro.</p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="apple-link-black text-lg">Learn more</a>
            <a href="#" className="apple-link-black text-lg">Buy</a>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="aspect-video bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
          </div>
        </div>
      </section>
      
      {/* Product Grid */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product 1 */}
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">MacBook Air</h3>
            <p className="text-gray-600 mb-6">Supercharged by M2.</p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="apple-link-black">Learn more</a>
              <a href="#" className="apple-link-black">Buy</a>
            </div>
            <div className="aspect-video bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg"></div>
          </div>
          
          {/* Product 2 */}
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Apple Watch</h3>
            <p className="text-gray-600 mb-6">Smarter. Brighter. Mightier.</p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="apple-link-black">Learn more</a>
              <a href="#" className="apple-link-black">Buy</a>
            </div>
            <div className="aspect-video bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg"></div>
          </div>
          
          {/* Product 3 */}
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">iPad</h3>
            <p className="text-gray-600 mb-6">Lovable. Drawable. Magical.</p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="apple-link-black">Learn more</a>
              <a href="#" className="apple-link-black">Buy</a>
            </div>
            <div className="aspect-video bg-gradient-to-r from-red-400 to-orange-400 rounded-lg"></div>
          </div>
          
          {/* Product 4 */}
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">AirPods</h3>
            <p className="text-gray-600 mb-6">The sound of innovation.</p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="apple-link-black">Learn more</a>
              <a href="#" className="apple-link-black">Buy</a>
            </div>
            <div className="aspect-video bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg"></div>
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">COSMO Music</h2>
          <p className="text-xl mb-8">Over 100 million songs. Start listening for free.</p>
          <a href="#" className="apple-link-white-button">Try it free</a>
        </div>
      </section>

      <style jsx>{`
        .apple-link {
          color: #f2f3f5ff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.25rem 0.5rem;
        }

        .apple-link:hover {
          color: #ffffff;
          background-color: #626465ff;
          border-radius: 980px;
        }
        
        .apple-link::after {
          content: "›";
          margin-left: 0.5rem;
          font-size: 1.2em;
          position: relative;
          top: 1px;
        }
        
        .apple-link-black {
          color: #000000;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.25rem 0.5rem;
        }

        .apple-link-black:hover {
          color: #626465ff;
          background-color: transparent;
          border-radius: 980px;
        }
        
        .apple-link-black::after {
          content: "›";
          margin-left: 0.5rem;
          font-size: 1.2em;
          position: relative;
          top: 1px;
        }
        
        .apple-link-white-button {
          display: inline-block;
          color: #ffffff;
          background-color: transparent;
          border: 1px solid #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 980px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .apple-link-white-button:hover {
          color: #626465ff;
          background-color: #ffffff;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
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
      
 <section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Macbook Air</h2>
    <p className="text-xl text-black mb-8">Supercharged by M2.</p>
    <div className="flex justify-center space-x-6 mb-12">
      <a href="#" className="apple-link-black text-lg">Learn more</a>
      <a href="#" className="apple-link-black text-lg">Buy</a>
    </div>
    <div className=" rounded-2xl overflow-hidden aspect-video">
      <img
        src="macbooka.png"
        alt="macbook air"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</section>
      
<section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">iPhone Air</h2>
          <p className="text-xl text-white-800 mb-8">The thinnest iPhone ever.With the power of pro inside.</p>
          <div className="flex justify-center space-x-6 ">
            <a href="#" className="text-lg text-gray-400 hover:underline">Learn more</a>
            <a href="#" className="text-lg text-gray-400 hover:underline">Buy</a>
          </div><br/><br/><br/><br/><br/><br/><br/>
           <div className="rounded-2xl  overflow-hidden aspect-video">
            <img
              src="iphonea.png"
              alt="iPhone air"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>



      {/* Product Showcase - iPad */}
      <section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">iPad</h2>
          <p className="text-xl text-white-800 mb-8">Lovable. Drawable. Magical.</p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="text-lg text-gray-400 hover:underline">Learn more</a>
            <a href="#" className="text-lg text-gray-400 hover:underline">Buy</a>
          </div>
          <div className="rounded-2xl  overflow-hidden aspect-video">
            <img
              src="ipad.png"
              alt="iPad"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Product Showcase - AirPods */}
      <section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">AirPods</h2>
          <p className="text-xl text-black mb-8">The sound of innovation.</p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="text-lg text-gray-400 hover:underline">Learn more</a>
            <a href="#" className="text-lg text-gray-400 hover:underline">Buy</a>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img
              src="airpods.png"
              alt="AirPods"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* Promo Banner */}
      <section className="py-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The latest arrivals are here</h2>
          <p className="text-xl mb-8">Explore our collection of cutting-edge tech and find your next favorite device.</p>
          <a href="#" className="apple-link-white-button">Shop now</a>
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
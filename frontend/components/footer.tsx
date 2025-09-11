import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-xs">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Shop and Learn</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900">Store</a></li>
            <li><a href="#" className="hover:text-gray-900">Mac</a></li>
            <li><a href="#" className="hover:text-gray-900">iPad</a></li>
            <li><a href="#" className="hover:text-gray-900">iPhone</a></li>
            <li><a href="#" className="hover:text-gray-900">Watch</a></li>
            <li><a href="#" className="hover:text-gray-900">AirPods</a></li>
            <li><a href="#" className="hover:text-gray-900">TV & Home</a></li>
            <li><a href="#" className="hover:text-gray-900">Accessories</a></li>
            <li><a href="#" className="hover:text-gray-900">Gift Cards</a></li>
          </ul>
        </div>
        
        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900">COSMO Music</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO TV+</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Arcade</a></li>
            <li><a href="#" className="hover:text-gray-900">iCloud</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO One</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Card</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Books</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Podcasts</a></li>
            <li><a href="#" className="hover:text-gray-900">App Store</a></li>
          </ul>
        </div>
        
        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">COSMO Store</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900">Find a Store</a></li>
            <li><a href="#" className="hover:text-gray-900">Genius Bar</a></li>
            <li><a href="#" className="hover:text-gray-900">Today at COSMO</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Camp</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Store App</a></li>
            <li><a href="#" className="hover:text-gray-900">Financing</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Trade In</a></li>
            <li><a href="#" className="hover:text-gray-900">Order Status</a></li>
            <li><a href="#" className="hover:text-gray-900">Shopping Help</a></li>
          </ul>
        </div>
        
        {/* Column 4 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">About COSMO</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900">Newsroom</a></li>
            <li><a href="#" className="hover:text-gray-900">COSMO Leadership</a></li>
            <li><a href="#" className="hover:text-gray-900">Career Opportunities</a></li>
            <li><a href="#" className="hover:text-gray-900">Investors</a></li>
            <li><a href="#" className="hover:text-gray-900">Ethics & Compliance</a></li>
            <li><a href="#" className="hover:text-gray-900">Events</a></li>
            <li><a href="#" className="hover:text-gray-900">Contact COSMO</a></li>
          </ul>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="max-w-6xl mx-auto px-4 py-6 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            Copyright © 2025 COSMO Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Use</a>
            <a href="#" className="hover:text-gray-900">Sales and Refunds</a>
            <a href="#" className="hover:text-gray-900">Legal</a>
            <a href="#" className="hover:text-gray-900">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
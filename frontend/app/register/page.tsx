'use client'; 

import React, { useState } from 'react';
import CustomerRegisterForm from '@/components/CustomerRegisterForm';
import SellerRegisterForm from '@/components/SellerRegisterForm';
import AdminRegisterForm from '@/components/AdminRegisterForm';

export default function RegisterPage() {
  const [userType, setUserType] = useState('customer');

  const renderForm = () => {
    if (userType === 'customer') {
      return <CustomerRegisterForm />;
    }
    if (userType === 'seller') {
      return <SellerRegisterForm />;
    }
    if (userType === 'admin') {
      return <AdminRegisterForm/>;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-gray-800 p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold mt-20 mb-16 text-left">Create Your Account</h1>
        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-6">Join Us</h2>

          {/* Segmented Control for User Type */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-8">
            <button
              className={`flex-1 py-2 rounded-full text-center font-medium transition-colors duration-300
              ${userType === 'customer' ? 'bg-black text-white' : 'text-gray-800'}`}
              onClick={() => setUserType('customer')}
            >
              Customer
            </button>
            <button
              className={`flex-1 py-2 rounded-full text-center font-medium transition-colors duration-300
              ${userType === 'seller' ? 'bg-black text-white' : 'text-gray-800'}`}
              onClick={() => setUserType('seller')}
            >
              Seller
            </button>
            <button
              className={`flex-1 py-2 rounded-full text-center font-medium transition-colors duration-300
              ${userType === 'admin' ? 'bg-black text-white' : 'text-gray-800'}`}
              onClick={() => setUserType('admin')}
            >
              Admin
            </button>
          </div>

          {/* Render the selected form */}
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

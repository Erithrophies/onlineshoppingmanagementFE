'use client'; 

import React, { useState } from 'react';
import CustomerRegisterForm from '@/components/CustomerRegisterForm';
import SellerRegisterForm from '@/components/SellerRegisterForm';

export default function RegisterPage() {
  const [userType, setUserType] = useState('customer');

  const renderForm = () => {
    if (userType === 'customer') {
      return <CustomerRegisterForm />;
    }
    if (userType === 'seller') {
      return <SellerRegisterForm />;
    }
    return null;
  };

  return (
    <div>
      <h1>Register</h1>
      <div style={{ marginBottom: '15px' }}>
        <label>
          <input
            type="radio"
            value="customer"
            checked={userType === 'customer'}
            onChange={() => setUserType('customer')}
          />
          Sign up as a customer
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="seller"
            checked={userType === 'seller'}
            onChange={() => setUserType('seller')}
          />
          Sign up as a seller
        </label>
      </div>
      {renderForm()}
    </div>
  );
}
import React from 'react';

export default function SellerRegisterForm() {
  return (
    <form>
      <h2>Seller Details</h2>
      <div>
        <label htmlFor="SellerName">Name:</label>
        <input type="text" id="SellerName" />
      </div>
      <div>
        <label htmlFor="SellerEmail">Email:</label>
        <input type="email" id="SellerEmail" />
      </div>
      <div>
        <label htmlFor="SellerShopName">Shop name:</label>
        <input type="text" id="SellerShopName" />
      </div>
      <div>
        <label htmlFor="sellerPass">Password:</label>
        <input type="password" id="sellerPass" />
      </div>
      <button type="submit">Sign Up as Seller</button>
    </form>
  );
}
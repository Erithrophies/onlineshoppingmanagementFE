import React from 'react';

export default function SellerRegisterForm() {
  return (
    <form>
      <h2>Seller Details</h2>
      <div>
        <label htmlFor="SellerName">Name:</label>
        <input type="text" id="SellerName" />
      </div>
      <br />
      <div>
        <label htmlFor="SellerEmail">Email:</label>
        <input type="email" id="SellerEmail" />
      </div>
      <br />
      <div>
        <label htmlFor="SellerShopName">Shop name:</label>
        <input type="text" id="SellerShopName" />
      </div>
      <br />
      <div>
        <label htmlFor="sellerPass">Password:</label>
        <input type="password" id="sellerPass" />
      </div>
      <br />
      <button type="submit">Sign Up as Seller</button>
    </form>
  );
}
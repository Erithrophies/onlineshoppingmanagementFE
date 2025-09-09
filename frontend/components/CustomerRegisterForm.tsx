import React from 'react';

export default function CustomerRegisterForm() {
  return (
    <form>
      <h2>Customer Details</h2>
      <div>
        <label htmlFor="customerName">Name:</label>
        <input type="text" id="customerName" />
      </div><br/>
      <div>
        <label htmlFor="customerEmail">Email:</label>
        <input type="email" id="customerEmail" />
      </div><br/>
      <div>
        <label htmlFor="customerPass">Password:</label>
        <input type="password" id="customerPass" />
      </div><br/>
      <button type="submit">Sign Up as Customer</button>
    </form>
  );
}
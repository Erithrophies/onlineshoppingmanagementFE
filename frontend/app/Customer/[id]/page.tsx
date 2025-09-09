"use client";
import React, { use } from 'react';


export default  function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const customerId = id;

  return (
    <div>
      <h1>Customer Profile</h1>
      <p>This is the profile page for Customer ID: {customerId}</p>
    </div>
  );
}1

import React from 'react';

export default async function SellerDynamicPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const sellerId = id;

  return (
    <div>
      <h1>Seller Details</h1>
      <p>This is the page for Seller with ID: {sellerId}</p>
      
    </div>
  );
}
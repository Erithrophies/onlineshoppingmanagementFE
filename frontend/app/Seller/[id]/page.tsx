"use client";
import React, { use } from 'react';

export default function SellerDynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sellerId = id;

  return (
    <div>
      <h1>Seller Details</h1>
      <p>This is the page for Seller with ID: {sellerId}</p>
      
    </div>
  );
}
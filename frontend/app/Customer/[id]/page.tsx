import React from 'react';

export default async function CustomerProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const customerId = id;

  return (
    <div>
      <h1>Customer Profile</h1>
      <p>This is the profile page for Customer ID: {customerId}</p>
    </div>
  );
}
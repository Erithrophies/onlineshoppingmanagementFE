"use client";
import { promises } from 'dns'; 
import React, { use } from 'react';

export default  function AdminProfilePage({ params }: { params: Promise < { id: string }> }) {
  const { id } = use(params);
  const AdminId = id;

  return (
    <div>
      <h1>Admin Profile</h1>
      <p>This is the profile page for Admin ID: {AdminId}</p>
    </div>
  );
}





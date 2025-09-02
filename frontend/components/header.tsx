import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ 
      padding: '10px 20px', 
      borderBottom: '1px solid #ccc', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Cosmo</h1>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link href="/">Home</Link>
        <Link href="/login">Sign In</Link>
        <Link href="/register">Sign Up</Link>
      </nav>
    </header>
  );
}
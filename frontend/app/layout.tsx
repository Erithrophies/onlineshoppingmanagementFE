import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import Script from 'next/script';
import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
          <Script src="https://cdn.tailwindcss.com"></Script>
          {children}
        <Footer />
      </body>
    </html>
  );
}

import React from 'react';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>COSMO - Premium Electronics</title>
        <meta name="description" content="Discover premium electronic products at COSMO" />
      </head>
      <body className="bg-white">
        <Header />
        <Script src="https://cdn.tailwindcss.com"></Script>
        <main className="pt-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



























// import Footer from '@/components/footer';
// import Header from '@/components/header';
// import React from 'react';
// import Script from 'next/script';
// import './globals.css';


// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <Header />
//           <Script src="https://cdn.tailwindcss.com"></Script>
//           {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }
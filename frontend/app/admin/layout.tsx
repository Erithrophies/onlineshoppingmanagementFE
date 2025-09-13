"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentSection = pathname.split('/').pop() || 'dashboard';

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Sellers', href: '/admin/sellers', icon: '🏪' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Payments', href: '/admin/payments', icon: '💳' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-black bg-opacity-70">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-white">COSMO Admin</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-zinc-700 text-white'
                          : 'text-zinc-300 hover:bg-zinc-600 hover:text-white'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-zinc-700 p-4">
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  window.location.href = '/login';
                }}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Logout</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
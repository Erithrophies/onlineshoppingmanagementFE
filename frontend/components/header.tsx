"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      router.push("/"); 
    }
  };

  return (
    <>
      <style>{`
        .header-bg {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
        }
        .header-container {
          max-width: 1280px;
          margin: auto;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-links {
          display: none;
        }
        @media (min-width: 768px) {
          .nav-links {
            display: flex;
            gap: 2rem;
            font-size: 0.875rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .link-hover:hover {
          color: #383839ff;
          transition: color 0.3s;
        }
        .dropdown {
          position: relative;
          padding: 0 0.5rem;
        }
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 0;
          width: 12rem;
          background-color: rgb(18,18,18);
          border-radius: 0.375rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(169, 163, 163, 0.05);
          padding: 0.25rem 0;
          transition: all 0.3s;
          transform-origin: top right;
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <header className="header-bg fixed top-0 left-0 w-full z-10">
        <div className="header-container">
         
          <div className="flex-grow flex justify-center md:justify-start">
            <h1 className="text-xl font-semibold cursor-pointer text-white">
              <a href="/">COSMO</a>
            </h1>
          </div>

          
          <nav className="nav-links">
            <a href="/store" className="link-hover cursor-pointer text-gray-300">Store</a>
            <a href="/support" className="link-hover cursor-pointer text-gray-300">Support</a>
            <a href="/contact" className="link-hover cursor-pointer text-gray-300">Contact Us</a>
          </nav>

          
          <div className="flex-grow flex justify-end items-center space-x-6 text-sm">
            
            <a href="/store" className="link-hover cursor-pointer text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </a>

            
            <div
              className="dropdown"
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
             
              <div className="cursor-pointer text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>

              
              {isLoginHovered && (
                <div className="dropdown-menu">
                  {isLoggedIn ? (
                    <>
                      <a href="/Customer" className="block px-4 py-2 text-sm text-gray-200 link-hover cursor-pointer">Dashboard</a>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-200 link-hover cursor-pointer">Logout</button>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="block px-4 py-2 text-sm text-gray-200 link-hover cursor-pointer">Sign In</a>
                      <a href="/register" className="block px-4 py-2 text-sm text-gray-200 link-hover cursor-pointer">Sign Up</a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

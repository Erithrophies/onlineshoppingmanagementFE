"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    // Fetch customer profile
    axios
      .get("http://localhost:3000/customers/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error("Profile error:", err.response?.data));

    // Fetch products
    axios
      .get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Products error:", err.response?.data));
  }, []);

  return (
    <div className="min-h-screen !bg-gradient-to-r !from-zinc-200 !via-zinc-500 !to-zinc-200 ">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-black drop-shadow-md"><br/>
          {customer ? `Welcome back, ${customer.name}` : "Loading..."}
        </h1>
        <p className="text-white mt-2 text-lg">
          Explore our latest products just for you ✨
        </p>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
              {product.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm text-center line-clamp-2">
              {product.description}
            </p>
            <p className="mt-3 text-xl font-semibold text-purple-700">
              ${product.price}
            </p>
            <button className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

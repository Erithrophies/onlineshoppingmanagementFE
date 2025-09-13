"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Search } from "lucide-react";

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
      .then((res) => {
        console.log("Profile response:", res.data);
        setCustomer(res.data);
      })
      .catch((err) => console.error("Profile error:", err.response?.data || err));

    // Fetch products
    axios
      .get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Products error:", err.response?.data));
  }, []);

  // Filter products locally for search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            {customer ? `Hi, ${customer.name}` : "Loading..."}
          </h1>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-zinc-300 rounded-full text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
            {/* Cart Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition">
              <ShoppingCart className="h-5 w-5" />
              Cart
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-700 via-blue-900 to-gray-800 text-white py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Discover Products You’ll Love
        </h2>
        <p className="mt-3 text-lg text-zinc-300">
          Sleek, modern, and made just for you ✨
        </p>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-zinc-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
              >
                {/* Product Image Placeholder */}
                <div className="h-56 bg-gradient-to-tr from-zinc-200 to-zinc-300 flex items-center justify-center text-4xl font-bold text-zinc-500 group-hover:scale-105 transition-transform">
                  {product.name.charAt(0).toUpperCase()}
                </div>

                {/* Product Details */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-4 text-xl font-bold text-black">
                    ${product.price}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    By {product.seller?.shopName || "Unknown Shop"}
                  </p>

                  <button className="mt-6 w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-zinc-800 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* My Payments Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">My Payments</h3>
            <p className="text-zinc-600 mb-6">
              View your payment history, track upcoming invoices, and manage your payment methods.
            </p>
            <a
              href="/payments"
              className="mt-auto inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Go to My Payments
            </a>
          </div>

          {/* My Orders Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">My Orders</h3>
            <p className="text-zinc-600 mb-6">
              Check your order history, track shipping status, and manage your current orders.
            </p>
            <a
              href="/orders"
              className="mt-auto inline-block px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
            >
              Go to My Orders
            </a>
          </div>
        </div>
        <div className="mt-16">
  <section className="w-full max-w-7xl mx-auto bg-gradient-to-r via-red-100  text-orange-950 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
  {/* Text content */}
  <div className="md:w-1/2 mb-6 md:mb-0">
    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
      Account Settings
    </h3>
    <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
      Manage your profile information, update your password, and customize your preferences. Keep your account secure and up-to-date with ease.
    </p>
  </div>

  {/* Button */}
  <div className="md:w-1/2 flex justify-center md:justify-end">
    <a
      href="/account"
      className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-2xl hover:bg-white/90 transition-shadow shadow-lg"
    >
      Go to Account Settings
    </a>
  </div>
</section>

</div>
      </main>
    </div>
  );
}

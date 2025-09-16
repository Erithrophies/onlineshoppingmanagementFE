"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Search, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    let canceled = false;
    let pusher: Pusher | null = null;
    let channel: any = null;

    Pusher.logToConsole = true;

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    
    axios
      .get("http://localhost:3000/customers/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (canceled) return;

        const customer = res.data;
        if (!customer) {
          alert("Access denied! Only customers can access this page.");
          router.replace("/");
          return;
        }

        setCustomer(customer);

        
        pusher = new Pusher("383839eff6f5dc6b68fc", {
          cluster: "mt1",
          forceTLS: true,
        });

        pusher.connection.bind("connected", () => {
          console.log("Pusher connected");
        });

        pusher.connection.bind("error", (err: any) => {
          console.error("Pusher error", JSON.stringify(err, null, 2));
        });

        channel = pusher.subscribe(`customer-${customer.id}`);
        console.log("Subscribed to channel:", `customer-${customer.id}`);

        
        channel.bind("new-order", (eventData: any) => {
          const data =
            typeof eventData === "string" ? JSON.parse(eventData) : eventData;

          if (!canceled) {
            
            setNotifications((prevNotifications) => [data, ...prevNotifications]);

            
            const toast = document.createElement("div");
            toast.innerText = `New Order: ${data.orderTitle} ($${data.amount})`;
            toast.className =
              "fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 4000);
          }
        });
      })
      .catch((err) => {
        if (canceled) return;
        if (err.response?.status === 403) {
          alert("Access denied! Only customers can access this page.");
          router.replace("/");
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    
    axios
      .get("http://localhost:3000/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (canceled) return;
        setProducts(res.data);
      })
      .catch((err) => console.error(err));

    return () => {
      canceled = true;
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
      if (pusher) {
        pusher.disconnect();
      }
    };
  }, [router]);

  if (loading || !customer) {
    return null; 
  }

  
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
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
                className="pl-10 pr-4 py-2 border border-zinc-300 text-zinc-500 rounded-full text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Cart Button */}
            <a
              href="/Customer/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition font-medium"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="max-w-7xl mx-auto mt-4 px-6">
          <div className="flex flex-col gap-2">
            {notifications.map((notif, idx) => (
              <div
                key={idx}
                className="bg-blue-200 text-black px-4 py-5 rounded-full shadow-md"
              >
                New Order: {notif.orderTitle} (${notif.amount})
              </div>
            ))}
          </div>
        </div>
      )}<br/>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-700 via-blue-900 to-gray-800 text-white py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Discover Products You’ll Love
        </h2>
        <p className="mt-3 text-lg text-zinc-300">
          New release, reliable, and made just for you 
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
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div className="h-56 bg-gradient-to-tr from-zinc-200 to-zinc-300 flex items-center justify-center text-4xl font-bold text-zinc-500 group-hover:scale-105 transition-transform">
                  {product.name.charAt(0).toUpperCase()}
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-4 text-xl font-bold text-black">
                    ${product.price}
                  </p>
                  <div className="flex-grow"></div>
                  <a
                    href={`/Customer/product/${product.id}`}
                    className="flex items-center justify-center px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">My Payments</h3>
            <p className="text-zinc-600 mb-6">
              View your payment history, track upcoming invoices, and manage your
              payment methods.
            </p>
            <a
              href="/Customer/payment"
              className="mt-auto inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Go to My Payments
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold mb-4 text-zinc-900">My Orders</h3>
            <p className="text-zinc-600 mb-6">
              Check your order history, track shipping status, and manage your
              current orders.
            </p>
            <a
              href="/Customer/orders"
              className="mt-auto inline-block px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
            >
              Go to My Orders
            </a>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-16">
          <section className="w-full max-w-7xl mx-auto bg-gradient-to-r via-red-100 text-orange-950 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Account Settings</h3>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
                Manage your profile information, update your password, and
                customize your preferences. Keep your account secure and up-to-date
                with ease.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <a
                href="/Customer/account"
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

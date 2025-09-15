"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = (productId: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in first to buy products.");
      router.push("/login");
      return;
    }
    router.push(`/Customer/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg text-gray-400 font-sans">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center font-sans">
        <h1 className="text-2xl font-semibold mb-2 text-gray-200">
          No Products Available
        </h1>
        <p className="text-gray-400">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen !bg-gradient-to-r !from-zinc-900 !via-zinc-500 !to-zinc-900 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-white mb-12 tracking-tight text-center">
          Explore Our Store
        </h1>
        <br />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/10 backdrop-blur-lg rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col border border-white/10 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="h-56 bg-gradient-to-tr from-gray-700/30 to-gray-600/30 flex items-center justify-center text-4xl font-bold text-gray-300 relative overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                  />
                ) : (
                  product.name.charAt(0).toUpperCase()
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-grow text-gray-100">
                <h3 className="text-lg font-semibold text-white group-hover:text-gray-200">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-4 text-2xl font-bold text-white">
                  ${product.price}
                </p>

                <div className="flex-grow"></div>

                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(product.id)}
                  className="mt-6 w-full flex items-center justify-center px-5 py-3 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 text-black hover:opacity-90 transition font-medium tracking-wide"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios
      .get(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  axios
    .post(
      "http://localhost:3000/customers/orders",
      {
        items: [
          { productId: product.id, quantity: quantity }
        ]
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert("Product added to cart!");
      router.push("/Customer/cart");
    })
    .catch((err) => {
      console.error(err.response?.data || err);
      alert("Failed to add product to cart.");
    });
};

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-300 via-zinc-400 to-zinc-300 text-black">
      
      <section className="flex flex-col md:flex-row items-center max-w-7xl mx-auto py-24 px-6 gap-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-80 h-80 md:w-[400px] md:h-[400px] bg-gradient-to-tr from-zinc-200 to-zinc-400 rounded-3xl flex items-center justify-center text-6xl text-zinc-600 font-bold shadow-2xl">
            {product.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            {product.name}
          </h1>
          <p className="text-4xl font-bold">${product.price}</p>
          <p className="text-sm text-zinc-700">By {product.seller?.shopName || "Unknown Shop"}</p>

         
          <div className="flex items-center gap-4 mt-4">
            <label className="text-lg font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-4 py-2 border rounded-xl text-black font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full py-4 bg-zinc-800 text-white font-bold text-xl rounded-3xl shadow-lg hover:bg-zinc-700 transition"
            >
            Add to Cart
            </button>
        </div>
      </section>

      
     <section className="max-w-7xl mx-auto px-6 py-16">
  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl space-y-6">
    <h2 className="text-3xl font-bold text-black">Product Details</h2>
    <p className="text-zinc-700">
      {product.description}
    </p>
  </div>
</section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios
      .get(`http://localhost:3000/customers/my-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("Order detail error:", err.response?.data || err))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-zinc-500">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-500">Order not found</p>
      </div>
    );
  }

  const items = order.items ?? [];
  const orderDate = new Date(order.createdAt ?? Date.now());
  const totalQty = items.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity ?? 1), 0);

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <header className="!bg-gradient-to-r !from-green-700 !to-gray-800 text-white py-10 text-center shadow-lg relative">
        

        <h1 className="text-4xl font-bold tracking-tight">Order #{order.id}</h1>
        <p className="mt-2 text-zinc-300">
          Placed on {orderDate.toLocaleDateString()} — {totalQty} item(s)
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {items.map((item: any) => {
          const product = item.product ?? {};
          const qty = item.quantity ?? 1;
          const pricePer = Number(item.priceAtTime ?? product.price ?? 0);
          const lineTotal = pricePer * qty;

          return (
            <div
              key={item.id}
              className="bg-green-100 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              {/* Product info */}
              <div className="flex items-center gap-4 sm:w-2/3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 flex items-center justify-center text-xl font-bold text-zinc-600">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name ?? "product"} className="w-full h-full object-cover" />
                  ) : (
                    (product.name ?? " ")[0]?.toUpperCase() ?? "?"
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-900">{product.name ?? "Unnamed product"}</div>
                  <div className="text-xs text-zinc-500">{product.description ?? ""}</div>
                  <div className="text-xs text-zinc-900 mt-1">Price: ${pricePer.toFixed(2)}</div>
                </div>
              </div>

              {/* Quantity */}
              <div className="sm:w-1/6 text-center">
                <div className="text-sm font-medium">{qty}</div>
              </div>

              {/* Line total */}
              <div className="sm:w-1/6 text-right">
                <div className="text-sm font-medium text-gray-500">${lineTotal.toFixed(2)}</div>
              </div>
            </div>
          );
        })}

        {/* Order total */}
        <div className="mt-4 flex justify-end">
          <div className="text-right">
            <div className="text-sm text-zinc-500">Order total</div>
            <div className="text-xl font-bold text-zinc-900">${Number(order.totalPrice).toFixed(2)}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    axios
      .get("http://localhost:3000/customers/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.error("Orders error:", err.response?.data || err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-zinc-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-2">No orders yet</h2>
          <p className="text-zinc-500">Your recent purchases will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <header className="!bg-gradient-to-r !from-green-700 !to-gray-800 text-white py-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>
        <p className="mt-2 text-zinc-300">Keep track of your purchases and shipping status</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {orders.map((order) => {
          const items = order.items ?? [];
          const orderDate = new Date(order.createdAt ?? Date.now());
          const totalQty = items.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity ?? 1), 0);



          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 border border-zinc-200">
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Order #{order.id}</h2>
                  <p className="text-sm text-zinc-500">
                    {orderDate.toLocaleDateString()} — {totalQty} item(s)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`/Customer/orders/${order.id}`}
                    className="px-4 py-2 bg-zinc-100 text-zinc-800 rounded-lg text-sm hover:bg-zinc-200 transition"
                  >
                    View
                  </a>
                </div>
              </div>

              {/* Items list */}
              <div className="divide-y divide-zinc-100">
                {items.map((item: any) => {
                  const product = item.product ?? {};
                  const qty = item.quantity ?? 1;
                  const pricePer = Number(item.priceAtTime ?? product.price ?? 0);
                  const lineTotal = pricePer * qty;

                  return (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Product info */}
                      <div className="flex items-center gap-4 sm:w-2/3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 flex items-center justify-center text-xl font-bold text-zinc-600">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name ?? "product"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            (product.name ?? " ")[0]?.toUpperCase() ?? "?"
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{product.name ?? "Unnamed product"}</div>
                          <div className="text-xs text-zinc-500">{product.description ?? ""}</div>
                          <div className="text-xs text-green-600 mt-1">Price: ${pricePer.toFixed(2)}</div>
                        </div>
                      </div>

                   

                      {/* Line total */}
                      {/* <div className="sm:w-1/6 text-right">
                        <div className="text-sm font-medium">${lineTotal.toFixed(2)}</div>
                      </div> */}
                    </div>
                  );
                })}
              </div>

              {/* Order total */}
              <div className="mt-4 flex justify-end">
                <div className="text-right">
                  <div className="text-sm text-zinc-500">Order total</div>
                  <div className="text-xl font-bold text-zinc-900">${Number(order.totalPrice).toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

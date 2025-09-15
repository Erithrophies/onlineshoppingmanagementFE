"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Home } from "lucide-react"; // icon for dashboard/home

interface OrderItem {
  id: number;
  product: {
    name: string;
    imageUrl?: string;
  };
  quantity: number;
  priceAtTime: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  totalPrice: number;
  status: string;
}

export default function CartPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:3000/customers/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const unpaidOrders = res.data.filter((order: any) => order.status !== "paid");
      setOrders(unpaidOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const paidOrderId = searchParams.get("paidOrder");
    if (paidOrderId) {
      alert(`Order #${paidOrderId} has been paid!`);
      router.replace("/Customer/Cart");
    }
  }, [searchParams]);

  const cancelOrder = async (orderId: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    if (!confirm(`Are you sure you want to cancel order #${orderId}?`)) return;

    try {
      await axios.delete(`http://localhost:3000/customers/my-orders/${orderId}/cancel`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
      alert(`Order #${orderId} canceled successfully`);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const goToPayment = (orderId: number) => {
    router.push(`/Customer/payment/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg text-gray-600 font-sans">
        Loading your cart...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center font-sans">
        <h1 className="text-2xl font-semibold mb-2 text-gray-700">🛒 Your Cart is Empty</h1>
        <p className="text-gray-500">Start shopping and add items to your cart.</p>
        <button
          onClick={() => router.push("/Customer")}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium"
        >
          Back to home page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-3xl p-8">
        {/* Header with Back button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.push("/Customer")}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition font-medium"
          >
            <Home className="w-5 h-5" />
            Go to home page
          </button>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-wide">🛒 My Cart</h1>
        </div>

        {/* Orders list */}
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (acc, item) => acc + item.priceAtTime * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-2xl p-4 bg-white border border-gray-200 shadow-sm"
              >
                <h2 className="text-xl font-medium text-gray-900 mb-2 tracking-tight">
                  Order #{order.id}
                </h2>

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center text-lg font-medium text-gray-500">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        item.product.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price per item: ${item.priceAtTime}</p>
                    </div>

                    <p className="text-lg font-semibold text-gray-900">
                      ${item.priceAtTime * item.quantity}
                    </p>
                  </div>
                ))}

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-base font-medium text-gray-900">Order Total: ${total}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition font-medium text-sm"
                    >
                      Cancel Order
                    </button>
                    <button
                      onClick={() => goToPayment(order.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition font-medium text-sm"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

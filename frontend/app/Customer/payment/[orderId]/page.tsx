"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

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

export default function PaymentPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const router = useRouter();
  const params = useParams();
  const orderIdParam = params?.orderId;
  const orderId = typeof orderIdParam === "string" ? parseInt(orderIdParam) : null;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || !orderId) return;

    axios
      .get(`http://localhost:3000/customers/my-orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setOrder({
          ...data,
          totalPrice: Number(data.totalPrice),
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderId]);

  const makePayment = async () => {
    if (!order) return;
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.post(
        `http://localhost:3000/customers/my-orders/${order.id}/pay`,
        {
          orderId: order.id,
          amount: Number(order.totalPrice),
          paymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Payment for Order #${order.id} successful!`);

      
      router.push("/Customer/cart");
    } catch (err: any) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg text-gray-600 font-sans">
        Loading payment details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-center font-sans">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 tracking-wide">💳 Payment</h1>

        <div className="space-y-4">
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
        </div>

        <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-2xl flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-medium text-gray-900 tracking-tight">Total Amount</h2>
          <span className="text-2xl font-semibold text-green-600">${order.totalPrice}</span>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Select Payment Method</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`px-4 py-2 rounded-2xl font-medium text-white transition ${
                paymentMethod === "card" ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              Credit/Debit Card
            </button>
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`px-4 py-2 rounded-2xl font-medium text-white transition ${
                paymentMethod === "paypal" ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              PayPal
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => router.back()}
            className="px-5 py-3 bg-gray-200 font-medium rounded-2xl text-gray-800 hover:bg-gray-300 transition"
          >
            Back
          </button>
          <button
            onClick={makePayment}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-2xl hover:bg-green-700 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

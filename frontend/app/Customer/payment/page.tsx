"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  axios
    .get("http://localhost:3000/customers/my-payments", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Payments from API:", res.data); // <--- Here
      setPayments(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Payments error:", err.response?.data || err);
      setLoading(false);
    });
}, []);


  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-zinc-200 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            My Payments
          </h1>
          <a
            href="/Customer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-gray-800 text-white py-16 text-center shadow-md">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Manage Your Payments
        </h2>
        <p className="mt-3 text-lg text-zinc-300">
          View history, track invoices, and stay up to date.
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-zinc-500">Loading payments...</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-zinc-500">
            You don’t have any payment records yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-zinc-100 text-zinc-900 text-left">
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Method</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr
                    key={payment.id}
                    className="border-t border-zinc-200 hover:bg-zinc-50 transition"
                  >
                    <td className="py-4 px-6 text-zinc-700">{idx + 1}</td>
                  
                    <td className="py-4 px-6 font-semibold text-zinc-700">
                      ${Number(payment.amount).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        payment.status.toLowerCase() === "paid"
                          ? "bg-green-100 text-green-700"
                          : payment.status.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                    </td>
                    
                    <td className="py-4 px-6 text-zinc-700">{payment.paymentMethod || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";
import React from "react";
import { HelpCircle, BookOpen, MessageSquare } from "lucide-react";

export default function SupportPage() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-black text-white text-center py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Support</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            We’re here to help you with your COSMO products and services. 
            Find answers, guides, or chat with our team.
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 py-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
          
          {/* FAQs */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-900">FAQs</h3>
            <p className="text-gray-600 mb-6">
              Browse frequently asked questions to find quick answers.
            </p>
            <a href="#" className="apple-link-black text-black">
              Read more
            </a>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-900">Documentation</h3>
            <p className="text-gray-600 mb-6">
              Step-by-step guides, setup manuals, and product tutorials.
            </p>
            <a href="#" className="apple-link-black text-black">
              Explore
            </a>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-900">Live Chat</h3>
            <p className="text-gray-600 mb-6">
              Connect with our support team instantly for real-time help.
            </p>
            <a href="#" className="apple-link-black text-black">
              Start Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

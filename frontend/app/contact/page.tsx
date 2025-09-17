"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-black text-white text-center py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Get in touch with our COSMO support team in Dhaka, Bangladesh.
          </p>
        </div>
      </section>

      {/* Office Information */}
      <section className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-white text-center">
          <h3 className="text-2xl font-semibold mb-10">Our Office</h3>

          <div className="space-y-6 text-gray-200">
            <div className="flex items-center justify-center space-x-4">
              <MapPin className="h-6 w-6 text-indigo-400" />
              <p>COSMO HQ, Gulshan, Dhaka 1212, Bangladesh</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Mail className="h-6 w-6 text-indigo-400" />
              <p>support@cosmo.com</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Phone className="h-6 w-6 text-indigo-400" />
              <p>+880 1234 567 890</p>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg border border-zinc-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8451954810707!2d90.41251831536266!3d23.81033198455798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b38dfb85d9%3A0xa3b04e0c9b9f34af!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1694542000000!5m2!1sen!2sbd"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AccountPage() {
  const [customer, setCustomer] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("http://localhost:3000/customers/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCustomer(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
        });
      })
      .catch((err) => console.error("Profile error:", err.response?.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      setSaving(true);
      const res = await axios.patch(
        "http://localhost:3000/customers/my-profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCustomer(res.data);
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update error:", err.response?.data || err);
      setMessage("Failed to update profile ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-zinc-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
       
        <section className="w-full !bg-gradient-to-r !from-purple-300 !via-pink-300 !to-red-300 text-purple-500 rounded-3xl p-10 shadow-2xl mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Account Settings
          </h2>
          <p className="mt-3 text-lg text-white/90">
            Manage your profile information, update your details, and keep your
            account secure 
          </p>
        </section>

        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-zinc-900">
            Your Information
          </h3>

          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-300 text-zinc-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-300 text-zinc-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <span className="text-sm text-zinc-600">{message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

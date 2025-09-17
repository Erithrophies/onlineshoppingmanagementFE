"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Package, User, DollarSign } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get("http://localhost:3000/sellers/my-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:3000/sellers/products",
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts([...products, res.data]);
      setShowForm(false);
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-7 h-7 text-indigo-600" /> Seller Dashboard
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          <PlusCircle className="w-5 h-5" />
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </header>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Package className="w-10 h-10 text-indigo-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {products.length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <DollarSign className="w-10 h-10 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Estimated Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ${products.reduce((sum, p) => sum + p.price, 0)}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <User className="w-10 h-10 text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Account Type</p>
            <h3 className="text-2xl font-bold text-gray-800">Seller</h3>
          </div>
        </div>
      </section>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-xl shadow-md mb-10"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Add a New Product
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded-lg  text-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 text-zinc-700 focus:ring-indigo-500 outline-none"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            {/* <input
              type="text"
              placeholder="Image URL"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            /> */}
            <textarea
              placeholder="Description"
              className="p-3 border border-gray-300 rounded-lg text-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition"
          >
            Save Product
          </button>
        </form>
      )}

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-indigo-600" /> My Products
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

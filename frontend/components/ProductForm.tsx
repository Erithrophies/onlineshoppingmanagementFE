"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  sellerId: z.number().min(1, "Seller is required")
});

interface ProductFormProps {
  product?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    sellerId: product?.seller?.id || ''
  });
  const [sellers, setSellers] = useState<any[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/admin/sellers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSellers(response.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'sellerId' ? Number(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      productSchema.parse(formData);
      
      const token = localStorage.getItem('authToken');
      if (product) {
        // Update existing product (PUT)
        await axios.put(`http://localhost:3000/admin/product/${product.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new product (POST)
        await axios.post('http://localhost:3000/admin/product', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      onSuccess();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const newErrors: {[key: string]: string} = {};
        error.issues.forEach(err => {
          if (err.path) {
            newErrors[String(err.path[0])] = err.message;
          }
        });
        setErrors(newErrors);
      } else if (axios.isAxiosError(error)) {
        setErrors({ submit: error.response?.data?.message || 'An error occurred' });
      } else {
        setErrors({ submit: 'An unexpected error occurred' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                errors.price ? 'border-red-500' : ''
              }`}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Seller</label>
            <select
              name="sellerId"
              value={formData.sellerId}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
                errors.sellerId ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select a seller</option>
              {sellers.map(seller => (
                <option key={seller.id} value={seller.id}>
                  {seller.name || seller.shopName}
                </option>
              ))}
            </select>
            {errors.sellerId && <p className="mt-1 text-sm text-red-600">{errors.sellerId}</p>}
          </div>
          
          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}
          
          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl"
            >
              {isSubmitting ? 'Saving...' : (product ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
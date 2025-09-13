"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

interface Stats {
  users: number;
  sellers: number;
  products: number;
  orders: number;
  revenue: number;
}

export default function AdminSection() {
  const params = useParams();
  const section = params.section as string;
  
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState<Stats>({
    users: 0,
    sellers: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    fetchData();
  }, [section]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      let endpoint = '';
      
      switch (section) {
        case 'dashboard':
          const [usersRes, sellersRes, productsRes, ordersRes, paymentsRes] = await Promise.all([
            axios.get('http://localhost:3000/admin/users', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/admin/sellers', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/admin/products', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/admin/orders', {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get('http://localhost:3000/admin/payments', {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);

          const revenue = paymentsRes.data
            .filter((p: any) => p.status === 'completed')
            .reduce((sum: number, p: any) => sum + p.amount, 0);

          setStats({
            users: usersRes.data.length,
            sellers: sellersRes.data.length,
            products: productsRes.data.length,
            orders: ordersRes.data.length,
            revenue
          });
          break;
        case 'users':
          endpoint = 'http://localhost:3000/admin/users';
          break;
        case 'sellers':
          endpoint = 'http://localhost:3000/admin/sellers';
          break;
        case 'products':
          endpoint = 'http://localhost:3000/admin/products';
          break;
        case 'orders':
          endpoint = 'http://localhost:3000/admin/orders';
          break;
        case 'payments':
          endpoint = 'http://localhost:3000/admin/payments';
          break;
        default:
          window.location.href = '/admin/dashboard';
          return;
      }

      if (section !== 'dashboard') {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number, type: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3000/admin/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setData(data.filter((item: any) => item.id !== id));
      
      // Update stats if needed
      if (type === 'user' || type === 'product') {
        setStats(prev => ({
          ...prev,
          [type + 's']: prev[type + 's' as keyof Stats] as number - 1
        }));
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleUpdateSellerStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://localhost:3000/admin/seller/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setData(data.map((seller: any) =>
        seller.id === id ? { ...seller, status } : seller
      ));
    } catch (error) {
      console.error('Error updating seller status:', error);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingItem(product);
    setShowProductForm(true);
  };

  const handleFormSuccess = () => {
    setShowProductForm(false);
    setEditingItem(null);
    fetchData(); // Refresh data
  };

  const handleFormCancel = () => {
    setShowProductForm(false);
    setEditingItem(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Dashboard View */}
      {section === 'dashboard' && (
        <div>
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md mb-8">
            Admin Dashboard
          </h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <span className="text-2xl">🏪</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sellers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.sellers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.products}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.orders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <span className="text-2xl">💳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrency(stats.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users View */}
      {section === 'users' && (
        <div>
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md mb-8">
            Users Management
          </h1>
          
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">Manage all registered users in the system</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((user: any) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(user.id, 'user')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sellers View */}
      {section === 'sellers' && (
        <div>
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md mb-8">
            Sellers Management
          </h1>
          
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">Manage all sellers and their status</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((seller: any) => (
                    <tr key={seller.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {seller.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {seller.name || seller.shopName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {seller.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          seller.status === 'approved' ? 'bg-green-100 text-green-800' :
                          seller.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {seller.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <select
                          value={seller.status}
                          onChange={(e) => handleUpdateSellerStatus(seller.id, e.target.value)}
                          className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products View */}
      {section === 'products' && (
  <div>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-extrabold text-black drop-shadow-md">
        Products Management
      </h1>
      <button
        onClick={() => setShowProductForm(true)}
        className="bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
      >
        Add Product
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((product: any) => (
        <div
          key={product.id}
          className="bg-white bg-opacity-90 rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col"
        >
          <div className="w-full h-32 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
            {product.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
          <p className="text-xl font-semibold text-purple-700 mb-4">
            {formatCurrency(product.price)}
          </p>
          <div className="mt-auto flex space-x-2">
            <button
              onClick={() => handleEditProduct(product)}
              className="flex-1 py-2 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id, 'product')}
              className="flex-1 py-2 px-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

    {showProductForm && (
      <ProductForm
        product={editingItem}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    )}
  </div>
)}

      {/* Orders View */}
      {section === 'orders' && (
        <div>
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md mb-8">
            Orders Management
          </h1>
          
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">View and manage all orders</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((order: any) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.userId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payments View */}
      {section === 'payments' && (
        <div>
          <h1 className="text-4xl font-extrabold text-black drop-shadow-md mb-8">
            Payments Management
          </h1>
          
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <p className="text-sm text-gray-500">View all payment transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((payment: any) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{payment.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{payment.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



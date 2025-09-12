"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { sellerRegistrationSchema, SellerFormData } from "@/app/validation/validation";

export default function SellerRegisterForm() {
  const [formData, setFormData] = useState<SellerFormData>({
    username: "",
    email: "",
    shopName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SellerFormData, string>>>({});
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the changed field
    if (errors[name as keyof SellerFormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      sellerRegistrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof SellerFormData, string>> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof SellerFormData;
          newErrors[fieldName] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // API call to register the new seller
      const response = await axios.post("http://localhost:3000/sellers", formData, {
        timeout: 10000, // Timeout in case the server is not responding
      });

      if (response.status === 201) {
        setSuccessMessage("Seller registered successfully!");
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setApiError("Username or email already exists. Please choose a different one.");
        } else {
          setApiError(err.response.data?.message || "Registration failed. Please try again.");
        }
      } else if (axios.isAxiosError(err) && err.code === 'ECONNABORTED') {
        setApiError("Registration request timed out. The server is not responding.");
      } else {
        setApiError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="text-left">
      <h2 className="text-2xl font-semibold mb-6">Seller Registration</h2>
      <form onSubmit={handleRegister} noValidate>
        <div className="relative mb-6">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
        </div>


        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Email Address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.shopName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Shop Name"
          />
          {errors.shopName && <p className="text-red-500 text-sm mt-2">{errors.shopName}</p>}
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-6 text-lg font-bold rounded-full transition-colors duration-300
          ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
        >
          {isLoading ? "Registering..." : "Sign Up as Seller"}
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 p-3 rounded-lg text-center text-green-700 bg-green-100 border border-green-200">
          {successMessage}
        </div>
      )}
      {apiError && (
        <div className="mt-4 p-3 rounded-lg text-center text-red-700 bg-red-100 border border-red-200">
          {apiError}
        </div>
      )}
    </div>
  );
}

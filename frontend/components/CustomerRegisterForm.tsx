"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { customerRegistrationSchema, CustomerFormData } from "@/app/validation/validation";

export default function CustomerRegisterForm() {
  const [formData, setFormData] = useState<CustomerFormData>({
    username: "",
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});
  const [apiError, setApiError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as keyof CustomerFormData]: value
    });

   
    if (errors[name as keyof CustomerFormData]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      customerRegistrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof CustomerFormData;
          newErrors[fieldName] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  async function handleRegister(e: React.FormEvent) {
  e.preventDefault();
  setApiError("");
  setSuccessMessage("");

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    const response = await axios.post("http://localhost:3000/customers", formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    if (response.status === 201) {
      setSuccessMessage("Customer registered successfully!");
      
      
      const confirmed = window.confirm("Customer registered successfully! Click OK to go to the login page.");
      
      if (confirmed) {
        router.push("/login");
      }
    }
  } catch (err: any) {
    console.error("Error during registration:", err);
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 409) {
        setApiError("Username or email already exists.");
      } else {
        setApiError("Registration failed. Please try again.");
      }
    } else {
      setApiError("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="text-left">
      <h2 className="text-2xl font-semibold mb-6">Customer Registration</h2>
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
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Full Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
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
          {isLoading ? "Registering..." : "Sign Up as Customer"}
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
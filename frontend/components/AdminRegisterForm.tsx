"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { adminRegistrationSchema, AdminFormData } from "@/app/validation/validation";
export default function AdminRegisterForm() {
  const [formData, setFormData] = useState<AdminFormData>({
    username: "",
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdminFormData, string>>>({});
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    
    if (errors[name as keyof AdminFormData]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      adminRegistrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof AdminFormData, string>> = {};
        error.issues.forEach((err) => {
          const fieldName = err.path[0] as keyof AdminFormData;
          newErrors[fieldName] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setApiError("");
    
    try {
      const response = await axios.post("http://localhost:3000/admin/register", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      if (response.status === 201) {
        alert("Admin registered successfully!");
        router.push("/login");
      }
    } catch (err: any) {
      console.error("Full error object:", err);
      
      if (err.response) {
        console.error("Error data:", err.response.data);
        console.error("Error status:", err.response.status);
        
        if (err.response.status === 409) {
          setApiError("Username or email already exists.");
        } else if (err.response.status >= 500) {
          setApiError("Server error. Please try again later.");
        } else if (err.response.data && err.response.data.message) {
          setApiError(err.response.data.message);
        } else {
          setApiError(`Registration failed with status code: ${err.response.status}`);
        }
      } else if (err.request) {
        console.error("Error request:", err.request);
        setApiError("No response from server. Please check if the server is running.");
      } else {
        console.error("Error message:", err.message);
        setApiError("An error occurred: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
   <div className="text-left">
      <h2 className="text-2xl font-semibold mb-6">Admin Registration</h2>
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
          {isLoading ? "Registering..." : "Sign Up as Admin"}
        </button>
      </form>

      {apiError && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#f8d7da", color: "#721c24", borderRadius: "4px", border: "1px solid #f5c6cb" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Error:</p>
          <p style={{ margin: "5px 0 0 0" }}>{apiError}</p>
          <p style={{ margin: "5px 0 0 0", fontSize: "0.9em" }}>
            Check the browser console for more details.
          </p>
        </div>
      )}
    </div>
  );
}



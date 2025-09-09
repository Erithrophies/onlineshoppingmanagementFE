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
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Customer Registration</h2>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: errors.username ? "1px solid #dc3545" : "1px solid #ccc"
            }}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p style={{ color: "#dc3545", margin: "5px 0 0 0", fontSize: "0.9em" }}>
              {errors.username}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: errors.name ? "1px solid #dc3545" : "1px solid #ccc"
            }}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p style={{ color: "#dc3545", margin: "5px 0 0 0", fontSize: "0.9em" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: errors.email ? "1px solid #dc3545" : "1px solid #ccc"
            }}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p style={{ color: "#dc3545", margin: "5px 0 0 0", fontSize: "0.9em" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: errors.password ? "1px solid #dc3545" : "1px solid #ccc"
            }}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p style={{ color: "#dc3545", margin: "5px 0 0 0", fontSize: "0.9em" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            background: isLoading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Registering..." : "Sign Up as Customer"}
        </button>
      </form>

      {successMessage && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#d4edda", color: "#155724", borderRadius: "4px", border: "1px solid #c3e6cb" }}>
          <p style={{ margin: 0 }}>{successMessage}</p>
        </div>
      )}

      {apiError && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#f8d7da", color: "#721c24", borderRadius: "4px", border: "1px solid #f5c6cb" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>Error:</p>
          <p style={{ margin: "5px 0 0 0" }}>{apiError}</p>
        </div>
      )}
    </div>
  );
}
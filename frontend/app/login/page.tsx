"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/validation/validation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    console.log("Login button clicked!");
    e.preventDefault();
    setFormErrors({});
    setGeneralError("");
    setIsSubmitting(true);
    setLoginSuccess(false);

    try {
      
      loginSchema.parse({ username, password });

      const response = await axios.post("http://localhost:3000/auth/login", { username, password }, {
        timeout: 10000,
      });

      if (response.status === 201) {
        setLoginSuccess(true);
        setUsername("");
        setPassword("");

        const { access_token, role } = response.data;

        localStorage.setItem('authToken', access_token);

        setTimeout(() => {
          if (role === 'admin') {
            router.push("/admin");
          } else if (role === 'seller') {
            router.push("/Seller");
          } else {
            router.push("/Customer");
          }
        }, 1500);
      } else {
        setGeneralError("Login failed. Please try again.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setGeneralError(err.response.data.message || "An error occurred during login.");
      } else if (axios.isAxiosError(err) && err.code === 'ECONNABORTED') {
        setGeneralError("Login request timed out. The server is not responding.");
      } else if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.issues.forEach((issue) => {
          errors[issue.path[0] as string] = issue.message;
        });
        setFormErrors(errors);
      } else {
        setGeneralError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-gray-800 p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold mt-20 mb-16 text-left">
          Sign in for faster buy or sell.
        </h1>
        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
          <form onSubmit={handleLogin} noValidate>
            
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  formErrors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Username"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-2">{formErrors.username}</p>
              )}
            </div>

            
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-4 px-4 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>
              )}
            </div>

            
            <button
              type="submit"
              className={`w-full py-3 px-6 text-lg font-bold rounded-full transition-colors duration-300
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          
          {loginSuccess && (
            <div className="mt-4 p-3 rounded-lg text-center text-green-700 bg-green-100 border border-green-200">
              Login successful! Redirecting...
            </div>
          )}
          {generalError && (
            <div className="mt-4 p-3 rounded-lg text-center text-red-700 bg-red-100 border border-red-200">
              {generalError}
            </div>
          )}

          <br />
          <div className="text-blue-600 text-sm mb-4">
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">
              Don't have an Account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Create Your Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

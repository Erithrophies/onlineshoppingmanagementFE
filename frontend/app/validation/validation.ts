import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string(),
  password: z
    .string()
});

export const adminRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

export const customerRegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 2  0 characters")
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Username must start with an alphabet and can only contain letters, numbers, and underscores"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
});

export const sellerRegistrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  shopName: z.string().min(3, "Shop name must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export type AdminFormData = z.infer<typeof adminRegistrationSchema>;
export type CustomerFormData = z.infer<typeof customerRegistrationSchema>;
export type SellerFormData = z.infer<typeof sellerRegistrationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(4, { message: "Password length must be at least 4 characters" }),
});

export const productSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  price: z.number().min(1, { message: "Price must be at least $1" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  categoryId: z
    .number({ message: "Category must be selected" })
    .min(1, { message: "Category must be selected" }),
  images: z.array(z.string()),
});
export type TProductForm = z.infer<typeof productSchema>;

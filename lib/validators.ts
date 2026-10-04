import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const adSchema = z.object({
  productName: z.string().min(2, 'Product name is required'),
  language: z.enum(['en', 'hi']).default('en'),
  platform: z.enum(['facebook', 'instagram', 'whatsapp']).default('facebook'),
  brief: z.string().optional(),
});

export const campaignSchema = z.object({
  name: z.string().min(2, 'Campaign name is required'),
  description: z.string().optional(),
  budget: z.coerce.number().min(0, 'Budget must be positive'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  targetAudience: z.string().optional(),
});

export const posterSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  theme: z.enum(['Minimal', 'Luxury', 'Bold', 'Festive']),
  layout: z.enum(['Square', 'Landscape', 'Portrait']),
});

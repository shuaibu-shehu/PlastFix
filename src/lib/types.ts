import { z } from 'zod';

export const addLogItemSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name must be at most 100 characters long" }),
    weight: z.number()
        .min(0.1, { message: "Weight must be at least 0.1 kg" })
        .max(1000, { message: "Weight must be at most 1000 kg" }),
    quantity: z.number()
        .min(1, { message: "Quantity must be at least 1" })
        .max(1000, { message: "Quantity must be at most 1000" }),
    category: z.enum(['Single-Use', 'Recyclables', 'Non-Recyclables'], {
        required_error: "Category is required",
    }),
});

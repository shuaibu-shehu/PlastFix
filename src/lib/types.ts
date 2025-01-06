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
export interface PlasticItem {
  id?: string;
  name: string;
  quantity: number;
  weight: number;
  type: string;
}

export interface PlasticType {
  id: PlasticItem['type'];
  label: string;
  color: string;
}

export interface PlasticLoggerDialogProps {
  trigger: React.ReactNode;
  onSubmit?: (items: PlasticItem[]) => void;
}





export interface PlasticItem {
  Name: string;
  Quantity: number;
  Type: 'Non-recyclable' | 'Recyclable' | 'Single-use';
  Weight: number;
  Created_At: string;
}

export interface DailyData {
  date: string;
  totalWeight: number;
  recyclableWeight: number;
  nonRecyclableWeight: number;
  singleUseWeight: number;
}

export interface WeeklyData {
  startDate: string;
  endDate: string;
  totalWeight: number;
  totalQuantity: number;
  singleUseWeight: number;
  recyclableWeight: number;
  nonRecyclableWeight: number;
  dailyData: DailyData[];
}


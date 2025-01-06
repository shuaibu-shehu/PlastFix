import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import { PlasticItem, WeeklyData, DailyData } from './types';

export const processWeeklyData = (data: PlasticItem[]): WeeklyData => {
  const sortedData = data.sort((a, b) => new Date(a.Created_At).getTime() - new Date(b.Created_At).getTime());
  const startDate = new Date(sortedData[0].Created_At);
  const endDate = new Date(sortedData[sortedData.length - 1].Created_At);

  let totalWeight = 0;
  let totalQuantity = 0;
  let singleUseWeight = 0;
  let recyclableWeight = 0;
  let nonRecyclableWeight = 0;

  const dailyData: { [key: string]: DailyData } = {};

  sortedData.forEach(item => {
    const date = new Date(item.Created_At).toISOString().split('T')[0];
    totalWeight += item.Weight;
    totalQuantity += item.Quantity;

    if (!dailyData[date]) {
      dailyData[date] = {
        date,
        totalWeight: 0,
        recyclableWeight: 0,
        nonRecyclableWeight: 0,
        singleUseWeight: 0
      };
    }

    dailyData[date].totalWeight += item.Weight;

    switch (item.Type) {
      case 'Single-use':
        singleUseWeight += item.Weight;
        dailyData[date].singleUseWeight += item.Weight;
        break;
      case 'Recyclable':
        recyclableWeight += item.Weight;
        dailyData[date].recyclableWeight += item.Weight;
        break;
      case 'Non-recyclable':
        nonRecyclableWeight += item.Weight;
        dailyData[date].nonRecyclableWeight += item.Weight;
        break;
    }
  });

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    totalWeight,
    totalQuantity,
    singleUseWeight,
    recyclableWeight,
    nonRecyclableWeight,
    dailyData: Object.values(dailyData)
  };
};

export const getUsageCategory = (totalWeight: number): 'Good' | 'Average' | 'Bad' => {
  if (totalWeight < 1) return 'Good';
  if (totalWeight <= 3) return 'Average';
  return 'Bad';
};

export const getCategoryColor = (category: 'Good' | 'Average' | 'Bad'): string => {
  switch (category) {
    case 'Good':
      return 'text-green-600 bg-green-100';
    case 'Average':
      return 'text-yellow-600 bg-yellow-100';
    case 'Bad':
      return 'text-red-600 bg-red-100';
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};


import React from 'react';
import { WeeklyData } from '../../lib/types';
import { Card, CardContent } from "@/components/ui/card";

interface SummarySectionProps {
    weeklyData: WeeklyData;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ weeklyData }) => {
    const totalWeight = weeklyData.totalWeight.toFixed(2);
    const singleUsePercentage = ((weeklyData.singleUseWeight / weeklyData.totalWeight) * 100).toFixed(1);
    const recyclablePercentage = ((weeklyData.recyclableWeight / weeklyData.totalWeight) * 100).toFixed(1);
    const nonRecyclablePercentage = ((weeklyData.nonRecyclableWeight / weeklyData.totalWeight) * 100).toFixed(1);

    return (
        <Card>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Total Weight:</p>
                        <p className="text-xl font-bold">{totalWeight} kg</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Total Items:</p>
                        <p className="text-xl font-bold">{weeklyData.totalQuantity}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Single-use:</p>
                        <p className="text-lg">{weeklyData.singleUseWeight.toFixed(2)} kg ({singleUsePercentage}%)</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Recyclable:</p>
                        <p className="text-lg">{weeklyData.recyclableWeight.toFixed(2)} kg ({recyclablePercentage}%)</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Non-recyclable:</p>
                        <p className="text-lg">{weeklyData.nonRecyclableWeight.toFixed(2)} kg ({nonRecyclablePercentage}%)</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


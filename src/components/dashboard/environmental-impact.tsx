import React from 'react';
import { WeeklyData } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Droplet } from 'lucide-react';

interface EnvironmentalImpactProps {
    weeklyData: WeeklyData;
}

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ weeklyData }) => {
    // Approximate calculations (for demonstration purposes)
    const co2Equivalent = (weeklyData.totalWeight * 6).toFixed(2); // 6 kg CO2 per 1 kg plastic
    const plasticBagsEquivalent = Math.round(weeklyData.totalWeight / 0.005); // Assuming 5g per plastic bag

    return (
        <Card>
            <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <Leaf className="w-8 h-8 text-green-500 mr-2" />
                        <div>
                            <p className="text-sm text-gray-600">CO₂ Equivalent:</p>
                            <p className="text-lg font-semibold">{co2Equivalent} kg</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Droplet className="w-8 h-8 text-blue-500 mr-2" />
                        <div>
                            <p className="text-sm text-gray-600">Plastic Bags Equivalent:</p>
                            <p className="text-lg font-semibold">{plasticBagsEquivalent}</p>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    Tip: Reduce your impact by choosing reusable items and properly recycling when possible.
                </p>
            </CardContent>
        </Card>
    );
};


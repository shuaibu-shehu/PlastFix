import React from 'react';
import { WeeklyData } from '../../lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImprovementAreasProps {
    weeklyData: WeeklyData;
}

export const ImprovementAreas: React.FC<ImprovementAreasProps> = ({ weeklyData }) => {
    const highestUsageType =
        weeklyData.singleUseWeight > weeklyData.recyclableWeight && weeklyData.singleUseWeight > weeklyData.nonRecyclableWeight
            ? 'Single-use'
            : weeklyData.recyclableWeight > weeklyData.nonRecyclableWeight
                ? 'Recyclable'
                : 'Non-recyclable';

    const suggestions = {
        'Single-use': 'Switch to reusable alternatives like cloth bags and metal water bottles.',
        'Recyclable': 'Ensure proper recycling and consider products with less packaging.',
        'Non-recyclable': 'Look for products with recyclable or biodegradable packaging.'
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-2">Highest usage: <strong>{highestUsageType}</strong> plastics</p>
                <p>Suggestion: {suggestions[highestUsageType]}</p>
            </CardContent>
        </Card>
    );
};


import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyData } from '../../lib/types';

interface TrendVisualizationProps {
    dailyData: DailyData[];
}

export const TrendVisualization: React.FC<TrendVisualizationProps> = ({ dailyData }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Plastic Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="singleUseWeight" stackId="a" fill="#FFA07A" name="Single-use" />
                        <Bar dataKey="recyclableWeight" stackId="a" fill="#98FB98" name="Recyclable" />
                        <Bar dataKey="nonRecyclableWeight" stackId="a" fill="#DDA0DD" name="Non-recyclable" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};


'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlasticItem, WeeklyData } from '../../lib/types';
import { processWeeklyData } from '../../lib/utils';
import { HeaderSection } from './header-section';
import { SummarySection } from './summary-section';
import { ImprovementAreas } from './improvement-areas';
import { EnvironmentalImpact } from './environmental-impact';
import useItemStore from '@/hooks/itemStore';
import { TrendVisualization } from './trend-visualisation';


interface WeeklyReportProps {
    data: PlasticItem[];
}

export const WeeklyReport: React.FC<WeeklyReportProps> = ({ data }) => {
        const {items} = useItemStore()
    const weeklyData: WeeklyData = processWeeklyData(data);

    return (
        <Card className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="text-2xl font-bold text-green-800">Weekly Plastic Usage Report</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <HeaderSection weeklyData={weeklyData} />
                <SummarySection weeklyData={weeklyData} />
                
                {/* <TrendVisualization dailyData={weeklyData.dailyData} /> */}
                <ImprovementAreas weeklyData={weeklyData} />
                <EnvironmentalImpact weeklyData={weeklyData} />
            </CardContent>
        </Card>
    );
};


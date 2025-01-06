import { ImpactMetrics } from '@/components/dashboard/impact-metrics';
import { Overview } from '@/components/dashboard/overview';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type Highlight = {
    title: string;
    description: string;
};

type Impact = {
    metric: string;
    value: string;
};

const highlights: Highlight[] = [
    {
        title: 'Most Plastic Usage',
        description: 'Friday had the highest usage with 8 items.',
    },
    {
        title: 'Least Plastic Usage',
        description: 'Thursday had the least usage with 3 items.',
    },
    {
        title: 'Average Weekly Usage',
        description: 'Your average daily plastic usage was 5.43 items.',
    },
];

const environmentalImpact: Impact[] = [
    { metric: 'CO₂ Emissions Saved', value: '3.5 kg' },
    { metric: 'Recyclable Items Used', value: '15 items' },
    { metric: 'Non-Recyclable Items', value: '12 items' },
];

const ReportMainPage: React.FC = () => {
    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <
        </div>
    );
};

export default ReportMainPage;

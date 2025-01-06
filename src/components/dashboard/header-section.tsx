import React from 'react';
import { WeeklyData } from '../../lib/types';
import { formatDate, getUsageCategory, getCategoryColor } from '../../lib/utils';
import { Badge } from "@/components/ui/badge";

interface HeaderSectionProps {
    weeklyData: WeeklyData;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ weeklyData }) => {
    const category = getUsageCategory(weeklyData.totalWeight);

    return (
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold text-gray-800">
                    {formatDate(weeklyData.startDate)} - {formatDate(weeklyData.endDate)}
                </h2>
            </div>
            <Badge className={`${getCategoryColor(category)} px-3 py-1 text-sm font-medium rounded-full`}>
                {category}
            </Badge>
        </div>
    );
};


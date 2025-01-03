'use client';

import {Progress} from '@/components/ui/progress';

const metrics = [
  {
    name: 'Ocean Plastic Prevention',
    value: 75,
    description: 'Equivalent to 30 plastic bottles',
  },
  {
    name: 'Carbon Footprint Reduction',
    value: 60,
    description: '3.2 kg CO₂e prevented',
  },
  {
    name: 'Recycling Rate',
    value: 85,
    description: 'Above average by 15%',
  },
];

export function ImpactMetrics() {
  return (
    <div className='space-y-4'>
      {metrics.map((metric) => (
        <div key={metric.name} className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='font-medium'>{metric.name}</span>
            <span className='text-muted-foreground'>{metric.value}%</span>
          </div>
          <Progress value={metric.value} className='h-2' />
          <p className='text-xs text-muted-foreground'>{metric.description}</p>
        </div>
      ))}
    </div>
  );
}

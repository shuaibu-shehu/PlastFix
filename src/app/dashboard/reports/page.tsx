import {ImpactMetrics} from '@/components/dashboard/impact-metrics';
import {Overview} from '@/components/dashboard/overview';
import {RecentActivity} from '@/components/dashboard/recent-activity';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
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
  {metric: 'CO₂ Emissions Saved', value: '3.5 kg'},
  {metric: 'Recyclable Items Used', value: '15 items'},
  {metric: 'Non-Recyclable Items', value: '12 items'},
];

const ReportPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-full mx-auto bg-white shadow-md rounded-lg p-3 '>
        {/* Highlights Section */}
        <section className='mt-8'>
          <h2 className='text-xl font-semibold text-gray-700'>Highlights</h2>
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className='bg-blue-50 border border-blue-100 p-4 rounded-lg shadow-sm'>
                <h3 className='text-md font-medium text-blue-600'>
                  {highlight.title}
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Environmental Impact Section */}
        <section className='mt-8'>
          <h2 className='text-xl font-semibold text-gray-700'>
            Environmental Impact
          </h2>
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {environmentalImpact.map((impact, index) => (
              <div
                key={index}
                className='bg-green-50 border border-green-100 p-4 rounded-lg shadow-sm'>
                <h3 className='text-md font-medium text-green-600'>
                  {impact.metric}
                </h3>
                <p className='text-lg font-semibold text-gray-800'>
                  {impact.value}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Trends Section */}{' '}
        <div className='grid gap-4 md:grid-cols-2 mt-10'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Impact Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ImpactMetrics />
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportPage;

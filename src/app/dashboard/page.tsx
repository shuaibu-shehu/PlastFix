'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import {WasteDistribution} from '@/components/dashboard/waste-distribution';
import Newsfeed from '@/components/caresoul/newfeed';

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Plastic Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>2.5 kg</div>
            <p className='text-xs text-muted-foreground'>
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Recyclables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>1.8 kg</div>
            <p className='text-xs text-muted-foreground'>72% of total waste</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Single-Use Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-600'>0.4 kg</div>
            <p className='text-xs text-muted-foreground'>
              -15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-600'>3.2 CO₂e</div>
            <p className='text-xs text-muted-foreground'>Emissions prevented</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Todays Plastic usage</CardTitle>
          </CardHeader>
          <CardContent>
            <WasteDistribution />
          </CardContent>
        </Card>
        <div className='col-span-4'>
          <Newsfeed />
        </div>
      </div>
    </div>
  );
}

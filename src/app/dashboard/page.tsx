'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {Overview} from '@/components/dashboard/overview';

import {WasteDistribution} from '@/components/dashboard/waste-distribution';
import DailyOverview from '@/components/dashboard/daily-overview';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PlasticLoggerDialog from '@/components/plasticlogger';
import { PlasticItem } from '@/lib/types';
import { addItem } from '@/lib/actions/actions';
import { useModal } from '@/hooks/modal-store';
import { useSession } from 'next-auth/react';
export default function DashboardPage() {
  const { onOpen } = useModal()
  const user = useSession().data?.user
  const handleSubmit =async (item: PlasticItem[]) => {
    // Handle the submitted items here
    console.log('user :', user);
    
    console.log('Logged items:', item);
    await addItem(item, user?.email);
  };

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
            <PlasticLoggerDialog
              trigger={<Button className=' float-end' variant="default"><Plus/></Button>}
              onSubmit={handleSubmit}
              />
            {/* <Button
              onClick={() => {
                  onOpen("logItem")
              }}
              className=' float-end' variant="default"><Plus /></Button> */}
            <WasteDistribution />
          </CardContent>
        </Card>
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
}

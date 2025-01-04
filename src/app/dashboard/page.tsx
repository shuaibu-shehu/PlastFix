'use client';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {WasteDistribution} from '@/components/dashboard/waste-distribution';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import PlasticLoggerDialog from '@/components/plasticlogger';
import {PlasticItem} from '@/lib/types';
import {useSession} from 'next-auth/react';
import Newsfeed from '@/components/caresoul/newfeed';
import {useEffect, useState} from 'react';
import {addItem, getPlasticItems} from '@/lib/actions/actions';

export default function DashboardPage() {
  const [items, setItems] = useState([]);

  const user = useSession().data?.user;

  const handleAddItem = async (item: PlasticItem[]) => {
    console.log(user);
    console.log(item);
    const result = await addItem(item, user?.email);
    console.log('response from db', result);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Get today's date in the required format (e.g., YYYY-MM-DD)
        const today = new Date().toISOString();
        console.log("Today's Date:", today);

        // Fetch items using today's date
        const allItems = await getPlasticItems(today);

        console.log('the items are', allItems);
        setItems(allItems);
      } catch (error) {
        console.error('Error fetching plastic items:', error);
      }
    };

    fetchItems(); // Call the async function
  }, []);

  const totalWeight = items.reduce(
    (sum, item) => sum + parseFloat(item.weight) * item.quantity,
    0
  );

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
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Todays Plastic Usage</CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                Track your daily plastic consumption
              </p>
            </div>

            <PlasticLoggerDialog
              trigger={
                <Button variant='default' size='icon'>
                  <Plus className='h-4 w-4' />
                </Button>
              }
              onSubmit={handleAddItem}
            />
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='md:col-span-1'>
              <WasteDistribution data={items} />
              <div className='space-y-2 '>
                <div className='bg-secondary p-4 rounded-lg'>
                  <h3 className='font-semibold mb-2'>Today's Statistics</h3>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div>
                      <p className='text-muted-foreground'>Total Items</p>
                      <p className='font-medium'>{items.length}</p>
                    </div>
                    <div>
                      <p className='text-muted-foreground'>Total Weight</p>
                      <p className='font-medium'>{totalWeight.toFixed(2)}g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='font-semibold'>Recent Items</h3>
              <div className='max-h-[200px] overflow-y-auto space-y-2'>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className='bg-secondary/50 p-2 rounded-md flex items-center justify-between'>
                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {item.type} • {item.weight}g × {item.quantity}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.type === 'recyclable'
                          ? 'bg-green-100 text-green-700'
                          : item.type === 'single-use'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                      {item.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className='col-span-4'>
          <Newsfeed />
        </div>
      </div>
    </div>
  );
}

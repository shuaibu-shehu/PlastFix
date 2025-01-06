'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useMemo, useEffect, useState } from 'react';
import useItemStore from '@/hooks/itemStore';

// Define the BaseDataItem interface
interface BaseDataItem {
  name: string;
  value: number;
  baseColor: string;
  activeColor: string;
}

// fecaca - non-recyclable
// fde68a - single use
export function WasteDistribution() {
  const { items } = useItemStore();
  const [itemsCreatedToday, setItemsCreatedToday] = useState<any[]>([]); // Adjust type as necessary
  const [baseData, setBaseData] = useState<BaseDataItem[]>([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const filteredItems = items.filter(item => {
      const createdAtDate = new Date(item.createdAt);
      // Check if createdAtDate is valid
      if (isNaN(createdAtDate.getTime())) return false; // Skip invalid dates
      const res = createdAtDate.toISOString().split('T')[0] === today;

      console.log('res', res);

      return res;
    });

    setItemsCreatedToday(filteredItems); // Update itemsCreatedToday state

    setBaseData([
      {
        name: 'Single-use',
        value: filteredItems.reduce((sum, item) => sum + (item.type === 'single-use' ? item.weight : 0), 0),
        baseColor: '#fde68a',
        activeColor: '#f97316'
      },
      {
        name: 'Recyclable',
        value: filteredItems.reduce((sum, item) => sum + (item.type === 'recyclable' ? item.weight : 0), 0),
        baseColor: '#bbf7d0',
        activeColor: '#16a34a'
      },
      {
        name: 'Non-recyclable',
        value: filteredItems.reduce((sum, item) => sum + (item.type === 'non-recyclable' ? item.weight : 0), 0),
        baseColor: '#fecaca',
        activeColor: '#dc2626',
      },
    ]);
  }, [items]); // Dependency array to trigger effect when items change

  const total = useMemo(
    () => {
      return itemsCreatedToday.reduce((sum, item) => sum + item.weight, 0)
    },
    [itemsCreatedToday]
  );

  return (
    <div className='h-[350px] w-full flex flex-col items-center'>
             {itemsCreatedToday.length > 0 && <p className="text-center text-4xl "> Added Items {itemsCreatedToday.length}</p>}

      <ResponsiveContainer width='100%' height='100%'>
       
        <PieChart>
          <Pie
            data={baseData}
            cx='50%'
            cy='50%'
            innerRadius={90}
            outerRadius={120}
            paddingAngle={0}
            dataKey='value'>
            {baseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.value > 0 ? entry.activeColor : entry.baseColor}
              />
            ))}
          </Pie>
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            className='text-lg font-semibold text-gray-700'>
            {`${total.toFixed(2)} grams`}
          </text>
        </PieChart>
      </ResponsiveContainer>
      <div className='mt-4 flex justify-center gap-4'>
        {baseData.map((item) => (
          <div key={item.name} className='flex items-center gap-2'>
            <div
              className='h-3 w-3 rounded-full'
              style={{
                backgroundColor:
                  item.value > 0 ? item.activeColor : item.baseColor,
              }}
            />
            <span className='text-sm text-gray-600'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

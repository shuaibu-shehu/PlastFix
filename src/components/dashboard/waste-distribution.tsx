'use client';

import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts';
import {useMemo} from 'react';

const baseData = [
  {name: 'Single-use', value: 10, baseColor: '#fde68a', activeColor: '#f97316'},
  {name: 'Recyclable', value: 60, baseColor: '#bbf7d0', activeColor: '#16a34a'},
  {
    name: 'Non-recyclable',
    value: 20,
    baseColor: '#fecaca',
    activeColor: '#dc2626',
  },
];

export function WasteDistribution() {
  const total = useMemo(
    () => baseData.reduce((sum, item) => sum + item.value, 0),
    [baseData]
  );

  return (
    <div className='h-[350px] w-full flex flex-col items-center'>
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
            {`${total} grams`}
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

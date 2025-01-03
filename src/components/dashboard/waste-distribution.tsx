'use client';

import {Cell, Pie, PieChart, ResponsiveContainer} from 'recharts';

const data = [
  {name: 'Single-use', value: 20, color: '#f97316'},
  {name: 'Recyclable', value: 60, color: '#16a34a'},
  {name: 'Non-recyclable', value: 20, color: '#dc2626'},
];

export function WasteDistribution() {
  return (
    <div className='h-[350px] w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={0}
            outerRadius={80}
            paddingAngle={0}
            dataKey='value'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='mt-4 flex justify-center gap-4'>
        {data.map((item) => (
          <div key={item.name} className='flex items-center gap-2'>
            <div
              className='h-3 w-3 rounded-full'
              style={{backgroundColor: item.color}}
            />
            <span className='text-sm text-gray-600'>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

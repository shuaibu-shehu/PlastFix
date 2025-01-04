'use client';

import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import {useMemo} from 'react';

const baseData = [
  {name: 'Single-use', value: 10, baseColor: '#fde68a', activeColor: '#f97316'},
  {name: 'Recyclable', value: 10, baseColor: '#bbf7d0', activeColor: '#16a34a'},
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
    <div className='h-[250px] w-full flex flex-col items-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={baseData}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={80}
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
          <Tooltip formatter={(value, name) => [`${value} grams`, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

'use client';

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';

const data = [
  {
    name: 'Mon',
    total: 0.4,
  },
  {
    name: 'Tue',
    total: 0.3,
  },
  {
    name: 'Wed',
    total: 0.2,
  },
  {
    name: 'Thu',
    total: 0.5,
  },
  {
    name: 'Fri',
    total: 0.3,
  },
  {
    name: 'Sat',
    total: 0.2,
  },
  {
    name: 'Sun',
    total: 0.4,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-green-600'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

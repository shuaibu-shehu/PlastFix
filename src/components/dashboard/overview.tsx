'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const data = [
  {name: 'Mon', singleUse: 0.2, recyclable: 0.1, nonRecyclable: 0.1},
  {name: 'Tue', singleUse: 0.1, recyclable: 0.1, nonRecyclable: 0.1},
  {name: 'Wed', singleUse: 0.05, recyclable: 0.1, nonRecyclable: 0.05},
  {name: 'Thu', singleUse: 0.2, recyclable: 0.2, nonRecyclable: 0.1},
  {name: 'Fri', singleUse: 0.1, recyclable: 0.1, nonRecyclable: 0.1},
  {name: 'Sat', singleUse: 0.05, recyclable: 0.1, nonRecyclable: 0.05},
  {name: 'Sun', singleUse: 0.15, recyclable: 0.15, nonRecyclable: 0.1},
];

export function Overview() {
  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-lg font-semibold text-gray-700 mb-4'>
        Weekly Plastic Usage
      </h2>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
          <XAxis
            dataKey='name'
            stroke='#4a5568'
            fontSize={14}
            tickLine={false}
            axisLine={{stroke: '#cbd5e0', strokeWidth: 1}}
          />
          <YAxis
            stroke='#4a5568'
            fontSize={14}
            tickLine={false}
            axisLine={{stroke: '#cbd5e0', strokeWidth: 1}}
            tickFormatter={(value) => `${value}kg`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f7fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
            }}
            itemStyle={{color: '#2d3748'}}
            formatter={(value) => `${value}kg`}
          />
          <Legend
            verticalAlign='top'
            height={36}
            wrapperStyle={{color: '#2d3748', fontSize: 14}}
          />
          <Bar
            dataKey='singleUse'
            stackId='a'
            fill='#F28B82'
            radius={[0, 0, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey='recyclable'
            stackId='a'
            fill='#FDD663'
            radius={[0, 0, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey='nonRecyclable'
            stackId='a'
            fill='#81C995'
            radius={[0, 0, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

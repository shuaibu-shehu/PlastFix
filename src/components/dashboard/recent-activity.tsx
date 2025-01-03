'use client';

import {Avatar} from '@/components/ui/avatar';
import {ScrollArea} from '@/components/ui/scroll-area';

const activities = [
  {
    id: 1,
    type: 'Logged plastic bottle',
    category: 'Single-use',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'Recycled packaging',
    category: 'Recyclable',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'Used reusable bag',
    category: 'Prevention',
    time: '5 hours ago',
  },
  {
    id: 4,
    type: 'Composted waste',
    category: 'Organic',
    time: '1 day ago',
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className='h-[350px]'>
      <div className='space-y-4'>
        {activities.map((activity) => (
          <div key={activity.id} className='flex items-center gap-4'>
            <Avatar className='h-9 w-9 bg-green-100'>
              <span className='text-xs text-green-600'>
                {activity.category.charAt(0)}
              </span>
            </Avatar>
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium'>{activity.type}</p>
              <p className='text-xs text-muted-foreground'>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

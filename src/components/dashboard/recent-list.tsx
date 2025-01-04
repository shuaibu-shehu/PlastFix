import {getPlasticItems} from '@/lib/actions/actions';
import React from 'react';

async function RecentList() {
  // const list = await getPlasticItems()
  return (
    <div>
      {' '}
      {/* Recent Items Section */}
      <div className='flex-1'>
        <h2 className='text-xl font-bold mb-4'>Recent Items</h2>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='font-bold'>{recentItem.name}</h3>
              <p className='text-gray-500'>
                RECYCLABLE • {recentItem.weight}g × {recentItem.quantity}
              </p>
            </div>
            <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm'>
              {recentItem.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentList;

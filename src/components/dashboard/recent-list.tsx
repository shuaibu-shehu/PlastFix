'use client'
import useItemStore from '@/hooks/itemStore';
import { getPlasticItems } from '@/lib/actions/actions'
import React, { useEffect, useState } from 'react'

 function RecentList() {
   const { items } = useItemStore();
   const [itemsCreatedToday, setItemsCreatedToday] = useState<any[]>([]); // Adjust type as necessary

   useEffect(() => {
     const today = new Date().toISOString().split('T')[0];
     const filteredItems = items.filter(item => {
       const createdAtDate = new Date(item.createdAt);
       // Check if createdAtDate is valid
       if (isNaN(createdAtDate.getTime())) return false; // Skip invalid dates
       const res = createdAtDate.toISOString().split('T')[0] === today;

       console.log('res', res);

       return res;
     }).slice(0, 5); // Limit to 5 items

     setItemsCreatedToday(filteredItems); // Update itemsCreatedToday state

  
   }, [items]); // Dependency array to trigger effect when items change



   return (
     <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Items Created Today</h2>
            {itemsCreatedToday.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Weight (kg)</th>
                            <th className="py-2 px-4 border-b">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsCreatedToday.map(item => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b">{item.quantity}</td>
                                <td className="py-2 px-4 border-b">{item.weight}</td>
                                <td className="py-2 px-4 border-b">{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No items created today.</p>
            )}
        </div>
  )
}

export default RecentList
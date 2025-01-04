'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from '@/components/dashboard/overview';
import { WasteDistribution } from '@/components/dashboard/waste-distribution';
// import DailyOverview from '@/components/dashboard/daily-overview';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PlasticLoggerDialog from '@/components/plasticlogger';
import { PlasticItem } from '@/lib/types';
import { addItem } from '@/lib/actions/actions';
import { useModal } from '@/hooks/modal-store';
import { useEffect } from 'react';
import useItemStore from '@/hooks/itemStore';
import { format, set } from 'date-fns';
import usePlasticStatsStore from '@/hooks/plasticStatsStore';
const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const getPreviousMonthDate = (monthsAgo: number) => {
    const now = new Date(); // Current date
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 for January, 11 for December

    // Calculate the month and year for the specified months ago
    const previousMonth = (currentMonth - monthsAgo + 12) % 12; // Calculate the previous month
    const year = currentYear + Math.floor((currentMonth - monthsAgo) / 12); // Adjust the year if necessary

    // Create a date for the first day of the previous month
    const firstDayOfPreviousMonth = new Date(year, previousMonth, 1);

    return firstDayOfPreviousMonth.toISOString(); // Returns the date in ISO format
};

export default function DashboardPage({ user, items }: { user: any, items: any }) {
    const { setItems, items: itemsStore, addItem:addItemStore } = useItemStore();
    // const { setPlasticStats } = usePlasticStatsStore();
    const {setPlasticStats, recyclableCompareLastMonth, recyclableWeight, recyclablePercentage, nonRecyclableCompareLastMonth, nonRecyclableWeight, nonRecyclablePercentage, singleUseCompareLastMonth, singleUseWeight, singleUsePercentage } = usePlasticStatsStore();

    const handleSubmit = async (item: PlasticItem[]) => {
        await addItem(item, user?.email);
        const updatedItems = [...itemsStore, ...item]; // Combine existing items with the new item(s)
        setItems(updatedItems); // Update the items store
        for (let i = 0; i < item.length; i++) {
            addItemStore(item[i]);
        }
        calculatePlasticStats(updatedItems);
        window.location.reload();
    };


    const compareLastTwoMonths = (type) => {

        const lastMonth = items.filter(item => {
            // item.createdAt >= getPreviousMonthDate(0)        
            const dateObject = new Date(item.createdAt);
            const formattedDate = format(dateObject, 'yyyy-MM-dd')
            const date1 = formattedDate.slice(0, 7)
            const date2 = getPreviousMonthDate(0).split('T')[0].slice(0, 7)
            const res = date1 == date2 && item.type == type;

            return res
        })

        const currentMonth = items.filter(item => {
            // item.createdAt >= getPreviousMonthDate(0)        
            const dateObject = new Date(item.createdAt);
            const formattedDate = format(dateObject, 'yyyy-MM-dd')
            const date1 = formattedDate.slice(0, 7)
            const date2 = getPreviousMonthDate(-1).split('T')[0].slice(0, 7)
            const res = date1 == date2 && item.type == type;

            return res
        })

        const currentMonthWeight = currentMonth.reduce((total, item) => total + item.weight, 0);
        const lastMonthWeight = lastMonth.reduce((total, item) => total + item.weight, 0);
        console.log('Current:', currentMonthWeight);
        console.log('Last:', lastMonthWeight);

        let percentage = 0;
        if (lastMonthWeight > 0) {
            percentage = ((currentMonthWeight - lastMonthWeight) / lastMonthWeight) * 100;
        } else if (currentMonthWeight > 0) {
            percentage = 100; // If last month was zero and current month has weight, consider it a 100% increase
        }

        return {
            weight: currentMonthWeight - lastMonthWeight,
            status: currentMonthWeight > lastMonthWeight ? 'up' : 'down',
            percentage
        };

    }


    const calculatePlasticStats = (items) => {

        const recyclableCompareLastMonth = compareLastTwoMonths("recyclable");
        const nonRecyclableCompareLastMonth = compareLastTwoMonths("non-recyclable");
        const singleUseCompareLastMonth = compareLastTwoMonths("single-use");


        const totalWeight = items.reduce((total, item) => total + item.weight, 0);

        const recyclableItems = items.filter(item => item.type === 'recyclable');
        const recyclableWeight = recyclableItems.reduce((total, item) => total + item.weight, 0);

        const nonRecyclableItems = items.filter(item => item.type === 'non-recyclable');
        const nonRecyclableWeight = nonRecyclableItems.reduce((total, item) => total + item.weight, 0);

        const singleUseItems = items.filter(item => item.type === 'single-use');
        const singleUseWeight = singleUseItems.reduce((total, item) => total + item.weight, 0);

        const recyclablePercentage = totalWeight > 0 ? (recyclableWeight / totalWeight) * 100 : 0;
        const nonRecyclablePercentage = totalWeight > 0 ? (nonRecyclableWeight / totalWeight) * 100 : 0;
        const singleUsePercentage = totalWeight > 0 ? (singleUseWeight / totalWeight) * 100 : 0;


        const data = {
            recyclableCompareLastMonth,
            nonRecyclableCompareLastMonth,
            singleUseCompareLastMonth,
            totalWeight,
            recyclableWeight,
            nonRecyclableWeight,
            singleUseWeight,
            recyclablePercentage: recyclablePercentage.toFixed(2), // Format to 2 decimal places
            nonRecyclablePercentage: nonRecyclablePercentage.toFixed(2), // Format to 2 decimal places
            singleUsePercentage: singleUsePercentage.toFixed(2), // Format to 2 decimal places
        };
        setPlasticStats(data);
    };



    useEffect(() => {
        setItems(items);
        calculatePlasticStats(items);
        console.log('Items store:', itemsStore);

    }, [itemsStore]);



    // Calculate the total weight of non-recyclable items

    const totalWeightRecyclable = itemsStore
        .filter(item => item.type === "recyclable") // Filter for non-recyclable items
        .reduce((total, item) => total + item.weight, 0); // Sum the weights

    const totalWeightsingleUse = itemsStore
        .filter(item => item.type === "single-use") // Filter for non-recyclable items
        .reduce((total, item) => total + item.weight, 0); // Sum the weights

    const totalWeightsNonRecyclable = itemsStore
        .filter(item => item.type === "non-recyclable") // Filter for non-recyclable items
        .reduce((total, item) => total + item.weight, 0); // Sum the weights

    // const

   
    // const { recyclableCompareLastMonth, recyclableWeight, recyclablePercentage, nonRecyclableCompareLastMonth,nonRecyclableWeight,nonRecyclablePercentage, singleUseCompareLastMonth, singleUseWeight, singleUsePercentage} = calculatePlasticStats(items);
    return (
        <div className="space-y-6">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold">
                    <span className="text-3xl">Hi <span>{user?.name?.toLocaleUpperCase()}</span> 🖐</span> <br />
                    <span>Welcome to Your Plastic Tracker!</span>
                </CardTitle>
                <p className="text-green-100">{getCurrentDate()}</p>
                <p>{getPreviousMonthDate(0)}</p>
                {/* <p>{items[0].createdAt.toISOString()}</p> */}
                {/* <p></p> */}
            </CardHeader>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Cards for Plastic Stats */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plastics saved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{recyclableCompareLastMonth.weight ? recyclableCompareLastMonth.weight.toFixed(2): "0.00" } g</div>
                        <p className="text-xs text-muted-foreground">{recyclableCompareLastMonth.status=="up" ?`+${recyclableCompareLastMonth.percentage}`:`-${recyclableCompareLastMonth.percentage}`}% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Recyclables items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-green-600'>{recyclableWeight? recyclableWeight: "0.00"} g</div>
                        <p className='text-xs text-muted-foreground'>{recyclablePercentage}% of total waste</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>Non-Recyclables items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-[#dc2626]'>{nonRecyclableWeight ? nonRecyclableWeight: "0.00"} g</div>
                        <p className='text-xs text-muted-foreground'>{nonRecyclablePercentage}% of total waste</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'> 
                            Single-Use Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-orange-600'>{singleUseCompareLastMonth.weight ? singleUseCompareLastMonth.weight.toFixed(2): "0.00"} g</div>
                        <p className='text-xs text-muted-foreground'>
                            <span className="text-xs text-muted-foreground">{singleUseCompareLastMonth.status == "up" ? `+${singleUseCompareLastMonth.percentage}` : `-${singleUseCompareLastMonth.percentage}`}% from last month</span>
                        </p>
                    </CardContent>
                </Card>
                {/* <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Environmental Impact
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold text-blue-600'>3.2 CO₂e</div>
                        <p className='text-xs text-muted-foreground'>Emissions prevented</p>
                    </CardContent>
                </Card> */}
                {/* Add more cards */}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Today's Plastic Usage */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Today's Plastic Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PlasticLoggerDialog
                            trigger={<Button className="float-end" variant="default"><Plus /></Button>}
                            onSubmit={handleSubmit}
                        />
                        <WasteDistribution />
                    </CardContent>
                </Card>
                {/* Weekly Overview */}
                {/* <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Weekly Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Overview />
                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
}

'use client'
import React, { useState } from 'react';
import { Users, DollarSign, CheckCircle } from 'lucide-react'; // You can use any icon set
import { useGetAllStatisticsQuery } from '@/Redux/apis/statistics.ts/statisticsApi';
import LoadingSpinner from '@/Components/Loading/LoadingSpinner';
import { TStatisticsData } from '../../../../Type/Statistics';



const filterOptions = ['daily', 'weekly', 'monthly', 'yearly'] as const;
type TFilterOptions = typeof filterOptions[number];

const StatisticsCards = () => {
    const [filter, setFilter] = useState<TFilterOptions>('weekly');

    const { data, isLoading } = useGetAllStatisticsQuery({})
    console.log(data, "data thh");

    const statistics: TStatisticsData = data?.data
    if (isLoading) {
         <LoadingSpinner/>
     }
    return (
        <div className="p-6 space-y-6">
            {/* Filter */}
            <div className="flex gap-2 px-4 md:px-6 pt-6">
                {filterOptions.map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === item
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className="hover:scale-95 bg-[#C3F3F3] rounded-xl shadow-md p-6 flex items-center space-x-4 ">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Users className="text-blue-500" />
                    </div>
                    <div className='space-y-2'>
                        <h3 className="text-lg text-gray-800">Total Users</h3>
                        <p className="text-xl font-semibold">{statistics?.users?.total}</p>
                        <p className="text-gray-500 text-sm capitalize">{filter}: {statistics?.users?.[filter] ?? 0}</p>
                    </div>
                </div>

                {/* Active Subscriptions */}
                <div className="hover:scale-95 bg-[#B8DBFC] rounded-xl shadow-md p-6 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <CheckCircle className="text-green-600" />
                    </div>
                    <div className='space-y-2'>
                        <h3 className="text-lg text-gray-800">Active Subscriptions</h3>
                        <p className="text-xl font-semibold">{statistics?.subscriptions?.totalActive}</p>
                        <p className="text-gray-500 text-sm capitalize">{filter}: {statistics?.subscriptions?.revenue[filter]?.count}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="hover:scale-95 bg-[#FEF7EC] rounded-xl shadow-md p-6 flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <DollarSign className="text-yellow-600" />
                    </div>
                    <div className='space-y-2'>
                        <h3 className="text-lg text-gray-800">Total Revenue</h3>
                        <p className="text-xl font-semibold">${statistics?.subscriptions?.revenue?.total.toFixed(2)}</p>
                        <p className="text-gray-500 text-sm capitalize">
                            {filter}: ${statistics?.subscriptions?.revenue[filter]?.amount.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCards;

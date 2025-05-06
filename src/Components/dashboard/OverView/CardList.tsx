/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Users, CreditCard, TrendingUp, Calendar, ArrowUp } from 'lucide-react';

const timeFilters = ['daily', 'weekly', 'monthly', 'yearly'] as const;
type TimeFilter = typeof timeFilters[number];

const cardData = [
  {
    title: 'Total Users',
    icon: <Users className="text-blue-500" />,
    valuePath: 'users.total',
    trendPath: 'users'
  },
  {
    title: 'Active Subscriptions',
    icon: <CreditCard className="text-green-500" />,
    valuePath: 'subscriptions.totalActive',
    trendPath: 'subscriptions.revenue'
  },
  {
    title: 'Total Revenue',
    icon: <TrendingUp className="text-purple-500" />,
    valuePath: 'subscriptions.revenue.total',
    trendPath: 'subscriptions.revenue'
  }
];;


const data = {
  users: {
    total: 15,
    daily: 1,
    weekly: 4,
    monthly: 9,
    yearly: 14
  },
  subscriptions: {
    totalActive: 1,
    revenue: {
      total: 59.99,
      daily: { amount: 9.99, count: 1 },
      weekly: { amount: 29.99, count: 3 },
      monthly: { amount: 39.99, count: 7 },
      yearly: { amount: 79.99, count: 11 }
    }
  }
};
export default function CardList() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="space-y-4">
      {/* Time Filter Buttons */}
      <div className="flex gap-2 px-4 md:px-6 pt-6">
        {timeFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${timeFilter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6 pb-6">
        {cardData.map((card) => {
          // Get current value
          const currentValue = getNestedValue(data, card.valuePath) || 0;

          // Get comparison value for trend calculation
          let comparisonValue = 0;
          if (timeFilter === 'weekly') {
            comparisonValue = getNestedValue(data, `${card.trendPath}.daily.amount`) ||
              getNestedValue(data, `${card.trendPath}.daily.count`) || 0;
          } else if (timeFilter === 'monthly') {
            comparisonValue = getNestedValue(data, `${card.trendPath}.weekly.amount`) ||
              getNestedValue(data, `${card.trendPath}.weekly.count`) || 0;
          }

          const trendPercentage = calculateTrend(currentValue, comparisonValue);
          const isPositiveTrend = trendPercentage >= 0;
          const isRevenueCard = card.title === 'Total Revenue';

          return (
            <div
              key={card.title}
              className="p-4 rounded-xl shadow flex flex-col justify-between space-y-4.5 bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-xl">
                    {card.icon}
                  </div>
                  <h2 className="text-[18px] font-[500]">{card.title}</h2>
                </div>
                <Calendar className="text-gray-400" size={18} />
              </div>

              <div className="space-y-1">
                <p className="text-[24px] text-[#000E19] font-bold">
                  {isRevenueCard ? `$${currentValue.toFixed(2)}` : currentValue}
                </p>
                <div className="flex items-center text-[14px] font-medium">
                  <span className={`flex items-center ${isPositiveTrend ? 'text-green-500' : 'text-red-500'
                    }`}>
                    <ArrowUp
                      size={16}
                      className={`mr-1 ${!isPositiveTrend ? 'transform rotate-180' : ''}`}
                    />
                    {Math.abs(trendPercentage).toFixed(2)}%
                  </span>
                  <span className="text-[#757D83] ml-1">
                    from last {timeFilter === 'weekly' ? 'day' : timeFilter === 'monthly' ? 'week' : 'period'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

type UserStats = {
  total: number;
} & Record<TimePeriod, number>;

type RevenueDetails = {
  amount: number;
  count: number;
};

type SubscriptionStats = {
  totalActive: number;
  revenue: {
    total: number;
  } & Record<TimePeriod, RevenueDetails>;
};

export type TStatisticsData = {
  users: UserStats;
  subscriptions: SubscriptionStats;
};
